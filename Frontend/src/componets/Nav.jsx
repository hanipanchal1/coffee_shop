import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { useAuth } from '../context/AuthContext';

// ─────────────────────────────────────────────────────────────
//  Nav  –  Shows Login icon if not logged in, Logout if logged in
//          Also shows Admin link if user is admin
// ─────────────────────────────────────────────────────────────

const Nav = () => {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

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
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/menu'}>Menu</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/about'}>About</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/gallery'}>Gallery</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/service'}>Service</Link>
          <Link className='hover:border-b-2 hover:border-[#c5a572]' to={'/contact'}>Contact</Link>

          {/* Show Admin link only if the logged-in user is an admin */}
          {isAdmin && (
            <Link className='hover:border-b-2 hover:border-[#c5a572] text-[#c5a572]' to={'/admin'}>
              Admin
            </Link>
          )}

          {/* Show user name if logged in */}
          {isLoggedIn && user?.name && (
            <span className='text-[#c5a572] text-[13px]'>Hi, {user.name}</span>
          )}

          {/* Toggle between Login and Logout */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className='hover:border-b-2 hover:border-[#c5a572] text-xl flex items-center gap-1'
              title="Logout"
            >
              <MdOutlineLogout />
            </button>
          ) : (
            <Link className='hover:border-b-2 hover:border-[#c5a572] text-xl' to={'/login'} title="Login">
              <MdOutlineLogin />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Nav