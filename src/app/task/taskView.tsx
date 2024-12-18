"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "src/components/ConfirmationDialog";
import Loader from "src/components/Loader";
import Table, { DataRow } from "src/components/Table";
import createAxiosInstance from "../lib/axios";
import { Permission, useAuth } from "../lib/useAuth";
import AddTask from "./addTask";
import { fetchTask } from "./apiCall";

export interface ITask {
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  assignedTo: string;
  project: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Props {
    taskList:DataRow[]
  }

export default function TaskView({taskList}:Props) {
  const { user, loadingAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectTaskId, setSelectedTaskId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const harder = [
    { label: "Action", key: "action" },
    { label: "Title", key: "title" },
    { label: "Description", key: "description" },
    { label: "Project", key: "projectTitle" },
    { label: "Completed", key: "completed" },
    { label: "Assigned", key: "assignedTo" },
    { label: "DueDate", key: "dueDate" },
    { label: "Created Date", key: "createdAt" },
    { label: "Updated Date", key: "updatedAt" },
  ];

  // Check if the user has the required permissions
//   const canView = user?.role.permissions.some(
//     (permission: Permission) =>
//       permission.resource === "tasks" && permission.actions.includes("view")
//   );
  const canCreate = user?.role.permissions.some(
    (permission: Permission) =>
      permission.resource === "tasks" && permission.actions.includes("create")
  );    

  const deleteTask = async () => {
  const axiosInstance = await createAxiosInstance();

    setLoading(true);
    axiosInstance
      .delete(`/tasks/${selectTaskId}`)
      .then(() => {
        toast.success("Task deleted successfully");
        fetchTask(user?.role.name);
        closeConfirmationModel();
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const closeModel = () => {
    setIsShow(false);
    setSelectedTaskId("");
    fetchTask(user?.role.name);
  };

  const closeConfirmationModel = () => {
    setIsDelete(false);
    setSelectedTaskId("");
  };

  if (loading || loadingAuth) return <Loader />;

  return (
    <>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Manage Task</h1>
          {canCreate && (
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
                Add Task
              </button>
            </div>
          )}
        </div>
        {taskList.length > 0 && (
          <Table
            headers={harder}
            data={taskList}
            setSelectedId={setSelectedTaskId}
            setIsShow={setIsShow}
            setIsDelete={setIsDelete}
            resource={"tasks"}
          />
        )}
        {isShow && (
          <AddTask isOpen={isShow} onClose={closeModel} id={selectTaskId} />
        )}
        {isDelete && (
          <ConfirmationDialog
            isOpen={isDelete}
            onClose={closeConfirmationModel}
            onConfirm={deleteTask}
            message={"Are you sure you want to delete task?"}
            title={"Delete Task"}
          />
        )}
    </>
  );
}
