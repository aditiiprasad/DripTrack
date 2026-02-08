// src/components/HomePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WardrobeUpload from "./WardrobeUpload";
import WardrobeList from "./WardrobeList";
import Taskbar from "./basics/Taskbar";
import Footer from "./basics/Footer";
import Topbar from "./Topbar";
import Stats from "./Stats";
import Modal from "./Modal"; 
import Wishlist from "./Wishlist";
import OutfitCreator from "./OutfitCreator";
import '@fortawesome/fontawesome-free/css/all.min.css';


const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/auth");
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-custom-blue w-full min-h-screen border-black border-2 relative">
      <Taskbar />

      <div className="mt-24" id="topbar">
        <Topbar />
        <div id="stats">
          <Stats />
        </div>
         <div id="wishlist">
          <Wishlist />
        </div>
        <div id="outfits">
          <OutfitCreator />
        </div>
        <div id="wardrobeUpload">
          <WardrobeUpload />
        </div>
        <div id="wardrobeList">
          <WardrobeList />
        </div>

      </div>

      <Footer />

      {/* Floating Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 bg-pink-700 text-white px-4 py-2 rounded-full shadow-lg border-2 border-r-4 border-b-4 border-black font-bold hover:bg-custom-pink hover:text-black transition duration-300 flex items-center gap-2"
      >
      
       
        Chat with
        <i className="fas fa-robot"></i>
      </button>

      {/* Modal */}
      {isModalOpen && <Modal onClose={toggleModal} />}
    </div>
  );
};

export default HomePage;
