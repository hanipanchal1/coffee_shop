import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ img, date, title, description, onExplore }) => {
  const navigate = useNavigate();

  const handleExplore = onExplore || (() => navigate("/blog/detail"));

  return (
    <div className="w-full group">
      {/* Image */}
      <div className="overflow-hidden mb-5">
        <img
          src={img}
          alt={title}
          onClick={handleExplore}
          className="
            w-full 
            h-56 sm:h-64 md:h-72 lg:h-80
            object-cover 
            cursor-pointer
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-start gap-2.5 sm:gap-3">
        <p className="text-sm sm:text-base text-[#979797]">{date}</p>

        <h2
          onClick={handleExplore}
          className="
            text-lg sm:text-xl 
            font-medium 
            cursor-pointer 
            hover:text-[#c5a572] 
            transition-colors duration-300
            leading-snug
          "
        >
          {title}
        </h2>

        <p className="text-[#696969] text-sm sm:text-base leading-relaxed line-clamp-3">
          {description}
        </p>

        <button
          onClick={handleExplore}
          className="
            text-[#c5a572] 
            text-sm sm:text-base 
            mt-1
            hover:underline 
            transition-all
          "
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;