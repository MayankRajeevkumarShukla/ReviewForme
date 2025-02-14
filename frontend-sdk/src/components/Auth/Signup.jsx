import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-300 to-gray-300">
      <motion.div
        initial={{opacity:0,y:-30}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.5}}
        className="w-full max-w-md bg-white p-8 shadow-xl rounded-xl"
        >
      
      <h2 className="text-3xl font-semibold md-4 text-center text-gray-800">Sign Up</h2>
      <p className="text-center">Create your account</p>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
           type="email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
           placeholder="Enter your email"
           required
          />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
         <button
         type="submit"
         className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:opacity-90 transition"
         >
          Signup
         </button>
      </form>
      <p
       text-center text-gray-500 text-sm mt-4
      >
         Already have an account? 
       <span
         className="text-blue-500 cursor-pointer hover:underline ml-1" 
       onClick={()=>navigate("/login")}
       >
        Login
       </span>
      </p>
      </motion.div>
    </div>
    

  );
}

export default Signup;
