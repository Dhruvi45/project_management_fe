"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationDialog from "src/components/ConfirmationDialog";
import Loader from "src/components/Loader";
import Table from "src/components/Table";
import Layout2 from "../layout2";
import { default as axiosInstance, default as createAxiosInstance } from "../lib/axios";
import { Permission, useAuth } from "../lib/useAuth";
import AddUser from "./addUser";

export type UserFormInputs = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export default function UserPage() {
  const { user, loadingAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [selectUserId, setSelectedUserId] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  // Check if the user has the required permissions
  const canView = user?.role.permissions.some(
    (permission: Permission) =>
      permission.resource === "users" &&
      (permission.actions.includes("view") ||
        permission.actions.includes("view_teamMember"))
  );
  const canCreate = user?.role.permissions.some(
    (permission: Permission) =>
      (permission.resource === "users" &&
        permission.actions.includes("create")) ||
      permission.actions.includes("create_teamMember")
  );

  const harder = [
    { label: "Action", key: "action" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Created Date", key: "createdAt" },
    { label: "Updated Date", key: "updatedAt" },
  ];

  useEffect(() => {
    getUserList();
  }, []);
  useEffect(() => {
    if (loadingAuth) return; // Avoid rendering while loading the user data
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/login";
    } else if (!canView) {
      // Redirect or show an error if the user doesn't have permission to create projects
      window.location.href = "/";
    }
  }, [user, loadingAuth]);



  const getUserList = async () => {
    setLoading(true);
  const axiosInstance = await createAxiosInstance();

    axiosInstance
      .get("users")
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const deleteUser = async () => {
  const axiosInstance = await createAxiosInstance();

    setLoading(true);
    axiosInstance
      .delete(`/users/${selectUserId}`)
      .then(() => {
        toast.success("User deleted successfully");
        getUserList();
        closeConfirmationModel();
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const closeModel = () => {
    setIsShow(false);
    setSelectedUserId("");
    getUserList();
  };
  const closeConfirmationModel = () => {
    setIsDelete(false);
    setSelectedUserId("");
  };

  if (loading || loadingAuth) return <Loader />;

  return (
    <>
      <Layout2>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Manage User</h1>

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
                Add User
              </button>
            </div>
          )}
        </div>
        {userList.length > 0 && (
          <Table
            headers={harder}
            data={userList}
            setSelectedId={setSelectedUserId}
            setIsShow={setIsShow}
            setIsDelete={setIsDelete}
            resource={"users"}
          />
        )}
        {isShow && (
          <AddUser isOpen={isShow} onClose={closeModel} id={selectUserId} />
        )}
        {isDelete && (
          <ConfirmationDialog
            isOpen={isDelete}
            onClose={closeConfirmationModel}
            onConfirm={deleteUser}
            message={"Are you sure you want to delete user?"}
            title={"Delete User"}
          />
        )}
      </Layout2>
    </>
  );
}
