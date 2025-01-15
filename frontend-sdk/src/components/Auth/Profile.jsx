import React, { useState, useEffect } from "react";
import axios from "axios";
function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProFile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token not found. Please log in.");
          return;
        }
        const response = await axios.get(
          "http://localhost:8000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Something went wrong.");
      }
    };
    fetchProFile();
  }, []);
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-500">Loading profile...</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-lg">
          <strong>Username:</strong> {profile.username}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {profile.email}
        </p>
      </div>
    </div>
  );
}

export default Profile;
