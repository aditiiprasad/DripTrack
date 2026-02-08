// src/components/Stats.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaCrown, FaGhost, FaPercentage } from "react-icons/fa";

const API_URL = import.meta.env.VITE_BACKEND_URL;

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
  const [stats, setStats] = useState(null);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const config = { headers: { Authorization: `Bearer ${token}` } };

  const allCategories = [
    "Pants", "Shirts", "T-Shirts", "Skirts", "Dresses", "Shoes", 
    "Accessories", "Indian Wear", "Winter Wear", "Shorts"
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/closet/stats/${email}`, config);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

    if (email && token) fetchStats();
  }, [email, token]);

  if (!stats) {
    return <div className="text-center font-extrabold text-zinc-800 p-10"><div className="circular-loader mx-auto mb-2"></div> Loading stats...</div>;
  }

  // --- NEW: Calculate Insights ---
  
  // 1. Chart Data
  const categoryData = allCategories.map(category => {
    const categoryObj = stats.categoryUsagePercentage.find(c => c.category === category);
    return categoryObj ? categoryObj.percentage : 0;
  });

  // 2. Active Wardrobe %
  const activeCount = stats.totalItems - stats.unusedItems;
  const activePercentage = stats.totalItems > 0 
    ? Math.round((activeCount / stats.totalItems) * 100) 
    : 0;

  // 3. Top Vibe (Most dominant category)
  const topCategory = stats.categoryUsagePercentage.length > 0 
    ? stats.categoryUsagePercentage.reduce((prev, current) => (prev.percentage > current.percentage) ? prev : current)
    : { category: "None", percentage: 0 };

  const data = {
    labels: allCategories,
    datasets: [
      {
        data: categoryData,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#ffcd56", "#FFB6C1", "#C71585", "#1E90FF", "#32CD32"
        ],
        borderWidth: 2,
        borderColor: "#000000",
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      
      {/* Title */}
      <div className="bg-white px-8 py-4 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-10 w-fit mx-auto transform -rotate-1">
        <h2 className="text-3xl font-shrikhand text-black text-center">
           Closet Insights 📊
        </h2>
      </div>

      {/* --- ROW 1: KEY METRICS (Replaced simple cards with Insights) --- */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        
        {/* Metric 1: Total Items */}
        <div className="w-full sm:w-1/3 md:w-1/4 p-4 bg-white rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center hover:scale-105 transition-transform">
          <span className="text-4xl mb-2">🧥</span>
          <h3 className="text-lg font-extrabold text-gray-500 uppercase tracking-wider">Total Size</h3>
          <p className="text-4xl font-shrikhand text-black">{stats.totalItems}</p>
        </div>

        {/* Metric 2: Active Wardrobe % (NEW) */}
        <div className="w-full sm:w-1/3 md:w-1/4 p-4 bg-custom-blue rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center hover:scale-105 transition-transform text-white">
          <FaPercentage className="text-4xl mb-2" />
          <h3 className="text-lg font-extrabold uppercase tracking-wider">Utilization</h3>
          <p className="text-4xl font-shrikhand">{activePercentage}%</p>
          <span className="text-xs font-bold mt-1">Active Wardrobe</span>
        </div>

        {/* Metric 3: Style Persona (NEW) */}
        <div className="w-full sm:w-1/3 md:w-1/4 p-4 bg-custom-pink rounded-3xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center hover:scale-105 transition-transform text-white">
          <FaCrown className="text-4xl mb-2" />
          <h3 className="text-lg font-extrabold uppercase tracking-wider">Your Vibe</h3>
          <p className="text-2xl font-shrikhand text-center mt-1">{topCategory.category || "Newbie"}</p>
          <span className="text-xs font-bold mt-1">Most Worn Category</span>
        </div>
      </div>

      {/* --- ROW 2: DETAILED LISTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Least Worn */}
        <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
           <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
              <FaGhost className="text-2xl text-gray-400"/>
              <h3 className="text-2xl font-shrikhand text-black">Ghost Items</h3>
              <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded-full border border-black ml-auto">Least Worn</span>
           </div>
           
           {stats.leastWornItems && stats.leastWornItems.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center">
                {stats.leastWornItems.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="w-20 h-20 rounded-full border-2 border-black overflow-hidden bg-gray-100 group-hover:scale-110 transition-transform">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold mt-1 bg-gray-100 px-2 rounded-md border border-black truncate w-24 text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center font-bold text-gray-400 py-4">You wear everything! Amazing! 🌟</p>
            )}
        </div>

        {/* Most Popular */}
        <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
           <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
              <span className="text-2xl">🔥</span>
              <h3 className="text-2xl font-shrikhand text-black">Wardrobe Heroes</h3>
              <span className="text-xs font-bold bg-yellow-300 px-2 py-1 rounded-full border border-black ml-auto">Most Worn</span>
           </div>

           {stats.mostPopularItems && stats.mostPopularItems.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center">
                {stats.mostPopularItems.map((item, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="w-20 h-20 rounded-full border-2 border-black overflow-hidden bg-yellow-100 ring-2 ring-yellow-400 group-hover:scale-110 transition-transform">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-bold mt-1 bg-yellow-200 px-2 rounded-md border border-black truncate w-24 text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center font-bold text-gray-400 py-4">Start wearing items to see stats! 🚀</p>
            )}
        </div>
      </div>

      {/* --- ROW 3: CHART --- */}
      <div className="flex justify-center">
         <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-md">
            <h3 className="text-xl font-shrikhand text-center mb-4 border-b-2 border-black pb-2">Category Split</h3>
            <Pie data={data} />
         </div>
      </div>

    </div>
  );
};

export default Stats;