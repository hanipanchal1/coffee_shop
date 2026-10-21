import React from 'react'
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

const Team = () => {
  return (
    <div>
        <div className="w-full h-screen px-25 py-15 flex flex-col gap-15">
                    <div className="flex items-center justify-between ">
          <div className="flex flex-col gap-5">
            <h1 className="text-[#c5a572] font-sans">TEAM MEMBER</h1>
            <h2 className="text-4xl font-serif">
              Meet Our Team
            </h2>
          </div>
          <div className="text-gray-600">
            <p>
                Omnis fuga velit temporibus ut unde quas occaecati. Quia dolorem vel <br />similique. Temporibus et tempore. A et eos ducimus recusandae ut. Sunt <br />blanditiis assumenda suscipit.
            </p>
          </div>
        </div>
                <div className="flex gap-10 justify-center">
            <div className=' w-80 h-100 bg-cover bg-center flex flex-col justify-center items-center gap-3' style={{
        backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.62),rgb(16, 29, 40,0.95)), url(../src/assets/img/team1.png)`,
      }}>
        <h1 className='text-white text-2xl'>Mr. Gunner Upton</h1>
        <h2 className='text-gray-400 flex'>Decoration Chef</h2>
        <div className="flex text-white gap-2">
          <FaFacebookF />
          <FaInstagram />
          <FaLinkedinIn />
          <FaTwitter />
        </div>
      </div>
            <img className='w-80 h-100' src="../src/assets/img/team2.png" alt="error" />
            <img className='w-80 h-100' src="../src/assets/img/team3.png" alt="error" />
        </div>
        </div>

    </div>
  )
}

export default Team