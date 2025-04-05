import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-[#553f5d] to-[45455a]">
      <div className="w-full max-w-lg sm:max-w-md p-10 bg-[#211f21] bg-opacity-20 backdrop-blur-lg rounded-4xl shadow-2xl text-center mx-6">
        <h2 className="text-2xl font-bold text-[#acacac] mb-6">Sign in</h2>
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 pt-2 pb-2 bg-transparent border border-gray-500 rounded-lg text-[#acacac] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#553f5d]"
              placeholder="Email"
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-3.5 bg-[#211f21] px-1 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#acacac]"
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full px-4 pt-2 pb-2 bg-transparent border border-gray-500 rounded-lg text-[#acacac] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#553f5d]"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className="absolute left-3 -top-3.5 bg-[#211f21] px-1 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#acacac]"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#acacac]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Sign-in Button */}
          <button className="w-full bg-gradient-to-r from-[#45455a] to-[#353544] text-white py-2 rounded-full mt-1 hover:opacity-90 transition">
            Sign in
          </button>
        </form>

        {/* Remember me & Forgot Password */}
        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-300 mt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-[#553f5d]" />
            <span>Remember me</span>
          </label>
          <a href="/reset-password" className="text-[#7b5e87] hover:underline mt-2 sm:mt-0">
            Need help?
          </a>
        </div>

        {/* Signup Link */}
        <p className="text-gray-300 text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#7b5e87] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>


);

};

export default Login;
