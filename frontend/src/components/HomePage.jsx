import React from "react";
import WardrobeUpload from "./WardrobeUpload";
import WardrobeList from "./WardrobeList";
import Taskbar from "./basics/Taskbar";
import Footer from "./basics/Footer";
import ClosetForm from "./ClosetForm";
import ClosetList from "./ClosetList";

const HomePage = () => {
  const email = localStorage.getItem("email");
  return (
    <div className="bg-custom-blue min-w-max border-2">
      
      <Taskbar />

      
      <div className="mt-20">

       
        <div id="wardrobeUpload" className="mt-16">
          <WardrobeUpload />
        </div>

      
        <div id="wardrobeList" >
          <WardrobeList />
        </div>
        
        
      </div>
      
    
   
      <Footer/>
    </div>
  );
};

export default HomePage;
