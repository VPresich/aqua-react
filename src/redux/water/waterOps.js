import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../user/userOps";

export const addWater = createAsyncThunk(
  "water/createWaterLog",
  async (water, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/water", water);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  "water/updateWaterLog",
  async ({ cardId, waterData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/water/${cardId}`, waterData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteWaterLog",
  async (cardId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/water/${cardId}`);
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDayWater = createAsyncThunk(
  "water/getDayWaterLogs",
  async (date, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/water/per-day", {
        params: { date },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getMonthWater = createAsyncThunk(
  "water/getMonthWaterLogs",
  async (date, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/water/per-month", {
        params: { date },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
