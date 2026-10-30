import React from "react";

const Gallery = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-25 flex flex-col gap-8 sm:gap-10 lg:gap-15 py-10 sm:py-12">
      {/* Title */}
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-[#c5a572] font-sans tracking-wide">TAKE A TOUR</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center">
          Our Restaurant Gallery
        </h2>
      </div>

      {/* Images */}
      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-4 
        gap-4 
        sm:gap-5 
        lg:gap-6
        justify-items-center
      ">
        <img
          className="
            w-full 
            max-w-65 
            h-40 
            sm:h-48 
            md:h-52 
            lg:h-58 
            lg:w-65
            object-cover
            rounded-sm
          "
          src="../src/assets/img/g4.png"
          alt="Gallery 1"
        />
        <img
          className="
            w-full 
            max-w-65 
            h-40 
            sm:h-48 
            md:h-52 
            lg:h-58 
            lg:w-65
            object-cover
            rounded-sm
          "
          src="../src/assets/img/G3.png"
          alt="Gallery 2"
        />
        <img
          className="
            w-full 
            max-w-65 
            h-40 
            sm:h-48 
            md:h-52 
            lg:h-58 
            lg:w-65
            object-cover
            rounded-sm
          "
          src="../src/assets/img/G1.png"
          alt="Gallery 3"
        />
        <img
          className="
            w-full 
            max-w-65 
            h-40 
            sm:h-48 
            md:h-52 
            lg:h-58 
            lg:w-65
            object-cover
            rounded-sm
          "
          src="../src/assets/img/G2.png"
          alt="Gallery 4"
        />
      </div>
    </div>
  );
};

export default Gallery;