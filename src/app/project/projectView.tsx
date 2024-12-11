// src/app/project/projectView.tsx
"use client";
import { useState } from "react";
import Loader from "src/components/Loader";
import Table, { DataRow } from "src/components/Table";
import AddProject from "./addProject";
import ConfirmationDialog from "src/components/ConfirmationDialog";
import axiosInstance from "../lib/axios";
import { Permission, useAuth } from "../lib/useAuth";
import { toast } from "react-toastify";
import { fetchProjects } from "./apiCall";

export interface IProject {
  title: string;
  description?: string;
  owner: string;
  members: string[];
  // tasks: string[]; // Array of Task IDs
}
interface Props {
  projects:DataRow[]
}

export default function ProjectView({ projects }: Props) {
  const { user, loadingAuth } = useAuth();
  const [loading, setLoading] = useState(false);
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

  // Check if the user has the required permissions
  const canCreateProject = user?.role.permissions.some(
    (permission: Permission) =>
      permission.resource === "projects" &&
      permission.actions.includes("create")
  );


  const closeModel = () => {
    setIsShow(false);
    fetchProjects(user?.role.name);
    setSelectedProjectId("");
  };

  const closeConfirmationModel = () => {
    setIsDelete(false);
    setSelectedProjectId("");
    fetchProjects(user?.role.name);
  };

  const deleteProject = () => {
    setLoading(true);
    axiosInstance
      .delete(`/projects/${selectProjectId}`)
      .then(() => {
        toast.success("Project deleted successfully");
        fetchProjects(user?.role.name);
        closeConfirmationModel();
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  if (loading || loadingAuth) return <Loader />;

  return (
    <>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Manage Project</h1>
          <div className="flex items-center gap-3">
            {canCreateProject && (
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
            )}
          </div>
        </div>
        {projects.length > 0 && (
          <Table
            headers={harder}
            data={projects}
            setSelectedId={setSelectedProjectId}
            setIsShow={setIsShow}
            setIsDelete={setIsDelete}
            resource={"projects"}
          />
        )}
        {isShow && (
          <AddProject
            isOpen={isShow}
            onClose={closeModel}
            id={selectProjectId}
          />
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
