// src/components/basics/WardrobeHeader.jsx

import React from 'react';
import logo from "./assets/logo.png";

const WardrobeHeader = () => {
  return (
    
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4"> 
       
        <img
          src={logo} 
          alt="DripTrack Logo"
          className="h-28 transform rotate-6" 
        />
        
        <h1
          className= "text-4xl md:text-4xl font-shrikhand text-custom-blue text-center md:text-left"
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          }}
        >
          My Closet
        </h1>
      </div>
   
  );
};

export default WardrobeHeader;
