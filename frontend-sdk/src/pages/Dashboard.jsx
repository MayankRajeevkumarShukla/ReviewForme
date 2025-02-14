import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Dashboard() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [orgURL, setOrgURL] = useState("");
  const [slug, setSlug] = useState("");
  const [logo, setLogo] = useState("");
  const [theme, setTheme] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const orgSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/create", {
        name,
        user,
        orgURL,
        slug,
        logo,
        theme,
      });
      setSuccess("Organization Created Successfully!");
      setError(""); // Reset error
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess(""); // Reset success message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 shadow-xl rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Create Your Organization
        </h1>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}

        <form onSubmit={orgSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter organization name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter user"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization URL</label>
            <input
              type="text"
              value={orgURL}
              onChange={(e) => setOrgURL(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter slug"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
            <input
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter logo URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter theme"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition"
          >
            Create Organization
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Dashboard;
