import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <i className="fa-solid fa-triangle-exclamation text-yellow-500 text-6xl mb-4"></i>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/Home"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
