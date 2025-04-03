import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const { data } = await API.get("/blogs");
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    getBlogs();
  }, []);

  return (
    <div className="min-h-screen p-5 "> //bg-gray-100
      <h1 className="text-3xl font-bold text-center mb-6 underline">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content.substring(0, 100)}...</p>
            <Link to={`/blogs/${blog._id}`} className="text-blue-500">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
