import React from "react";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ title, bgImage, items = [], onExplore }) => {
  const navigate = useNavigate();

  const handleExplore = onExplore || (() => navigate("/menu"));

  return (
    <div
      className="w-70 h-100 bg-cover bg-center text-white flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className="text-3xl font-serif">{title}</h1>
      <samp className="text-[#c5a572]">_____</samp>
      <h1>Menu</h1>
      <div className="text-[#9fa1a4] flex flex-col justify-center items-center">
        {items.map((item, index) => (
          <h1 key={index}>{item}</h1>
        ))}
        <h1>...</h1>
      </div>
      <h1
        onClick={handleExplore}
        className="text-[#c5a572] cursor-pointer hover:underline"
      >
        Explore More
      </h1>
    </div>
  );
};

export default MenuCard;
