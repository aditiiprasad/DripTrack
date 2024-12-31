import React from "react";
import wardrobeImage from "./basics/assets/bulb.gif"; 

const Intro = () => {
  const email = localStorage.getItem("email"); 

  return (
    <>
        
          <div className="bg-white border border-black p-6 sm:p-4 rounded-3xl border-r-4 border-b-4 shadow-lg max-w-4xl flex flex-col sm:flex-row items-center sm:items-start hover:bg-yellow-300 hover:scale-105">
            {/* Image Section */}
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <img
                src={wardrobeImage}
                alt="Wardrobe"
                className="w-40 h-40 sm:w-60 sm:h-60 object-cover rounded-lg border border-black border-r-4 border-b-4 bg-white "
              />
            </div>
    
            {/* Text Section */}
            <div className="text-center sm:text-left  text-gray-800 text-sm sm:text-lg">
              <p className="font-extrabold">
                Ever feel like you have nothing to wear, even though your wardrobe is
                packed? <span className="font-bold text-custom-purple">DripTrack</span> is
                here to change that. It helps you keep track of what clothes you
                already have and how often you wear them—all from your phone.
              </p>
              <br />
              <p className="font-extrabold">
                No more digging through piles or buying clothes you don’t need. Just
                scroll through your wardrobe, mix and match outfits, and you’ll always
                know what you’ve got. Plus, by reducing unnecessary purchases, we’re
                all about <span className="font-bold text-lime-700">sustainability</span> and keeping your wardrobe organized.
              </p>
            </div>
          </div>
    </>
  );
};

export default Intro;
