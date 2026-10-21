import React from "react";

const CategoryCard = ({ name, image}) => {
  return (
    <div
      className={`w-40 h-28 bg-cover bg-center flex justify-center items-center cursor-pointer transition-all duration-300  shadow-md `}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(16, 29, 40, 0.55), rgba(16, 29, 40, 0.90)), url(${image})`,
      }}
    >
      <h2 className={`text-lg font-medium tracking-wide transition-colors duration-200 text-white`}>
        {name}
      </h2>
    </div>
  );
};

export default CategoryCard;
