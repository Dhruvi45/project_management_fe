import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add the Authorization header to each request
axiosInstance.interceptors.request.use(
  async (config) => {
    // Explicitly type headers to be of type AxiosRequestHeaders
    const headers: AxiosRequestHeaders = config.headers || {};
    
    // Add Authorization header if access token exists
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
    // }

    config.headers = headers; // Assign the modified headers back to config
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh on expired token
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;

    // Check if the error is due to an expired token and retry the request after refreshing the token
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   // Get the refresh token and email from local storage
    //   const refreshToken = localStorage.getItem("refreshToken");
    //   const email = localStorage.getItem("email");

    //   try {
    //     const refreshResponse = await axios.post(
    //       "/user/refresh-token",
    //       {
    //         email,
    //         refreshToken: refreshToken?.slice(1, -1),
    //       }
    //     );

    //     const newAccessToken = refreshResponse.data.data.accessToken;
    //     localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

    //     // Retry the original request with the new access token
    //     axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //     originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    //     return axiosInstance(originalRequest);
    //   } catch (refreshError) {
    //     return Promise.reject(refreshError);
    //   }
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
