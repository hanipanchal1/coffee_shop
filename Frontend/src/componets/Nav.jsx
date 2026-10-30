import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail, MdOutlineLogin, MdOutlineLogout, MdClose, MdMenu } from "react-icons/md";
import { useAuth } from '../context/AuthContext';
import cafeLogo from '../assets/img/cafelogo.svg';

// ─────────────────────────────────────────────────────────────
//  Nav  –  Fully Responsive: Mobile / Tablet / Desktop
//  • Top info bar collapses on mobile
//  • Hamburger menu with slide-in drawer on mobile/tablet
//  • Active link highlighted with golden underline
// ─────────────────────────────────────────────────────────────

const navLinks = [
  { label: 'Home',    to: '/' },
  { label: 'Menu',    to: '/menu' },
  { label: 'About',   to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Service', to: '/service' },
  { label: 'Contact', to: '/contact' },
  { label: 'Blog' , to :'/blog'}
];

const Nav = () => {
  const { isLoggedIn, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/');
  }

  function handleNavClick(to) {
    setMenuOpen(false);
    if (location.pathname === to) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <header className="w-full z-50 sticky top-0">

      {/* ── Top Info Bar ── */}
      <div className="bg-black text-white w-full text-[12px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-1.5 flex items-center justify-between gap-2">
          {/* Social icons */}
          <div className="flex items-center gap-3 text-[13px]">
            <FaFacebookF className="hover:text-[#c5a572] transition-colors cursor-pointer" />
            <FaInstagram className="hover:text-[#c5a572] transition-colors cursor-pointer" />
            <FaLinkedinIn className="hover:text-[#c5a572] transition-colors cursor-pointer" />
            <FaTwitter className="hover:text-[#c5a572] transition-colors cursor-pointer" />
          </div>
          {/* Contact info — hidden on very small screens */}
          <div className="hidden sm:flex items-center gap-4 text-[12px]">
            <span className="flex items-center gap-1">
              <BiSolidPhoneCall className="text-[#c5a572]" />
              (+1) 123 4567 890
            </span>
            <span className="flex items-center gap-1">
              <MdEmail className="text-[#c5a572]" />
              info@havnor.com
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <div className="bg-[#121D27] w-full text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => handleNavClick('/')}
            className="shrink-0 w-28 sm:w-32 lg:w-36"
          >
            <img src={cafeLogo} alt="Oneline Cafe Logo" className="w-full" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-[15px]">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link.to)}
                className={`transition-colors duration-200 hover:text-[#c5a572] pb-0.5 ${
                  isActive(link.to)
                    ? 'text-[#c5a572] border-b-2 border-[#c5a572]'
                    : 'hover:border-b-2 hover:border-[#c5a572]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => handleNavClick('/admin')}
                className={`transition-colors duration-200 hover:text-[#c5a572] pb-0.5 ${
                  isActive('/admin')
                    ? 'text-[#c5a572] border-b-2 border-[#c5a572]'
                    : 'hover:border-b-2 hover:border-[#c5a572]'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Auth Area */}
          <div className="hidden lg:flex items-center gap-4 text-[14px]">
            {isLoggedIn && user?.name && (
              <span className="text-[#c5a572] font-medium">Hi, {user.name}</span>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center gap-1.5 text-xl hover:text-[#c5a572] transition-colors"
              >
                <MdOutlineLogout />
              </button>
            ) : (
              <Link
                to="/login"
                title="Login"
                className="flex items-center gap-1.5 text-xl hover:text-[#c5a572] transition-colors"
              >
                <MdOutlineLogin />
              </Link>
            )}
          </div>

          {/* Mobile / Tablet Hamburger Button */}
          <button
            className="lg:hidden text-2xl text-gray-300 hover:text-[#c5a572] transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>

        {/* ── Mobile / Tablet Slide-Down Menu ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-150 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[#0d1820] border-t border-[#1e2f3e] px-4 sm:px-8 py-4 flex flex-col gap-1">
            {/* Nav links */}
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link.to)}
                className={`py-3 px-3 text-[15px] rounded-md transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-[#c5a572] bg-[#1a2d3a] font-semibold'
                    : 'hover:text-[#c5a572] hover:bg-[#1a2d3a]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => handleNavClick('/admin')}
                className={`py-3 px-3 text-[15px] rounded-md transition-colors duration-200 ${
                  isActive('/admin')
                    ? 'text-[#c5a572] bg-[#1a2d3a] font-semibold'
                    : 'hover:text-[#c5a572] hover:bg-[#1a2d3a]'
                }`}
              >
                Admin
              </Link>
            )}

            {/* Divider */}
            <div className="border-t border-[#1e2f3e] my-2" />

            {/* Contact info in mobile menu */}
            <div className="flex flex-col gap-1.5 text-[12px] text-gray-400 px-3 pb-1 sm:hidden">
              <span className="flex items-center gap-2">
                <BiSolidPhoneCall className="text-[#c5a572]" /> (+1) 123 4567 890
              </span>
              <span className="flex items-center gap-2">
                <MdEmail className="text-[#c5a572]" /> info@havnor.com
              </span>
            </div>

            {/* Auth row */}
            <div className="flex items-center justify-between px-3 py-2">
              {isLoggedIn && user?.name && (
                <span className="text-[#c5a572] text-[14px] font-medium">Hi, {user.name}</span>
              )}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-[14px] text-gray-300 hover:text-[#c5a572] transition-colors ml-auto"
                >
                  <MdOutlineLogout className="text-xl" /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-[14px] text-gray-300 hover:text-[#c5a572] transition-colors ml-auto"
                >
                  <MdOutlineLogin className="text-xl" /> Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
