import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://aqua-rest-api.onrender.com",
});

export const setAuthHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common.Authorization;
};
