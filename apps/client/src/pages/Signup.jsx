// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signup } from "../api/api"; // API call to signup

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await signup({ name, email, password });
//       // If signup is successful, navigate to the login page
//       if (response.status === 200) {
//         navigate("/login");
//       }
//     } catch (err) {
//       setError("Error during signup, please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4 text-center">
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//         <div className="text-center mt-2">
//           <span className="text-gray-600">Already have an account?</span>
//           <a href="/login" className="text-blue-500">
//             Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ name, email, password });
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError("Error during signup, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-br from-[#553f5d] to-[#45455a]">
      <div className="w-full max-w-lg sm:max-w-md p-10 bg-[#211f21] bg-opacity-20 backdrop-blur-lg rounded-4xl shadow-2xl text-center mx-6">
        <h2 className="text-2xl font-bold text-[#acacac] mb-6">Sign up</h2>
        {error && <div className="text-red-400 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>

          {/* Name Input */}
          <div className="relative mb-6">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="peer w-full px-4 pt-2 pb-2 bg-transparent border border-gray-500 rounded-lg text-[#acacac] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#553f5d]"
              placeholder="Name"
            />
            <label
              htmlFor="name"
              className="absolute left-3 -top-3.5 bg-[#211f21] px-1 text-sm text-gray-300 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-[#acacac]"
            >
              Name
            </label>
          </div>

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

          {/* Sign-up Button */}
          <button className="w-full bg-gradient-to-r from-[#45455a] to-[#353544] text-white py-2 rounded-full mt-1 hover:opacity-90 transition">
            Sign up
          </button>
        </form>

        {/* Already have account */}
        <p className="text-gray-300 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#7b5e87] hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;