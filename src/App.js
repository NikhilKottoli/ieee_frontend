// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";

// Set default axios config
axios.defaults.withCredentials = true;


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
