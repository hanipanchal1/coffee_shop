import React from 'react'
import { useNavigate } from "react-router-dom";

const BookTable = () => {
  const navigate = useNavigate();
  const handleBookTable = () => {
    navigate("/");
  }
  return (
      <div className="mt-20 flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-[#c5a572] font-sans text-md">CONTACT US</h1>
          <h1 className="text-4xl font-serif">Book Your Reservation Today</h1>
        </div>
        <div className="text-center">
          <p className="text-[#888888] mb-6">Dolorum corrupti nesciunt repellendus sapiente et dolorum est. Possimus voluptatem <br />nemo harum. Nihil autem sed praesentium odit et consequatur quis. Sint id et <br />dolorem nulla sapiente eos harum eum.</p>
          <button onClick={handleBookTable} className="border text-xl px-5 py-2 border-[#c5a572] text-[#c5a572] hover:bg-[#c5a572] hover:text-white transition-all duration-300">Book Table</button>
        </div>
      </div>
  )
}

export default BookTable