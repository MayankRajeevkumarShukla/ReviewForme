import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateOrganization() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [orgURL, setOrgURL] = useState("");
  const [slug, setSlug] = useState("");
  const [logo, setLogo] = useState("");
  const [theme, setTheme] = useState("");
  
  const orgSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/create", {
        name,
        user,
        orgURL,
        slug,
        logo,
        theme,
      });
      toast.success("Organization created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white p-8 shadow-xl rounded-xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Your Organization
        </h1>
        
        <form onSubmit={orgSubmit} className="space-y-5">
          {[{ label: "Organization Name", state: name, setState: setName },
            { label: "User", state: user, setState: setUser },
            { label: "Organization URL", state: orgURL, setState: setOrgURL },
            { label: "Slug", state: slug, setState: setSlug },
            { label: "Logo", state: logo, setState: setLogo },
            { label: "Theme", state: theme, setState: setTheme }].map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col"
            >
              <label className="text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                type="text"
                value={field.state}
                onChange={(e) => field.setState(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
          >
            Create Organization
          </motion.button>
        </form>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />
    </div>
  );
}

export default CreateOrganization;
