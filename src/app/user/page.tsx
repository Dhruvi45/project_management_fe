"use client";
import { useState } from "react";
import AddModel from "src/components/AddModel";
import Table from "src/components/Table";
import { useForm } from "react-hook-form";

type UserFormInputs = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "project_manager" | "team_member" | "guest";
};
export default function UserPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>();

  const onSubmit = (data: UserFormInputs) => {
    console.log("Form Data:", data);
  };

  const closeModel = () => {
    setIsShow(false);
  };

  const AddForm = () => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto space-y-2"
      >
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p
            className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
              errors.name ? "visible" : "invisible"
            }`}
          >
            {errors.name?.message}
          </p>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p
            className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
              errors.email ? "visible" : "invisible"
            }`}
          >
            {errors.email?.message || "Invalid email"}
          </p>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            placeholder="Enter your password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p
            className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
              errors.password ? "visible" : "invisible"
            }`}
          >
            {errors.password?.message ||
              "Password must be at least 6 characters"}
          </p>
        </div>

        {/* Role Field */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            {...register("role", { required: "Role is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="project_manager">Project Manager</option>
            <option value="team_member">Team Member</option>
            <option value="guest">Guest</option>
          </select>
          <p
            className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
              errors.role ? "visible" : "invisible"
            }`}
          >
            {errors.role?.message}
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
    );
  };

  return (
    <div className="bg-gray-100  m-0 p-0">
      {/* Navbar or Header can go here if needed */}

      {/* Main Content */}
      <div className="container mx-auto my-4 p-4 bg-white shadow-md rounded-lg h-64">
        <div className="flex justify-between items-center ">
          {/* Left Side: Title */}

          <h1 className="text-xl font-bold text-gray-800">Manage User</h1>

          {/* Right Side: Buttons */}
          <div className="flex items-center gap-3">
            {/* Filter Icon */}
            <button
              className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H5a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Add User Button */}
            <button 
            className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={()=>setIsShow(true)}>
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
        </div>
        {userList.length > 0 && (
          <Table
            headers={userList.length > 0 ? Object?.keys(userList[0]) : []}
            data={userList}
          />
        )}
      </div>
      {isShow && (
        <AddModel
          isOpen={false}
          onClose={closeModel}
          title="Add User"
          children={<AddForm />}
        />
      )}
    </div>
  );
}
