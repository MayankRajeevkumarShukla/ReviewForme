import React, { useState } from "react";
import axios from "axios";

function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const route = isRegistering ? "/register" : "/login";
      const payload = { username, password, ...(isRegistering && { email }) };
      const response = await axios.post(route, payload, { withCredentials: true });
      setMessage(response.data.message);
      if (!isRegistering) window.location.reload(); // Reload on login
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout", {}, { withCredentials: true });
      setMessage(response.data.message);
      window.location.reload(); // Reload on logout
    } catch (error) {
      setMessage("An error occurred while logging out");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isRegistering && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <button onClick={toggleForm} className="text-blue-500 hover:underline">
          {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
        {!isRegistering && (
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Auth;
