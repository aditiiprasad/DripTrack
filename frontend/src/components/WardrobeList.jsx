import React, { useEffect, useState } from "react";
import axios from "axios";
import WardrobeHeader from "./basics/WardrobeHeader";
import ClosetList from "./ClosetList";

const WardrobeList = () => {
  return (
    <div className="min-h-screen bg-custom-pink flex flex-col items-center justify-center p-8 sm:p-8 lg:p-10">
      {/* Wardrobe Header */}
      <WardrobeHeader />

      {/* Closet List */}
      <div className="mt-8 w-full max-w-6xl  rounded-lg  p-6">
        <ClosetList />
      </div>
    </div>
  );
};

export default WardrobeList;
