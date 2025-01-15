import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="text-blue-500 hover:underline text-lg font-medium"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
