import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link to="/">Blog</Link>
        </h1>

        <h1 className="text-white text-2xl font-bold">
          <Link to="/createPost">Create a New Post</Link>
        </h1>
        <div>
          <Link
            to="/login"
            className="text-white hover:text-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            Login
          </Link>

          <Link to="/signup" className="text-white hover:text-gray-200 px-4 py-2 rounded-lg transition-colors">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
