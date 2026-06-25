import axios from "axios";
import { clearAccessTokenCookie, getCookie } from "./cookie";
import { API_BASE_URL } from "../config/env";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      clearAccessTokenCookie();
      if (window.location.pathname !== "/loginPage") {
        window.location.replace("/loginPage");
      }
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;