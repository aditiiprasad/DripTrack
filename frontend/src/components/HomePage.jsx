import React from "react";
import WardrobeUpload from "./WardrobeUpload";
import WardrobeList from "./WardrobeList";
import Taskbar from "./basics/Taskbar";

const HomePage = () => {
  return (
    <div className="bg-custom-blue border-2">
      {/* Taskbar component */}
      <Taskbar />

      {/* Page Content with sections */}
      <div className="mt-20">

        {/* Wardrobe Upload Section */}
        <div id="wardrobeUpload" className="mt-16">
          <WardrobeUpload />
        </div>

        {/* Wardrobe List Section */}
        <div id="wardrobeList">
          <WardrobeList />
        </div>

        
      </div>
    </div>
  );
};

export default HomePage;
