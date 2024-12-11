// src/app/lib/axios.ts
import axios, { AxiosInstance } from "axios";

const createAxiosInstance = async (): Promise<AxiosInstance> => {
  let accessToken: string | undefined;

  if (typeof window === "undefined") {
    // Server-side
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    accessToken = cookieStore.get("accessToken")?.value;
  } else {
    // Client-side
    accessToken = localStorage.getItem("accessToken") || undefined;
  }

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized: Token may have expired.");
        if (typeof window !== "undefined") {
          localStorage.clear();
          window.location.assign("/login");
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
