// src/app/project/apiCall.ts
import createAxiosInstance from "../lib/axios";

export const fetchProjects = async (role:string|undefined) => {
  const axiosInstance = await createAxiosInstance();
    const reqUrl = role === "Team Member" ? "projectsByUserId" : "projects";
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