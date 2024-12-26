import React from 'react';
import logo from "./assets/logo.png";

const LoginHeader = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex items-center space-x-4"> 
       
        <img
          src={logo} 
          alt="DripTrack Logo"
          className="h-28 transform rotate-6" 
        />
        
        <h1 className="text-7xl font-shrikhand text-gray-800">DripTrack</h1>
      </div>
    </div>
  );
};

export default LoginHeader;
