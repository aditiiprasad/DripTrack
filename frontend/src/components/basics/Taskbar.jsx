import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

const Taskbar = () => {
  const navigate = useNavigate();

  // Set initial active button to "wardrobe"
  const [activeButton, setActiveButton] = useState("wardrobe");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleScrollToSection = (sectionId, buttonName) => {
    // Scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    
    // Set the active button state
    setActiveButton(buttonName);
  };

  return (
    <div className="fixed top-3 left-3 right-3 md:left-5 md:right-5 rounded-full w-auto h-16 bg-custom-purple text-white flex items-center justify-between  shadow-[5px_5px_10px_rgba(0,0,0,1)] px-4 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 md:h-10 md:w-10 object-contain"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={() => handleScrollToSection("wardrobeList", "wardrobe")}
          className={`px-3 py-1 md:px-4 md:py-2  rounded-full font-extrabold text-sm md:text-base ${
            activeButton === "wardrobe"
              ? "bg-white text-black border-black border-b-4 border-r-4 hover:bg-gray-200"
              : "bg-transparent border-black hover:bg-gray-200 hover:text-black  hover:border-b-2 hover:border-r-2 "
          }`}
        >
          My Wardrobe
        </button>
        <button
          onClick={() => handleScrollToSection("wardrobeUpload", "upload")}
          className={`px-3 py-1 md:px-4 md:py-2  rounded-full font-extrabold text-sm md:text-base ${
            activeButton === "upload"
              ? "bg-white text-black border-black border-b-4 border-r-4 hover:bg-gray-200"
              : "bg-transparent border-black hover:bg-gray-200 hover:text-black  hover:border-b-2 hover:border-r-2 "
          }`}
        >
          Add in Closet
        </button>
        <button
          onClick={handleLogout}
          className="px-3 py-1 md:px-4 md:py-2 bg-custom-pink rounded-full font-extrabold text-black text-sm md:text-base 
                 border-b-2 border-r-2 border-black hover:border-b-4 hover:border-r-4 transition-all duration-75"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Taskbar;
