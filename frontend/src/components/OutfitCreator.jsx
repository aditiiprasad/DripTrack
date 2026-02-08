// src/components/OutfitCreator.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaCheck } from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const OutfitCreator = () => {
  const [closetItems, setClosetItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Default view is "My Outfits"
  const [view, setView] = useState("list"); 

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  // 1. Fetch Data
  useEffect(() => {
    if (token) {
      fetchCloset();
      fetchOutfits();
    }
  }, [token]);

  const fetchCloset = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/closet/list/${email}`, config);
      setClosetItems(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchOutfits = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/outfits/list/${email}`, config);
      setOutfits(res.data);
    } catch (err) { console.error(err); }
  };

  // 2. Handle Selection
  const toggleSelection = (id) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter(itemId => itemId !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  // 3. Save Outfit
  const handleSaveOutfit = async () => {
    if (!outfitName.trim() || selectedItemIds.length === 0) return alert("Please name your outfit and select items!");
    
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/outfits/create`, {
        outfitName,
        itemIds: selectedItemIds
      }, config);
      
      alert("Outfit Created! 🔥");
      setOutfitName("");
      setSelectedItemIds([]);
      fetchOutfits(); 
      setView("list"); 
    } catch (error) {
      alert("Failed to create outfit");
    } finally {
      setLoading(false);
    }
  };

  // 4. Delete Outfit
  const handleDeleteOutfit = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/outfits/delete/${id}`, config);
      setOutfits(outfits.filter(o => o._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-custom-purple p-8  border-black">
      
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="bg-white px-8 py-4 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-3xl font-shrikhand text-black">Mix & Match 🎨</h1>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => setView("create")}
            className={`px-6 py-2 rounded-full font-bold border-2 border-black transition-all ${view === "create" ? "bg-custom-blue text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white hover:bg-gray-100"}`}
          >
            Create New
          </button>
          <button 
            onClick={() => setView("list")}
            className={`px-6 py-2 rounded-full font-bold border-2 border-black transition-all ${view === "list" ? "bg-custom-blue text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white hover:bg-gray-100"}`}
          >
            My Outfits
          </button>
        </div>
      </div>

      {/* VIEW: CREATE OUTFIT */}
      {view === "create" && (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Selection Area (Circular Grid) */}
          <div className="flex-[2] bg-white/10 p-4 rounded-3xl border-4 border-black border-dashed">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[70vh] overflow-y-auto p-2">
              {closetItems.map(item => {
                const isSelected = selectedItemIds.includes(item._id);
                return (
                  <div 
                    key={item._id} 
                    onClick={() => toggleSelection(item._id)}
                    className="cursor-pointer flex flex-col items-center group relative"
                  >
                    {/* Circular Image Container */}
                    <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 overflow-hidden transition-all duration-200 ${
                      isSelected 
                        ? "border-green-400 scale-105 shadow-[0px_0px_0px_4px_rgba(74,222,128,0.5)]" 
                        : "border-black group-hover:scale-110"
                    }`}>
                      <img src={item.imageUrl} alt={item.clothName} className="w-full h-full object-cover" />
                      
                      {/* Green Overlay when selected */}
                      {isSelected && <div className="absolute inset-0 bg-green-400 bg-opacity-20"></div>}
                    </div>

                    {/* Checkmark Badge */}
                    {isSelected && (
                      <div className="absolute top-0 right-2 md:right-4 bg-green-400 text-black rounded-full p-1.5 z-10 border-2 border-black shadow-sm">
                        <FaCheck className="text-sm" />
                      </div>
                    )}
                    
                    {/* Item Name Label */}
                    <span className={`mt-3 font-bold font-shrikhand text-sm text-center px-3 py-1 rounded-full border-2 border-black transition-colors ${
                       isSelected ? "bg-green-400 text-black" : "bg-white text-black"
                    }`}>
                      {item.clothName}
                    </span>
                  </div>
                );
              })}
             </div>
          </div>

          {/* Right: Save Panel */}
          <div className="flex-1 bg-white p-6 rounded-3xl border-4 border-black h-fit shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-4">
            <h2 className="text-2xl font-shrikhand mb-4 text-center">Current Look</h2>
            
            <div className="mb-6 flex justify-center">
              <span className="font-bold bg-custom-pink text-white px-4 py-1 rounded-full border-2 border-black shadow-sm">
                {selectedItemIds.length} items selected
              </span>
            </div>

            <input 
              type="text" 
              placeholder="Name this look (e.g. Date Night)" 
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
              className="w-full p-4 border-4 border-black rounded-2xl font-bold mb-4 focus:outline-none focus:border-custom-blue transition-colors"
            />

            <button 
              onClick={handleSaveOutfit}
              disabled={loading || selectedItemIds.length === 0}
              className="w-full bg-green-400 text-black text-xl p-4 rounded-2xl border-4 border-black font-shrikhand hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all disabled:bg-gray-300 disabled:shadow-none disabled:translate-y-0"
            >
              {loading ? "Saving..." : "Save Outfit"}
            </button>
          </div>
        </div>
      )}

      {/* VIEW: OUTFIT LIST */}
      {view === "list" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outfits.length === 0 ? (
             <div className="col-span-full flex flex-col items-center justify-center pt-10 opacity-70">
                <h2 className="text-white font-shrikhand text-3xl text-center mb-2">No outfits yet! 😢</h2>
                <p className="text-white font-bold text-lg">Click "Create New" to mix and match!</p>
             </div>
          ) : (
            outfits.map(outfit => (
              <div key={outfit._id} className="bg-white rounded-3xl border-4 border-black p-4 relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-[1.02] transition-transform">
                <div className="flex justify-between items-start mb-4 border-b-2 border-black pb-2">
                  <h3 className="text-xl font-shrikhand">{outfit.outfitName}</h3>
                  <button onClick={() => handleDeleteOutfit(outfit._id)} className="text-red-500 hover:scale-110 transition bg-red-100 p-2 rounded-full border-2 border-transparent hover:border-red-500">
                    <FaTrash />
                  </button>
                </div>
                
                {/* Outfit Collage Grid (Small Circles) */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {outfit.items.map(item => (
                    <div key={item._id} className="w-16 h-16 rounded-full overflow-hidden border-2 border-black bg-gray-100">
                      <img src={item.imageUrl} alt={item.clothName} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default OutfitCreator;