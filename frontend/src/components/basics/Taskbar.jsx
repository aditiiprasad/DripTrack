// src/components/basics/Taskbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

const Taskbar = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("stats");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleScrollToSection = (sectionId, buttonName = null) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (buttonName) {
      setActiveButton(buttonName);
    }
  };

  return (
    <div className="fixed top-3 left-3 right-3 md:left-5 md:right-5 rounded-full border w-auto h-16 bg-custom-purple text-white flex items-center justify-between border-b-4 border-r-4 border-black px-4 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 md:h-10 md:w-10 object-contain cursor-pointer"
          onClick={() => handleScrollToSection("topbar", "topbar")}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => handleScrollToSection("stats", "stats")}
          className={`px-3 py-1 md:px-4 md:py-2 rounded-full font-extrabold text-sm md:text-base ${
            activeButton === "stats"
              ? "bg-white border text-black border-black border-b-4 border-r-4 hover:bg-gray-200"
              : "bg-transparent border border-black hover:bg-gray-200 hover:text-black hover:border-b-2 hover:border-r-2"
          }`}
        >
          Stats
        </button>
        <button
          onClick={() => handleScrollToSection("wardrobeList", "wardrobe")}
          className={`px-3 py-1 md:px-4 md:py-2 rounded-full font-extrabold text-sm md:text-base ${
            activeButton === "wardrobe"
              ? "bg-white border text-black border-black border-b-4 border-r-4 hover:bg-gray-200"
              : "bg-transparent border border-black hover:bg-gray-200 hover:text-black hover:border-b-2 hover:border-r-2"
          }`}
        >
          My Closet
        </button>
        
        {/* REPLACED BUTTON: Back to Top */}
        <button
          onClick={() => handleScrollToSection("topbar", "topbar")}
          className={`px-3 py-1 md:px-4 md:py-2 rounded-full font-extrabold text-sm md:text-base ${
            activeButton === "topbar"
              ? "bg-white border text-black border-black border-b-4 border-r-4 hover:bg-gray-200"
              : "bg-transparent border border-black hover:bg-gray-200 hover:text-black hover:border-b-2 hover:border-r-2"
          }`}
        >
          Back to Top
        </button>

        <button
          onClick={handleLogout}
          className="px-3 border py-1 md:px-4 md:py-2 bg-custom-pink rounded-full font-extrabold text-black text-sm md:text-base 
            border-b-2 border-r-2 border-black hover:border-b-4 hover:border-r-4 transition-all duration-75"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Taskbar;