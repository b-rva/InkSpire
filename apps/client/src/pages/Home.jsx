import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import { FaBlog, FaHome, FaBook, FaCog, FaUser } from "react-icons/fa";

const Home = () => {
  const [hovered, setHovered] = useState(null);

  const navItems = [
    {
      label: "Blogs",
      icon: <FaBlog />,
      subOptions: ["All Blogs", "My Posts", "Create Blog"],
    },
    {
      label: "Profile",
      icon: <FaUser />,
      subOptions: ["View Profile", "Edit Profile"],
    },
    {
      label: "Settings",
      icon: <FaCog />,
      subOptions: ["Preferences", "Security"],
    },
  ];

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <div className="bg-[#211f21] w-16 flex flex-col items-center py-4 space-y-6">
        {navItems.map((item, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <button className="text-[#acacac] text-xl hover:text-white transition">
              {item.icon}
            </button>

            {/* Floating Submenu */}
            {hovered === index && (
              <div className="absolute left-full top-0 ml-2 bg-[#141314] rounded-lg shadow-lg py-2 w-40 z-10">
                {item.subOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 text-sm text-gray-300 hover:bg-[#553f5d] hover:text-white cursor-pointer"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-[#141314] p-4 text-white">
        {/* Page content goes here */}
        <h1 className="text-2xl font-bold">Home Page</h1>
      </div>
    </div>
  );
};

export default Home;
