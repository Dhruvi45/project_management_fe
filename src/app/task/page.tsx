"use client";
import { useState } from "react";
// import AddModel from "src/components/ConfirmationDialog";
// import Table from "src/components/Table";
// import { useForm } from "react-hook-form";



// Dummy Data for Users and Projects



export default function TaskPage() {
  const [showFilters, setShowFilters] = useState(false);
  // const [userList, setUserList] = useState([]);
  // const [isShow, setIsShow] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<ITask>();

  // const onSubmit = (data: ITask) => {
  //   setUserList([]);

  //   console.log("Form Data:", data);
  // };

  // const closeModel = () => {
  //   setIsShow(false);
  // };

  // const AddForm = () => {
  //   return (
  //     <form
  //     onSubmit={handleSubmit(onSubmit)}
  //     className="max-w-md mx-auto space-y-4"
  //   >
      

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
  //         placeholder="Enter task title"
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
  //         placeholder="Enter task description"
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       />
  //     </div>

  //     {/* Completed */}
  //     <div className="flex items-center">
  //       <input
  //         id="completed"
  //         type="checkbox"
  //         {...register("completed")}
  //         className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
  //       />
  //       <label
  //         htmlFor="completed"
  //         className="ml-2 text-sm font-medium text-gray-700"
  //       >
  //         Completed
  //       </label>
  //     </div>

  //     {/* Due Date */}
  //     <div>
  //       <label
  //         htmlFor="dueDate"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Due Date
  //       </label>
  //       <input
  //         id="dueDate"
  //         type="date"
  //         {...register("dueDate", { required: "Due date is required" })}
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       />
  //       <p
  //         className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
  //           errors.dueDate ? "visible" : "invisible"
  //         }`}
  //       >
  //         {errors.dueDate?.message}
  //       </p>
  //     </div>

  //     {/* Assigned To */}
  //     <div>
  //       <label
  //         htmlFor="assignedTo"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Assigned To
  //       </label>
  //       <select
  //         id="assignedTo"
  //         {...register("assignedTo", { required: "Assigned user is required" })}
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       >
  //         <option value="">Select a user</option>
  //         {dummyUsers.map((user) => (
  //           <option key={user.id} value={JSON.stringify(user)}>
  //             {user.name}
  //           </option>
  //         ))}
  //       </select>
  //       <p
  //         className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
  //           errors.assignedTo ? "visible" : "invisible"
  //         }`}
  //       >
  //         {errors.assignedTo?.message}
  //       </p>
  //     </div>

  //     {/* Project */}
  //     <div>
  //       <label
  //         htmlFor="project"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Project
  //       </label>
  //       <select
  //         id="project"
  //         {...register("project", { required: "Project is required" })}
  //         className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  //       >
  //         <option value="">Select a project</option>
  //         {dummyProjects.map((project) => (
  //           <option key={project.id} value={JSON.stringify(project)}>
  //             {project.title}
  //           </option>
  //         ))}
  //       </select>
  //       <p
  //         className={`text-xs text-red-500 mt-1 min-h-[1rem] ${
  //           errors.project ? "visible" : "invisible"
  //         }`}
  //       >
  //         {errors.project?.message}
  //       </p>
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

          <h1 className="text-xl font-bold text-gray-800">Manage Task</h1>

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
            // onClick={()=>setIsShow(true)}
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
        </div>
        {/* {userList.length > 0 && (
          <Table
            headers={userList.length > 0 ? Object?.keys(userList[0]) : []}
            data={userList}
          />
        )} */}
      </div>
      {/* {isShow && (
        <AddModel
          isOpen={false}
          onClose={closeModel}
          title="Add Task"
          children={<AddForm />}
        />
      )} */}
    </div>
    );
  }