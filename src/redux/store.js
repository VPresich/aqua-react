import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { waterReducer } from "./water/waterSlice";
import { userReducer } from "./user/userSlice";
import { loaderReducer } from "./loader/loaderSlice";
import { setupAxiosInterceptors } from "../helpers/api";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["accessToken"],
};

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    water: waterReducer,
    auth: persistReducer(userPersistConfig, userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

setupAxiosInterceptors(store);

export const persistor = persistStore(store);
