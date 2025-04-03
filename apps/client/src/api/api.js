import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// User Authentication API Calls
export const login = (credentials) => API.post("/auth/login", credentials);
export const signup = (userData) => API.post("/auth/signup", userData);
export const logout = () => API.post("/auth/logout");
export const sendResetEmail = (email) => API.post("/auth/send-reset-email", { email });
export const requestPasswordReset = (data) => API.post("/auth/request-password-reset", data);
export const resetPassword = (token, password) => API.post(`/auth/reset-password/${token}`, { password });

// Blog API Calls
export const fetchBlogs = () => API.get("/blogs/getBlogs"); // Get all blogs
export const fetchBlogById = (id) => API.get(`/blogs/getBlog/${id}`); // Get blog by ID
export const createBlog = (blogData) => API.post("/blogs/createBlog", blogData); // Create a new blog
export const updateBlog = (id, blogData) => API.put(`/blogs/updateBlog/${id}`, blogData); // Update blog
export const deleteBlog = (id) => API.delete(`/blogs/deleteBlog/${id}`); // Delete blog

// Upvote/Downvote API Calls
export const upvoteBlog = (id) => API.post(`/blogs/${id}/upvote`);
export const downvoteBlog = (id) => API.post(`/blogs/${id}/downvote`);

export default API;
