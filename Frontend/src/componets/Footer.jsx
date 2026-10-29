import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import footerBg from "../assets/img/footerbg.png";
import cafeLogo from "../assets/img/cafelogo.svg";

// ─────────────────────────────────────────────────────────────
//  Footer  –  Fully Responsive: Mobile / Tablet / Desktop
//  • 1-col on mobile, 2-col on tablet, 4-col on desktop
//  • Proper imports for assets (no broken relative paths)
// ─────────────────────────────────────────────────────────────

const Footer = () => {
  const [email, setEmail] = useState('');

  function handleSubscribe(e) {
    e.preventDefault();
    setEmail('');
  }

  return (
    <footer className="mt-20 w-full">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(16,29,40,0.95), rgba(16,29,40,0.95)), url(${footerBg})`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-14 pb-8 flex flex-col">

          {/* ── Logo + Social Row ── */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <img
              src={cafeLogo}
              alt="Oneline Cafe Logo"
              className="w-28 sm:w-32 lg:w-36"
            />
            <div className="flex items-center gap-4">
              {[
                { Icon: FaFacebookF,  label: 'Facebook' },
                { Icon: FaTwitter,    label: 'Twitter' },
                { Icon: FaLinkedinIn, label: 'LinkedIn' },
                { Icon: FaInstagram,  label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="bg-[#2a3a47] hover:bg-[#c5a572] text-[#949494] hover:text-white transition-all duration-300 text-[17px] p-3 rounded-full"
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-[#2a3a47] mb-12" />

          {/* ── 4-Column Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 text-[#888888] text-[13px]">

            {/* Column 1 — Contact */}
            <div className="flex flex-col gap-4">
              <p className="text-[#c5a572] text-[17px] font-semibold uppercase tracking-wide">
                Contact Us
              </p>
              <p className="flex items-start gap-2.5 leading-relaxed">
                <IoLocationOutline className="text-[#c5a572] text-[18px] mt-0.5 shrink-0" />
                2839 Old Dear Lane,<br />New York, NY 10013,<br />United States
              </p>
              <p className="flex items-center gap-2.5">
                <LuPhoneCall className="text-[#c5a572] text-[17px] shrink-0" />
                + (0712) 819 79 555
              </p>
              <p className="flex items-center gap-2.5">
                <MdEmail className="text-[#c5a572] text-[17px] shrink-0" />
                info@havnor.com
              </p>
            </div>

            {/* Column 2 — Services */}
            <div className="flex flex-col gap-4">
              <p className="text-[#c5a572] text-[17px] font-semibold uppercase tracking-wide">
                Services
              </p>
              <ul className="list-disc list-inside flex flex-col gap-2.5">
                {[
                  'Fine Dining & Concierge',
                  'Quick Counter Service',
                  'Banquet Table Service',
                  'Family Style Service',
                  'Quick Delivery Service',
                  'Buffet Table Service',
                  'Traditional Counter Service',
                ].map(s => (
                  <li key={s} className="hover:text-[#c5a572] transition-colors cursor-pointer">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Hours */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <p className="text-[#c5a572] text-[17px] font-semibold uppercase tracking-wide">
                  Opening Hours
                </p>
                <p>Mon – Fri &nbsp; 09:00 AM – 08:00 PM</p>
                <p>Sat – Sun &nbsp; 09:00 AM – 05:00 PM</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[#c5a572] text-[17px] font-semibold uppercase tracking-wide">
                  Coffee Bar Opening
                </p>
                <p>Mon – Fri &nbsp; 09:00 AM – 08:00 PM</p>
                <p>Sat – Sun &nbsp; 09:00 AM – 05:00 PM</p>
              </div>
            </div>

            {/* Column 4 — Newsletter */}
            <div className="flex flex-col gap-4">
              <p className="text-[#c5a572] text-[17px] font-semibold uppercase tracking-wide">
                Newsletter
              </p>
              <p className="leading-relaxed">
                Stay always in touch! Subscribe to our newsletter for the latest updates.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-[#1e2d38] border border-[#2a3a47] outline-none text-[#cccccc] w-full px-4 py-3 rounded-md text-[14px] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#c5a572] hover:bg-[#b8936a] text-white w-full py-3 rounded-md text-[14px] font-semibold tracking-wide transition-colors duration-300"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-[#2a3a47] mt-12 mb-6" />

          {/* ── Copyright ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[#555555] text-[11px]">
            <p className="text-center sm:text-left">
              COPYRIGHT © ALL RIGHTS RESERVED BY <span className="text-[#c5a572]">ONELINE CAFE</span>
            </p>
            <div className="flex items-center gap-4">
              <Link to="/about" className="hover:text-[#c5a572] transition-colors">About</Link>
              <Link to="/contact" className="hover:text-[#c5a572] transition-colors">Contact</Link>
              <Link to="/blog" className="hover:text-[#c5a572] transition-colors">Blog</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
