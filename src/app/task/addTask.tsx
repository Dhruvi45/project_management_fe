import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
import axiosInstance from "../lib/axios";
import { ITask } from "./page";
import { useAuth } from "../lib/useAuth";
// import useApiClient from "../lib/axios";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

interface IUserList {
  _id: string;
  name: string;
}
interface IProjectList {
  _id: string;
  title: string;
}

export default function AddTask({ isOpen, onClose, id }: ModalProps) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState<IUserList[]>([]);
  const [projectList, setProjectList] = useState<IProjectList[]>([]);
  const disableForTeamMember = user?.role.name === "Team Member";
  useEffect(() => {
    const initialize = async () => {
      try {
        await getProjectList();
        if (id) {
          await getTaskById();
        } else {
          reset();
        }
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initialize();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ITask>();

  const onSubmit = (data: ITask) => {
    setLoading(true);
    if (id) {
      updateTask(data);
    } else {
      addTask(data);
    }
  };
  //   const apiClient = useApiClient();
  if (!isOpen) return null;

  const addTask = (data: ITask) => {
    axiosInstance
      .post("/tasks", data)
      .then(() => {
        onClose();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const updateTask = (data: ITask) => {
    axiosInstance
      .put(`/tasks/${id}`, data)
      .then(() => {
        onClose();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const getProjectMemberList = async (projectId: string) => {
    try {
      setLoading(true);
      if (!projectId) {
        setUserList([]);
        return;
      }
      const { data } = await axiosInstance.get(
        `projectMemberList/${projectId}`
      );
      setUserList(data.data);
    } catch (error) {
      console.error("Error fetching project members:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectList = async () => {
    try {
      setLoading(true);
      axiosInstance
        .get("projectList")
        .then((response) => {
          setProjectList(response.data.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const getTaskById = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/tasks/${id}`);
      console.log(data);
      // Convert dueDate to 'YYYY-MM-DD' format for input[type="date"]
      const formattedDueDate = data.dueDate
        ? new Date(data.dueDate).toISOString().split("T")[0]
        : "";

      // Prepare data for resetting the form
      const formattedData = {
        ...data,
        dueDate: formattedDueDate,
      };
      // Fetch project members based on the task's project
      await getProjectMemberList(data.project);

      // Reset form with fetched data
      reset(formattedData);
    } catch (error) {
      console.error("Error fetching task by ID:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
        <div className="bg-white w-full max-w-lg mx-4 rounded-lg shadow-lg h-66 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-semibold">
              {id ? "Edit" : "Add"} Task
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          {/* Body */}
          <div className="p-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto space-y-2"
            >
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  disabled={disableForTeamMember}
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter task title"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p
                  className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
                    errors.title ? "visible" : "invisible"
                  }`}
                >
                  {errors.title?.message}
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter task description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Completed */}
              <div className="flex items-center">
                <input
                  id="completed"
                  type="checkbox"
                  {...register("completed")}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor="completed"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Completed
                </label>
              </div>

              {/* Due Date */}
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p
                  className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
                    errors.dueDate ? "visible" : "invisible"
                  }`}
                >
                  {errors.dueDate?.message}
                </p>
              </div>
              {/* Project */}
              <div>
                <label
                  htmlFor="project"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project
                </label>
                <select
                  id="project"
                  disabled={disableForTeamMember}
                  {...register("project", {
                    required: "Project is required",
                    onChange: (event) =>
                      getProjectMemberList(event.target.value),
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a project</option>
                  {projectList.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </select>
                <p
                  className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
                    errors.project ? "visible" : "invisible"
                  }`}
                >
                  {errors.project?.message}
                </p>
              </div>

              {/* Assigned To */}
              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  disabled={!getValues("project")}
                  {...register("assignedTo", {
                    required: "Assigned user is required",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a user</option>
                  {userList.length > 0 &&
                    userList.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                </select>
                <p
                  className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
                    errors.assignedTo ? "visible" : "invisible"
                  }`}
                >
                  {errors.assignedTo?.message}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
