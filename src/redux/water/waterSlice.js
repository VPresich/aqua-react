import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWater,
  getDayWater,
  getMonthWater,
  updateWater,
} from "./waterOps";
import { signOut } from "../user/userOps";

const initialState = {
  date: new Date().toISOString(),
  calendarMonth: new Date().toISOString(),
  totalDayWater: 0,
  dayItems: [],
  monthItems: [],
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setCalendarMonth: (state, action) => {
      state.calendarMonth = action.payload;
    },
    setWaterDate: (state, action) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builer) =>
    builer
      .addCase(addWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const newItem = action.payload.data;
        state.dayItems.push(newItem);
        state.totalDayWater += newItem.volume;
        const addedDate = new Date(newItem.date);
        addedDate.setUTCHours(0, 0, 0, 0);
        const addedDateString = addedDate.toISOString();

        const existingMonthItem = state.monthItems.find(
          (item) => item.date === addedDateString
        );

        if (existingMonthItem) {
          existingMonthItem.totalDayWater += newItem.volume;
        } else {
          state.monthItems.push({
            date: addedDateString,
            totalDayWater: newItem.volume,
          });
        }
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to add water.";
        }
      })

      .addCase(deleteWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const id = action.payload;

        const deletedWaterIndex = state.dayItems.findIndex(
          (item) => item._id === id
        );

        if (deletedWaterIndex === -1) return;
        const deletedWater = state.dayItems[deletedWaterIndex];
        state.totalDayWater -= deletedWater.volume;
        state.dayItems.splice(deletedWaterIndex, 1);

        const deletedDate = new Date(deletedWater.date);
        deletedDate.setUTCHours(0, 0, 0, 0);
        const deletedDateString = deletedDate.toISOString();

        const existingMonthItem = state.monthItems.find(
          (item) => item.date === deletedDateString
        );

        if (existingMonthItem) {
          existingMonthItem.totalDayWater -= deletedWater.volume;

          if (existingMonthItem.totalDayWater <= 0) {
            state.monthItems = state.monthItems.filter(
              (item) => item.date !== deletedDateString
            );
          }
        }
      })
      .addCase(deleteWater.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to delete water.";
      })

      .addCase(updateWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const newItem = action.payload.data;

        const updatedWaterIndex = state.dayItems.findIndex(
          (item) => item._id === newItem._id
        );
        if (updatedWaterIndex === -1) return;

        const prevVolume = state.dayItems[updatedWaterIndex].volume;
        const newVolume = newItem.volume;
        state.dayItems[updatedWaterIndex] = newItem;
        state.totalDayWater = Math.max(
          0,
          state.totalDayWater + newVolume - prevVolume
        );

        const updatedDate = new Date(newItem.date);
        updatedDate.setUTCHours(0, 0, 0, 0);
        const updatedDateString = updatedDate.toISOString();
        const existingMonthItem = state.monthItems.find(
          (item) => item.date === updatedDateString
        );

        if (existingMonthItem) {
          existingMonthItem.totalDayWater = Math.max(
            0,
            existingMonthItem.totalDayWater + newVolume - prevVolume
          );
        } else {
          state.monthItems.push({
            date: updatedDateString,
            totalDayWater: newVolume,
          });
        }
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to update water.";
        }
      })

      .addCase(getDayWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDayWater.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.date = action.payload.data.date;
        state.totalDayWater = action.payload.data.totalDayWater;
        state.dayItems = action.payload.data.dayItems;
      })
      .addCase(getDayWater.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to fetch water data.";
        }
      })

      .addCase(getMonthWater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthItems = action.payload.data;
      })
      .addCase(getMonthWater.rejected, (state, action) => {
        state.error = true;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "Failed to fetch water month.";
        }
      })

      .addCase(signOut.fulfilled, () => {
        return initialState;
      }),
});

export const waterReducer = waterSlice.reducer;
export const { setCalendarMonth, setWaterDate } = waterSlice.actions;

// {
//     "status": 200,
//     "message": "Successfully found water-logs for the day!",
//     "data": {
//         "date": "2025-01-25T00:00:00.000Z",
//         "totalDayWater": 600,
//         "dayItems": [
//             {
//                 "_id": "6794a51338d9f3c7b40e223b",
//                 "userId": "6793a581fbe4619a554a5bde",
//                 "volume": 250,
//                 "date": "2025-01-25T09:47:00.398Z",
//                 "createdAt": "2025-01-25T08:47:15.256Z",
//                 "updatedAt": "2025-01-25T08:47:15.256Z"
//             },
//             {
//                 "_id": "6794b64e2355159d63dd7924",
//                 "userId": "6793a581fbe4619a554a5bde",
//                 "volume": 350,
//                 "date": "2025-01-25T10:46:00.398Z",
//                 "createdAt": "2025-01-25T10:00:46.973Z",
//                 "updatedAt": "2025-01-25T10:00:46.973Z"
//             }
//         ]
//     }
// }

// {
//     "status": 201,
//     "message": "Successfully created a water-log!",
//     "data": {
//         "userId": "6793a581fbe4619a554a5bde",
//         "volume": 250,
//         "date": "2025-01-25T18:47:00.398Z",
//         "_id": "67952b790099bed50261c3d0",
//         "createdAt": "2025-01-25T18:20:41.008Z",
//         "updatedAt": "2025-01-25T18:20:41.008Z"
//     }
// }

// {
//     "status": 200,
//     "message": "Successfully found water-logs summary for days of the month!",
//     "data": {
//         "date": "2025-01-01T00:00:00.000Z",
//         "monthItems": [
//             {
//                 "date": "2025-01-25T00:00:00.000Z",
//                 "totalWater": 1100
//             }
//         ]
//     }
// }
