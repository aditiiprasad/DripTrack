import React, { useEffect, useState } from "react";
import WardrobeUpload from "./WardrobeUpload";
import WardrobeList from "./WardrobeList";
import Taskbar from "./basics/Taskbar";
import Footer from "./basics/Footer";
import Topbar from "./Topbar";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const email = localStorage.getItem("email"); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return <div>Please log in to view this page.</div>; 
  }

  return (
    <div className="bg-custom-blue min-w-max border-black border-2">
      <Taskbar />

      <div className="mt-24">
        <Topbar/>
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
