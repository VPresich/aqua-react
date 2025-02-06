import axios from "axios";
import { signOut, refreshSession } from "../redux/user/userOps";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://aqua-rest-api.onrender.com",
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};

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
