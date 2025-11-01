import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Layout from "./Pages/Admin/Layout";
import Dashboard from "./Pages/Admin/Dashboard";
import Comments from "./Pages/Admin/Comments";
import AddBlog from "./Pages/Admin/AddBlog";
import ListBlog from "./Pages/Admin/ListBlog";
import Login from "./Components/Admin/Login";
import "quill/dist/quill.snow.css";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "../Context/AppContext";

function App() {
  const { token, setToken } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken && !token) {
      setToken(savedToken);
    }
  }, [token, setToken]);

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/" replace />;
  };

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={<h1 className="text-center mt-10">404 Not Found</h1>}
        />
      </Routes>
    </div>
  );
}

export default App;
