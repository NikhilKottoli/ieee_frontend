import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Post() {
  const { id } = useParams(); // Get post id from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);  // Use state for userId
  const [currentUser, setCurrentUser] = useState(null); // Use state to store user info (optional)
  const [Author, setAuthor] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Retrieve user info from localStorage directly
    const storedUserId = localStorage.getItem("userId");
    const storedEmail = localStorage.getItem("email");

    console.log("userId", storedUserId);
    console.log("email", storedEmail);
    
    if (storedUserId && storedEmail) {
      setUserId(storedUserId);  // Set userId from localStorage
      setCurrentUser({ userId: storedUserId, email: storedEmail });
    } else {
      setError("User is not logged in.");
    }
  }, []);

  useEffect(() => {
    axios
      .get(`https://ieee-project-ten.vercel.app/api/posts/${id}`)
      .then((response) => {
        setAuthor(response.data.email);
        setPost(response.data);
        setTitle(response.data.title); // Pre-fill the title
        setAuthor(response.data.email);
        setContent(response.data.content); // Pre-fill the content
        setError(""); // Clear any previous errors
      })

      .catch((error) => {
        setError("Error fetching post");
        console.error("Error fetching post:", error);
      });
  }, [id]);

  const handleEditPost = () => {
    if (!title || !content || !userId) {
      setError("Title, content, and user login are required.");
      return;
    }
  
    const requestData = { email: post.email, user_email: currentUser.email, title, content };
    console.log("requestData", requestData);
    axios.put(`https://ieee-project-ten.vercel.app/api/posts/edit/${id}`, requestData)
      .then(response => {
        setPost(response.data);
        setIsEditing(false);
        setError(""); // Clear error
  
        // Fetch updated post
        axios.get(`https://ieee-project-ten.vercel.app/api/posts/${id}`)
          .then(response => {
            setPost(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
          })
          .catch(() => setError("Error fetching post"));
      })
      .catch(() => setError("Error updating post"));
  };  

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : post ? (
          <>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  rows="5"
                ></textarea>
                <button
                  onClick={handleEditPost}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="ml-4 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{post.title}</h1>
                <p className="text-gray-700 text-lg leading-7">{post.content}</p>
                {currentUser && (
                  <>
                    {post.email === currentUser.email ? (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                          Edit Post
                        </button>

                        <button
                          onClick={() => {
                            const authorEmail = "author@example.com";  // Replace with the actual author's email

                            axios
                              .delete(`https://ieee-project-ten.vercel.app/api/posts/delete/${id}`, {
                                data: {
                                  email: post.email,
                                  user_email:currentUser.email,
                                }
                              })
                              .then(() => {
                                console.log("Post deleted successfully");
                                navigate("/");
                              })
                              .catch((error) => {
                                console.error("Error deleting post:", error);
                              });
                          }}
                          className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete Post
                        </button>
                      </>
                    ) : null}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Post;