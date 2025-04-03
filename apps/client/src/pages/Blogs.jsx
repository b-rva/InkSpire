import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../api/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await fetchBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    getBlogs();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
