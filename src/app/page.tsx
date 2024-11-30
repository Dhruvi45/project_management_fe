import Layout2 from "./layout2";

export default function Home() {
  return (
    <Layout2>

      <div className="container mx-auto text-center px-4 ">
        <h2 className="text-4xl font-bold mb-4">Welcome to basic project management system</h2>
        <p className="text-gray-600 mb-6">
        User CURD
        </p>
        <p className="text-gray-600 mb-6">
        Project CURD
        </p>
        <p className="text-gray-600 mb-6">
        Task CURD
        </p>
      </div>
    </Layout2>
  );
}
