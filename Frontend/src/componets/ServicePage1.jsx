import React from "react";

const ServicePage1 = ({ icon, title, titleIcon, description, img }) => {
  return (
    <div className="flex flex-col lg:flex-row bg-[#f4eee4] overflow-hidden">
      {/* Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-5 items-center justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 text-center order-2 lg:order-1">
        <img className="w-12 sm:w-14" src={icon} alt={title} />
        <h1 className="text-3xl sm:text-4xl font-serif">{title}</h1>
        <img className="w-28 sm:w-32 md:w-36" src={titleIcon} alt="" />
        <p className="mt-2 text-[#615d5d] text-sm sm:text-base leading-relaxed max-w-md">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="w-full lg:w-1/2 order-1 lg:order-2">
        <img
          className="w-full h-64 sm:h-80 md:h-96 lg:h-full object-cover"
          src={img}
          alt={title}
        />
      </div>
    </div>
  );
};

export default ServicePage1;