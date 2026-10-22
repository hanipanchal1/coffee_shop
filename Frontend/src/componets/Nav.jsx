import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { MdOutlineLogin } from "react-icons/md";

const Nav = () => {
  return (
    <div>
              <div className="flex bg-black text-white w-full justify-between px-30 py-2 text-[13px]">
        <div className="flex justify-center items-center gap-2">
          <FaFacebookF />
          <FaInstagram />
          <FaLinkedinIn />
          <FaTwitter />
        </div>
        <div className="flex justify-center items-center gap-2">
          <BiSolidPhoneCall /> <span>(+1) 123 4567 890</span>
          <MdEmail /> <span>Mail us: info@havnor.com</span>
        </div>
      </div>
      <div className="bg-[#121D27] w-full text-gray-300 flex items-center justify-between px-30 py-3">
        <div className="w-35">
          <img src="../src/assets/img/cafelogo.svg" alt="error" />
        </div>
        <div className="text-[15px] flex gap-15 items-center">
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/'}>Home</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/Menu'}>Menu</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/About'}>About</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/Gallery'}>Gallery</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/Service'}>Service</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/Contact'}>Contact</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572] text-xl' to={'/Login'}><MdOutlineLogin /></Link>
        </div>
      </div>
    </div>
  )
}

export default Nav