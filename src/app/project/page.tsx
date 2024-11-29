"use client";
import { useState } from "react";
// import AddModel from "src/components/ConfirmationDialog";
import Table from "src/components/Table";
import { useForm } from "react-hook-form";
// Define interfaces for IUser and IProject
interface IUser {
  id: string;
  name: string;
}

interface IProject {
  title: string;
  description?: string;
  owner: IUser; // Selected owner
  members: IUser[]; // Array of selected members
  tasks: string[]; // Array of Task IDs
}
// Dummy Data for Users and Tasks
const dummyUsers: IUser[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

const dummyTasks: { id: string; title: string }[] = [
  { id: "t1", title: "Task 1" },
  { id: "t2", title: "Task 2" },
  { id: "t3", title: "Task 3" },
];
export default function ProjectPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [selectUserId, setSelectedUserId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const hearder = [
    { label: "Action", key: "action" },    
    { label: "Created Date", key: "createdAt" },
    { label: "Updated Date", key: "updatedAt" },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProject>();

  const onSubmit = (data: IProject) => {
    setUserList([])
    console.log("Form Data:", data);
  };

  const closeModel = () => {
    setIsShow(false);
  };

  // const AddForm = () => {
  //   return (
  //     <form
  //     onSubmit={handleSubmit(onSubmit)}
  //     className="max-w-md mx-auto space-y-4"
  //   >
  //     <h1 className="text-2xl font-bold text-center">Create Project</h1>

  //     {/* Title */}
  //     <div>
  //       <label
  //         htmlFor="title"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Title
  //       </label>
  //       <input
  //         id="title"
  //         {...register("title", { required: "Title is required" })}
  //         placeholder="Enter project title"
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       />
  //       <p
  //         className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
  //           errors.title ? "visible" : "invisible"
  //         }`}
  //       >
  //         {errors.title?.message}
  //       </p>
  //     </div>

  //     {/* Description */}
  //     <div>
  //       <label
  //         htmlFor="description"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Description
  //       </label>
  //       <textarea
  //         id="description"
  //         {...register("description")}
  //         placeholder="Enter project description"
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       />
  //     </div>

  //     {/* Owner */}
  //     <div>
  //       <label
  //         htmlFor="owner"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Owner (Project Manager)
  //       </label>
  //       <select
  //         id="owner"
  //         {...register("owner", { required: "Owner is required" })}
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       >
  //         <option value="">Select an owner</option>
  //         {dummyUsers.map((user) => (
  //           <option key={user.id} value={JSON.stringify(user)}>
  //             {user.name}
  //           </option>
  //         ))}
  //       </select>
  //       <p
  //         className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
  //           errors.owner ? "visible" : "invisible"
  //         }`}
  //       >
  //         {errors.owner?.message}
  //       </p>
  //     </div>

  //     {/* Members */}
  //     <div>
  //       <label
  //         htmlFor="members"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Members
  //       </label>
  //       <select
  //         id="members"
  //         {...register("members", { required: "Select at least one member" })}
  //         multiple
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       >
  //         {dummyUsers.map((user) => (
  //           <option key={user.id} value={JSON.stringify(user)}>
  //             {user.name}
  //           </option>
  //         ))}
  //       </select>
  //       <p
  //         className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
  //           errors.members ? "visible" : "invisible"
  //         }`}
  //       >
  //         {errors.members?.message}
  //       </p>
  //     </div>

  //     {/* Tasks */}
  //     <div>
  //       <label
  //         htmlFor="tasks"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Tasks
  //       </label>
  //       <select
  //         id="tasks"
  //         {...register("tasks")}
  //         multiple
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       >
  //         {dummyTasks.map((task) => (
  //           <option key={task.id} value={task.id}>
  //             {task.title}
  //           </option>
  //         ))}
  //       </select>
  //     </div>

  //     {/* Submit Button */}
  //     <button
  //       type="submit"
  //       className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  //     >
  //       Submit
  //     </button>

  //     {/* Submitted Data */}
  //     {/* {submittedData && (
  //       <div className="mt-4 p-4 border border-gray-300 rounded-md">
  //         <h3 className="font-bold">Submitted Data:</h3>
  //         <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
  //       </div>
  //     )} */}
  //   </form>
  //   );
  // };

  return (
    <div className="bg-gray-100  m-0 p-0">
      {/* Navbar or Header can go here if needed */}

      {/* Main Content */}
      <div className="container mx-auto my-4 p-4 bg-white shadow-md rounded-lg h-64">
        <div className="flex justify-between items-center ">
          {/* Left Side: Title */}

          <h1 className="text-xl font-bold text-gray-800">Manage Project</h1>

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
              Add Project
            </button>
          </div>
        </div>
        {userList.length > 0 && (
          <Table
            headers={hearder}
            data={userList}
            setSelectedId={setSelectedUserId}
          setIsDelete={setIsDelete}
          />
        )}
      </div>
      {/* {isShow && (
        <AddModel
          isOpen={false}
          onClose={closeModel}
          title="Add Project"
          children={<AddForm />}
        />
      )} */}
    </div>
  );
  }