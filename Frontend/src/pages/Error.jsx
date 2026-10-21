import React from 'react'
import { useNavigate } from "react-router-dom";
import errorImg from "../assets/img/error.png";

const Error = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };

  return (
    <div className="border-t border-[#c5a572] bg-[#121d27] h-137.75 w-full flex-1 flex flex-col justify-center items-center text-center select-none">
      <img
        className="w-auto max-w-[min(90vw,520px)] max-h-[38vh] object-contain"
        src={errorImg}
        alt="404 - Page Not Found"
      />
      <h1 className="text-white text-2xl sm:text-3xl font-semibold mt-4 mb-2">
        Whoops....
      </h1>
      <p className="text-[#888888] text-sm sm:text-base max-w-md">
        We can't seem to find the page you are looking for
      </p>
      <button
        onClick={backToHome}
        className="group text-white hover:text-[#c5a572] transition-colors duration-200 font-serif text-xl sm:text-2xl mt-6 cursor-pointer inline-flex items-center gap-2"
      >
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        <span>Back to Home page</span>
      </button>
    </div>
  );
};

export default Error;