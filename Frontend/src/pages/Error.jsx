import React from "react";
import { useNavigate } from "react-router-dom";
import errorImg from "../assets/img/error.png";

const Error = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  return (
    <div
      className="
        border-t border-[#c5a572] 
        bg-[#121d27] 
        w-full 
        min-h-[calc(100vh-80px)]   /* flexible height instead of fixed h-137.75 */
        flex-1 
        flex flex-col 
        justify-center items-center 
        text-center 
        select-none
        px-4 sm:px-6
        py-10 sm:py-12
      "
    >
      {/* Error Image */}
      <img
        className="
          w-auto 
          max-w-[min(90vw,520px)] 
          max-h-[32vh] sm:max-h-[36vh] md:max-h-[38vh]
          object-contain
        "
        src={errorImg}
        alt="404 - Page Not Found"
      />

      {/* Title */}
      <h1
        className="
          text-white 
          text-2xl sm:text-3xl 
          font-semibold 
          mt-5 sm:mt-6 
          mb-2
        "
      >
        Whoops....
      </h1>

      {/* Description */}
      <p
        className="
          text-[#888888] 
          text-sm sm:text-base 
          max-w-xs sm:max-w-md 
          leading-relaxed
          px-2
        "
      >
        We can't seem to find the page you are looking for
      </p>

      {/* Back to Home Button */}
      <button
        onClick={backToHome}
        className="
          group 
          text-white hover:text-[#c5a572] 
          transition-colors duration-200 
          font-serif 
          text-lg sm:text-xl md:text-2xl 
          mt-6 sm:mt-8 
          cursor-pointer 
          inline-flex items-center gap-2
          active:scale-[0.98]
        "
      >
        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
        <span>Back to Home page</span>
      </button>
    </div>
  );
};

export default Error;