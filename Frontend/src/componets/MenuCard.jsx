import React from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
//  MenuCard  –  Production-ready special menu category card
//  - Uses background image with dark overlay for optimal readability
//  - Displays dynamic list of items (limited to 5 for clean layout)
//  - "Explore More" links to full menu page
// ─────────────────────────────────────────────────────────────

const MenuCard = ({ title, bgImage, items = [], onExplore }) => {
  const navigate = useNavigate();

  const handleExplore = onExplore || (() => navigate("/menu"));

  return (
    <div
      className="w-70 h-100 bg-cover bg-center text-white flex flex-col justify-center items-center relative overflow-hidden rounded-lg shadow-xl group hover:scale-105 transition-all duration-300"
      style={{ backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.62),rgb(16, 29, 40,0.80)), url(${bgImage}), url(../src/assets/img/team1.png)` 
     }}
    >
      {/* Dark overlay ensuring text is always crisp and readable over any image */}
      <div className="absolute inset-0  group-hover:bg-black/50 transition-colors"></div>

      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 w-full">
        <h1 className="text-3xl font-serif tracking-wide">{title}</h1>
        <samp className="text-[#c5a572] my-1">_____</samp>
        <h2 className="text-sm uppercase tracking-wider text-gray-300">Menu</h2>

        <div className="text-[#c9cbcf] flex flex-col justify-center items-center my-3 min-h-35 gap-1">
          {items.slice(0, 5).map((item, index) => (
            <p key={index} className="text-sm truncate max-w-55">
              {item}
            </p>
          ))}
          {items.length > 5 && <span className="text-[#c5a572]">...</span>}
        </div>

        <button
          onClick={handleExplore}
          className="text-[#c5a572] cursor-pointer hover:underline text-sm font-semibold tracking-wide mt-2"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
