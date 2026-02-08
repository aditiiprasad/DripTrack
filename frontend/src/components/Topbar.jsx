import React from "react";
import { FaChartPie, FaMagic, FaHeart, FaPlus, FaTshirt } from "react-icons/fa";

const Topbar = () => {
  const email = localStorage.getItem("email");

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full px-4 pt-20 pb-8 flex flex-col xl:flex-row items-center justify-between gap-6 max-w-7xl mx-auto ">
      
      {/* LEFT: Mini Logged In Badge */}
      <div className="flex-shrink-0 order-2 xl:order-1">
        <div className="bg-white px-4 py-2 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-extrabold flex items-center gap-2 transform -rotate-1">
          <div className="w-3 h-3 bg-green-400 rounded-full border border-black animate-pulse"></div>
          <span className="text-gray-500">USER:</span> 
          <span className="text-black truncate max-w-[150px] sm:max-w-xs">{email}</span>
        </div>
      </div>

      {/* RIGHT: Dashboard Navigation */}
      <div className="flex flex-wrap justify-center items-center gap-3 w-full xl:w-auto order-1 xl:order-2">
        
        {/* 1. Insights */}
        <button 
          onClick={() => handleScroll("stats")}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-black border-b-4 border-r-4 font-bold hover:bg-yellow-200 active:translate-y-1 active:shadow-none transition-all"
        >
          <FaChartPie className="text-custom-blue" /> Insights
        </button>

        {/* 2. Outfit Maker */}
        <button 
          onClick={() => handleScroll("outfits")}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-black border-b-4 border-r-4 font-bold hover:bg-yellow-200 active:translate-y-1 active:shadow-none transition-all"
        >
          <FaMagic className="text-purple-500" /> Outfit Maker
        </button>

        {/* 3. Wishlist */}
        <button 
          onClick={() => handleScroll("wishlist")}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-black border-b-4 border-r-4 font-bold hover:bg-yellow-200 active:translate-y-1 active:shadow-none transition-all"
        >
          <FaHeart className="text-custom-red" /> Wishlist
        </button>

        {/* 4. Add Outfit (Add Item) */}
        <button 
          onClick={() => handleScroll("wardrobeUpload")}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-black border-b-4 border-r-4 font-bold hover:bg-yellow-200 active:translate-y-1 active:shadow-none transition-all"
        >
          <FaPlus className="text-green-600" /> Add Item
        </button>

        {/* 5. MY WARDROBE (Prominent) */}
        <button 
          onClick={() => handleScroll("wardrobeList")}
          className="flex items-center gap-2 bg-custom-red text-white px-6 py-3 rounded-2xl border-2 border-black border-b-4 border-r-4 font-shrikhand text-lg hover:scale-105 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all ml-2"
        >
          <FaTshirt /> MY WARDROBE
        </button>

      </div>

    </div>
  );
};

export default Topbar;