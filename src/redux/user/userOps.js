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
      if (
        error.response?.status === 401 &&
        !error.config._retry &&
        !error.config.url.includes("auth/refresh")
      ) {
        error.config._retry = true;
        try {
          const data = await store.dispatch(refresh());
          setAuthHeader(data.payload.accessToken);
          error.config.headers.Authorization = `Bearer ${data.payload.accessToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
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
        response = await axiosInstance.patch("/auth/update-user", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      return response.data.data;
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

export const validateResetToken = createAsyncThunk(
  "users/validateResetToken",
  async (token, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/reset-pwd", { token });
      return response.data;
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
      const response = await axiosInstance.post("/auth/reset-pwd", {
        token: resetData.resetToken,
        password: resetData.password,
      });
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
      const response = await axiosInstance.get("/auth/get-oauth-url");
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
        "/auth/google-login",
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
      console.log("getUsersCount", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const refresh = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/refresh");
      const refreshedData = response.data?.data;
      if (!refreshedData || !refreshedData.accessToken) {
        throw new Error("No accessToken in server response");
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
        console.warn("Attempt to refresh token without an accessToken");
        return false;
      }
      return true;
    },
  }
);
