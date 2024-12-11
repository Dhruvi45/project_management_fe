import axios, { AxiosResponse } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the Authorization header to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh or error logging
axiosInstance.interceptors.response.use(
  (response:AxiosResponse) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Token may have expired.");
      localStorage.clear();
      window.location.assign("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
