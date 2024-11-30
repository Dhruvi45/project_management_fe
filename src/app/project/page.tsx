"use client";
import { useEffect, useState } from "react";
import Loader from "src/components/Loader";
import Table from "src/components/Table";
import AddProject from "./addProject";
import ConfirmationDialog from "src/components/ConfirmationDialog";
import axiosInstance from "../lib/axios";


export interface IProject {
  title: string;
  description?: string;
  owner: string;
  members: string[]; 
  // tasks: string[]; // Array of Task IDs
}

export default function ProjectPage() {
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [selectProjectId, setSelectedProjectId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const harder = [
    { label: "Action", key: "action" },
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "owner", key: "owner" },
    { label: "members", key: "members" },
    { label: "Created Date", key: "createdAt" },
    { label: "Updated Date", key: "updatedAt" },
  ];
  

  const closeModel = () => {
    setIsShow(false);
    getProjectList();
    setSelectedProjectId("");

  };

  const closeConfirmationModel = () => {
    setIsDelete(false);
    setSelectedProjectId("");
    getProjectList();
  };

  const getProjectList = () => {
    setLoading(true);
    axiosInstance
      .get("projects")
      .then((response) => {
        setProjectList(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getProjectList();
  }, []);

  useEffect(() => {
    console.log("selectProjectId.length ", selectProjectId.length ,isDelete);
    if (selectProjectId.length > 0 && !isDelete) {
      setIsShow(true);
    }
  }, [selectProjectId]);

  const deleteProject = () => {
    setLoading(true);
    axiosInstance
      .delete(`/projects/${selectProjectId}`)
      .then(() => {
        getProjectList();
        closeConfirmationModel();
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };


    if (loading) return <Loader />;

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Manage Project</h1>
        <div className="flex items-center gap-3">          
          <button
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => setIsShow(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Project
          </button>
        </div>
      </div>
      {projectList.length > 0 && (
        <Table
          headers={harder}
          data={projectList}
          setSelectedId={setSelectedProjectId}
          setIsDelete={setIsDelete}
        />
      )}
      {isShow && (
        <AddProject isOpen={isShow} onClose={closeModel} id={selectProjectId} />
      )}
      {isDelete && (
        <ConfirmationDialog
          isOpen={isDelete}
          onClose={closeConfirmationModel}
          onConfirm={deleteProject}
          message={"Are you sure you want to delete project?"}
          title={"Delete Project"}
        />
      )}
    </>
  );
  }