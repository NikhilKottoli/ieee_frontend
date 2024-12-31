import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("userId", localStorage.getItem("userId"));
    console.log("email", localStorage.getItem("email"));
    setCurrentUser({
      id: localStorage.getItem("userId"),
      email: localStorage.getItem("email"),
    });

    setLoading(false); // Set loading to false when data is loaded
  }, []);

  useEffect(() => {
    axios.get("https://ieee-project-ten.vercel.app/api/posts").then((response) => {
      setPosts(response.data);
    }
    );
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-blue-600">Blog Posts</h1>
          {currentUser && (
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Welcome, {currentUser.email}
              </h2>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;