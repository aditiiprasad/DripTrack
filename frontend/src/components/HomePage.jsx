import React from "react";
import WardrobeUpload from "./WardrobeUpload";
import WardrobeList from "./WardrobeList";
import Taskbar from "./basics/Taskbar";
import Footer from "./basics/Footer";

import Topbar from "./Topbar";

const HomePage = () => {
  const email = localStorage.getItem("email"); 

  return (
    <div className="bg-custom-blue min-w-max border-black border-2">
      <Taskbar />

      <div className="mt-24  ">
       
     
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
