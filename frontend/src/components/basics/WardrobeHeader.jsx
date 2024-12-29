
import React from 'react';
import logo from "./assets/logo.png";

const WardrobeHeader = () => {
  return (
    <div className=" w-1/2 flex justify-center items-center ">
      <div className="flex items-center space-x-4"> 
       
        <img
          src={logo} 
          alt="DripTrack Logo"
          className="h-28 transform rotate-6" 
        />
        
        <h1
          className="text-7xl font-shrikhand text-custom-blue relative"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          My Closet
        </h1>
      </div>
    </div>
  );
};

export default WardrobeHeader;
