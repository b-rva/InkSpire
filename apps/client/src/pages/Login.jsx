import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api"; // API call to login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      // If login is successful, navigate to the home page
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <a href="/reset-password" className="text-blue-500">
            Forgot password?
          </a>
        </div>
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account?</span>
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
