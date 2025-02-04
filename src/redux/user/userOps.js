import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstance,
  setAuthHeader,
  clearAuthHeader,
} from "../../helpers/api";

export const setupAxiosInterceptors = (store) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("auth/refresh")
      ) {
        originalRequest._retry = true;

        try {
          const response = await store.dispatch(refreshSession());
          const newAccessToken = response.payload?.data?.accessToken;

          if (!newAccessToken) {
            throw new Error("Failed to refresh token");
          }
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.warn("Token refresh failed:", refreshError);
          clearAuthHeader();
          store.dispatch(signOut());
          return new Promise(() => {});
        }
      }

      return Promise.reject(error);
    }
  );
};

export const signUp = createAsyncThunk(
  "users/register",
  async (signUpData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/register", signUpData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const signIn = createAsyncThunk(
  "users/login",
  async (signInData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/login", signInData);
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const signOut = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    await axiosInstance.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

export const fetchCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      setAuthHeader(reduxState.auth.accessToken);
      const response = await axiosInstance.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const savedToken = state.auth.accessToken;
      return savedToken !== null;
    },
  }
);

export const updateUser = createAsyncThunk(
  "users/updateCurrentUser",
  async (data, thunkAPI) => {
    try {
      let response = "";
      if ("avatar" in data) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
          formData.append(key, value);
        }
        response = await axiosInstance.patch("/users/current", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axiosInstance.patch("/users/current", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState, rejectWithValue }) => {
      const state = getState();
      const savedToken = state.auth.accessToken;
      if (!savedToken) {
        rejectWithValue("Unauthorized");
        return false;
      }
      return true;
    },
  }
);

export const sendResetEmail = createAsyncThunk(
  "users/sendResetEmail",
  async (emailData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/users/send-reset-email",
        emailData
      );
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/reset-pwd", resetData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchOAuthUrl = createAsyncThunk(
  "users/fetchOAuthUrl",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/get-oauth-url");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const googleLogin = createAsyncThunk(
  "users/googleLogin",
  async (googleData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/users/google-login",
        googleData
      );
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getUsersCount = createAsyncThunk(
  "users/getUserCount",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/count");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refreshSession = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/refresh");
      const refreshedData = response.data;
      if (!refreshedData.data?.accessToken) {
        throw new Error("No accessToken in server response");
      } else {
        setAuthHeader(refreshedData.data.accessToken);
      }
      return refreshedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const savedToken = state.auth.accessToken;
      if (!savedToken) {
        return false;
      }
      return true;
    },
  }
);
