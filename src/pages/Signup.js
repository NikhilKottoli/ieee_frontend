// src/pages/Signup.js
import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make POST request to the backend signup API
    axios
      .post("https://ieee-project-ten.vercel.app/api/auth/register", formData)
      .then((response) => {
        setMessage(response.data.message); // Display success message
        setFormData({ name: "", email: "", password: "" }); // Clear form
      })
      .catch((error) => {
        setMessage(
          error.response?.data?.error || "An error occurred. Please try again."
        );
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Signup</h1>
      <form
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
      {message && (
        <p className="text-center mt-4 text-red-500 font-semibold">{message}</p>
      )}
    </div>
  );
}

export default Signup;