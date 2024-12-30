import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WardrobeUpload from "./WardrobeUpload";
import WardrobeList from "./WardrobeList";
import Taskbar from "./basics/Taskbar";
import Footer from "./basics/Footer";
import Topbar from "./Topbar";

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // User is logged in
    } else {
      navigate("/auth"); // Redirect to login if no token found
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Show loading or redirecting state while checking
  }

  const email = localStorage.getItem("email");

  return (
    <div className="bg-custom-blue min-w-max border-black border-2">
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
