import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {
  const [stats, setStats] = useState(null);
  const email = localStorage.getItem("email");

  const allCategories = [
    "All", "Pants", "Shirts", "T-Shirts", "Skirts", "Dresses", "Shoes", 
    "Accessories", "Indian Wear", "Winter Wear", "Shorts"
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`https://driptrack.onrender.com/api/closet/stats/${email}`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

    if (email) {
      fetchStats();
    }
  }, [email]);

  if (!stats) {
    return <div className="text-center font-extrabold text-zinc-800"><div className="circular-loader"></div> Loading stats...</div>;
  }

  const categoryData = allCategories.map(category => {
    const categoryObj = stats.categoryUsagePercentage.find(c => c.category === category);
    return categoryObj ? categoryObj.percentage : 0;
  });

  const categoryLabels = allCategories;

  const data = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#4BC0C0", "#FFB6C1", "#C71585", "#1E90FF", "#32CD32"
        ],
        hoverBackgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#4BC0C0", "#FFB6C1", "#C71585", "#1E90FF", "#32CD32"
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6 ">
      <h2 className="text-2xl font-shrikhand text-white text-center mb-6"
      style={{
        textShadow:
          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      }}>Your Closet Stats</h2>

      <div className="flex flex-wrap justify-between mb-6">
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 bg-white transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-300 border border-b-4 border-r-4 border-black rounded-full">
          <h3 className="text-xl font-extrabold text-gray-700">Total Items: {stats.totalItems || 0}</h3>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 bg-white transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-300 border border-b-4 border-r-4 border-black rounded-full">
          <h3 className="text-xl font-extrabold text-gray-700">Unused Items: {stats.unusedItems || 0}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="p-4 bg-gray-100 rounded-2xl border border-b-4 border-r-4 border-black mb-4 transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-300">
            <h3 className="text-xl font-extrabold text-gray-700 mb-2">Least Worn Items:</h3>
            {stats.leastWornItems && stats.leastWornItems.length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {stats.leastWornItems.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <img src={item.imageUrl} alt={item.name} className="w-28 h-28 object-cover rounded-full border border-b-4 border-r-4 border-black" />
                    <span className="text-zinc-800 font-extrabold">{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No least worn items.</p>
            )}
          </div>

          <div className="p-4 bg-gray-100 rounded-2xl border border-b-4 border-r-4 border-black transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-300">
            <h3 className="text-xl font-extrabold text-gray-700 mb-2">Most Popular Items:</h3>
            {stats.mostPopularItems && stats.mostPopularItems.length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {stats.mostPopularItems.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <img src={item.imageUrl} alt={item.name} className="w-28 h-28 object-cover rounded-full border border-b-4 border-r-4 border-black" />
                    <span className="text-zinc-800 font-extrabold">{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No popular items yet.</p>
            )}
          </div>
        </div>

        <div className="flex justify-center p-2 bg-white rounded-3xl transform transition-transform duration-300 hover:scale-105 hover:bg-yellow-300 border border-b-4 border-r-4 border-black items-center">
          <div className="w-full max-w-md">
            <h3 className="text-xl font-extrabold text-gray-700 mb-4">Category Usage:</h3>
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
