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
          
         })
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setSuccess(""); // Reset success message
      }
      
    }
  return (
    <div>
      
    </div>
  )
}

export default CreateOrganization
