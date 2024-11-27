export default function Footer() {
    return (
      <footer className="bg-gray-800 text-gray-400 py-3">
      <div className="container mx-auto text-center space-y-2">
        <p>
          <a href="https://github.com/your-github-profile" target="_blank" className="hover:underline">
            GitHub
          </a>{" "}
          |{" "}
          <a href="https://www.linkedin.com/in/your-linkedin-profile/" target="_blank" className="hover:underline">
            LinkedIn
          </a>
        </p>
        <p>Created by Your Name</p>
      </div>
    </footer>
    );
  }
  