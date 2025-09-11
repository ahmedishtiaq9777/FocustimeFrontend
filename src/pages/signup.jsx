import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import api from "../axiospublic";

const signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/adduser", {
        name,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        // Registration successful
        alert("Registration successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Name Field */}
        <label
          htmlFor="name"
          className="block mb-2 font-semibold text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        {/* Email Field */}
        <label
          htmlFor="email"
          className="block mb-2 font-semibold text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        {/* Password Field */}
        <label
          htmlFor="password"
          className="block mb-2 font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        />

        {/* Error Message */}
        <label className="text-red-600">{error}</label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default signup;
