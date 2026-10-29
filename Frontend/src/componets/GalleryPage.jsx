import React from "react";

const GalleryPage = ({ img, title }) => {
  return (
    <div className="w-full group">
      <div className="overflow-hidden">
        {/* Image with consistent aspect ratio */}
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img
            src={img}
            alt={title}
            className="
              w-full h-full 
              object-cover 
              transition-transform duration-500 ease-out
              group-hover:scale-105
            "
          />
        </div>

        {/* Title */}
        <p
          className="
            bg-[#f4eee4] 
            w-full 
            font-serif 
            text-lg sm:text-xl md:text-[22px]
            px-4 sm:px-5 
            py-4 sm:py-5 
            font-extralight
            leading-snug
            text-gray-800
          "
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default GalleryPage;