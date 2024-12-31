import React from 'react';
import logo from "./assets/logo.png";

const LoginHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
      {/* Logo */}
      <img
        src={logo}
        alt="DripTrack Logo"
        className="h-20 md:h-28 transform rotate-6"
      />
      {/* Title */}
      <span className="text-4xl md:text-4xl font-shrikhand text-gray-800 text-center md:text-left">
        DripTrack
      </span>
    </div>
  );
};

export default LoginHeader;
