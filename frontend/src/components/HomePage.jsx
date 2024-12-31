import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WardrobeUpload from "./WardrobeUpload";
import WardrobeList from "./WardrobeList";
import Taskbar from "./basics/Taskbar";
import Footer from "./basics/Footer";
import Topbar from "./Topbar";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false);
      navigate("/auth");
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  const email = localStorage.getItem("email");

  return (
    <div className="bg-custom-blue w-full min-h-screen border-black border-2">
      <Taskbar />

      <div className="mt-24">
        <Topbar />
        <div id="wardrobeUpload">
          <WardrobeUpload />
        </div>

        <div id="wardrobeList">
          <WardrobeList />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
