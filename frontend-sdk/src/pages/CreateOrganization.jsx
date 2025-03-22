import React from 'react'
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
function CreateOrganization() {
  const [name,setName] = useState("")
  const [user,setUser] = userState("")
  const [orgURL,setOrgURL] = useState("")
  const [slug, setSlug] = useState("");
    const [logo, setLogo] = useState("");
    const [theme, setTheme] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const orgSubmit =async(e)=>{
      e.preventDefault();
      try {
         const response = await axios.post("http://localhost:8000/create",{
          name,
          user,
          orgURL,
          slug,
          logo,
          theme,
         })
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setSuccess(""); // Reset success message
      }
      
    }
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
        {error && <p className='"text-red-500 text-sm mb-4 text-center'>{error}</p>}
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

        </form>
      </motion.div>
      
    </div>
  )
}

export default CreateOrganization
