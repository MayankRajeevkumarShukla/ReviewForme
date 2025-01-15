import React from "react";
import { Navigate,Link } from "react-router-dom";
function Home() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isAuthenticated ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-600">Hi! Whats?</p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Auth SDK
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Please log in to access your account.
          </p>
          <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
            Login
          </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
