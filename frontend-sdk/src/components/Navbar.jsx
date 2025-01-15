import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="hover:text-gray-300">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/Login" className="hover:text-gray-300">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-gray-300">
                  signup
                </Link>
              </>
            )}
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
