import Layout2 from "./layout2";

export default function Home() {
  return (
    <Layout2>
      <div className="bg-gray-100  m-0 p-0">
        {/* Navbar or Header can go here if needed */}

        {/* Main Content */}
        <div className="container mx-auto my-4 p-4 bg-white shadow-md rounded-lg h-64">
          <div className="container mx-auto text-center px-4 ">
            <h2 className="text-4xl font-bold mb-4">Welcome to My CRUD App</h2>
            <p className="text-gray-600 mb-6">
              Manage your data with a user-friendly, secure, and fully responsive
              application.
            </p>

          </div>
        </div>
      </div>
    </Layout2>
  );
}
