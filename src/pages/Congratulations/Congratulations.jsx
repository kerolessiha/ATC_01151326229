import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Congratulations = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Congratulations</title>
      </Helmet>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-200">
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center animate-fade-in">
          <h1 className="text-4xl font-extrabold text-green-600 mb-4">
            🎉 Congratulations!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your event has been booked successfully.
          </p>
          <button
            onClick={() => navigate("/Home")}
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Congratulations;
