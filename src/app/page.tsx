"use client";
import { useEffect } from "react";
import Layout2 from "./layout2";
import { useAuth } from "./lib/useAuth";

export default function Home() {
  const { user, loadingAuth } = useAuth();
  useEffect(() => {
    if (loadingAuth) return; // Avoid rendering while loading the user data
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/login";
    }
  }, [user, loadingAuth]);
  return (
    <Layout2>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">
            Welcome to the Project Management System
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Manage your projects, tasks, and users efficiently.
          </p>
        </div>

        {/* Roles and Permissions Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin</h3>
            <p className="text-gray-600 mb-4">
              Full access to all resources and actions in the system.
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Projects: create, edit, delete, view</li>
              <li>Tasks: create, edit, delete, view</li>
              <li>Users: create, edit, delete, view</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Project Manager
            </h3>
            <p className="text-gray-600 mb-4">
              Manages projects and assigns tasks to team members.
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Projects: create, edit, view, delete</li>
              <li>Tasks: create, edit, delete, view</li>
              <li>Users: manage team members (create, view, edit, delete)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Team Member
            </h3>
            <p className="text-gray-600 mb-4">
              Contributes to tasks assigned to them and can view projects.
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Projects: view</li>
              <li>Tasks: edit details, view</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Guest</h3>
            <p className="text-gray-600 mb-4">
              Limited access to view projects only.
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Projects: view</li>
            </ul>
          </div>
        </div>

        {/* CRUD Actions Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            CRUD Operations
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-700">
                User Management
              </h4>
              <p className="text-gray-500">
                Create, Update, Read, and Delete Users
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Project Management
              </h4>
              <p className="text-gray-500">
                Create, Update, Read, and Delete Projects
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold text-gray-700">
                Task Management
              </h4>
              <p className="text-gray-500">
                Create, Update, Read, and Delete Tasks
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
}
