import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Get user info from localStorage
  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if userId is not available in localStorage
    if (!email) {
      setError("User not authenticated.");
      return;
    }

    try {
      console.log({ title, content, email });
      const response = await axios.post(
        "https://ieee-project-ten.vercel.app/api/posts",
        { title, content, email },
      );
      setSuccess(response.data.message);
      setTitle("");
      setContent("");

      // Redirect to the posts page after success
      setTimeout(() => navigate("/posts"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create a New Post
      </h2>
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-sm text-green-600 bg-green-100 p-3 rounded">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="5"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;