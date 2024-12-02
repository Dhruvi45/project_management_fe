import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "src/components/Loader";
import axiosInstance from "../lib/axios";
import { IProject } from "./page";
import { toast } from "react-toastify";
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

export default function AddProject({ isOpen, onClose, id }: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [pmList, setPmList] = useState<IUserList[]>([]);
  const [tmList, setTmList] = useState<IUserList[]>([]);

  useEffect(() => {
    getUserList("pm");
    getUserList("tm");
    if (id) {
      getProjectById();
    } else {
      reset();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProject>();

  const onSubmit = (data: IProject) => {
    setLoading(true);
    if (id) {
      updateProject(data);
    } else {
      addProject(data);
    }
  };
  if (!isOpen) return null;

  const addProject = (data: IProject) => {
    axiosInstance
      .post("/projects", data)
      .then(() => {
        toast.success("Project added successfully");
        onClose();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const updateProject = (data: IProject) => {
    axiosInstance
      .put(`/projects/${id}`, data)
      .then(() => {
        toast.success("Project updated successfully");
        onClose();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserList = async (role: string) => {
    try {
      setLoading(true);
      axiosInstance
        .get(`usersList?role=${role}`)
        .then((response) => {
          if (role === "pm") {
            setPmList(response.data.data);
          } else {
            setTmList(response.data.data);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const getProjectById = async () => {
    try {
      setLoading(true);
      axiosInstance
        .get(`/projects/${id}`)
        .then((response) => {
          console.log(response.data);
          reset(response.data);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching roles:", error);
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
              {id ? "Edit" : "Add"} Project
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
              {/*Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter project title"
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
                  placeholder="Enter project description"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Owner */}
              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium text-gray-700"
                >
                  Owner (Project Manager)
                </label>
                <select
                  id="owner"
                  {...register("owner", { required: "Owner is required" })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select an owner</option>
                  {pmList.length > 0 &&
                    pmList.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                </select>
                <p
                  className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
                    errors.owner ? "visible" : "invisible"
                  }`}
                >
                  {errors.owner?.message}
                </p>
              </div>

              {/* Members */}
              <div>
                <label
                  htmlFor="members"
                  className="block text-sm font-medium text-gray-700"
                >
                  Members
                </label>
                <select
                  id="members"
                  {...register("members", {
                    required: "Select at least one member",
                  })}
                  multiple
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {tmList.length > 0 &&
                    tmList.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                </select>
                <p
                  className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
                    errors.members ? "visible" : "invisible"
                  }`}
                >
                  {errors.members?.message}
                </p>
              </div>

              {/* Tasks */}
              {/* <div>
                                <label
                                    htmlFor="tasks"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tasks
                                </label>
                                <select
                                    id="tasks"
                                    {...register("tasks")}
                                    multiple
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    {dummyTasks.map((task) => (
                                        <option key={task.id} value={task.id}>
                                            {task.title}
                                        </option>
                                    ))}
                                </select>
                            </div> */}

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
