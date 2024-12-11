// src/app/task/apiCall.ts
import axiosInstance from "../lib/axios";

export const fetchTask = async (role:string|undefined) => {
    const reqUrl = role === "Team Member" ? "projectsByUserId" : "tasks";
    const response = await axiosInstance
      .get(reqUrl)
      .then((response) => {
        return response.data;
      })
      .catch(() => {
        // console.error(error);
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      });
    return response;
  };