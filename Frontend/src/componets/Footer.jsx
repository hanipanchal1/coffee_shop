import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className='mt-20'>
        <div className="w-full h-[89vh] bg-cover bg-center"style={{
        backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.90),rgb(16, 29, 40,0.90)), url(../src/assets/img/footerbg.png) ` }}>
            <div className="flex flex-col justify-center items-center gap-9">
                <img className='mt-14' src="../src/assets/img/cafelogo.svg" alt="error" />
                <div className="flex gap-6">
                    <button  className=' bg-[#3d3d3d] text-[#949494] text-xl p-3 rounded-full '><FaFacebookF/> </button>
                    <button className='bg-[#3d3d3d] text-[#949494] p-3 rounded-full text-xl'><FaTwitter/></button>
                    <button className=' bg-[#3d3d3d] text-[#949494] text-xl p-3 rounded-full'><FaLinkedinIn/></button>
                    <button className=' bg-[#3d3d3d] text-[#949494] text-xl p-3 rounded-full'><FaInstagram/></button>
                </div>
            </div>
            <div className="flex justify-between text-[#888888] text-xs px-22 mt-12">
                <div className="w-51 flex flex-col gap-5">
                    <p className='text-[#c5a572] text-[19px]'>Contact Us </p>
                    <p className='flex gap-2'> <IoLocationOutline className='text-xl'/>2839 Old Dear Lane <br /> New York, NY 10013 <br />United States</p>
                    <p className='flex gap-2'> <LuPhoneCall className='text-xl'/>+ (0712) 819 79 555</p>
                    <p className='flex gap-2'> <MdEmail  className='text-xl'/>info@havnor.com</p>
                </div>
                <div className="w-51 flex flex-col gap-5">
                    <p className='text-[#c5a572] text-[19px]'>Services</p>
                    <ul className='list-disc flex flex-col gap-2'>
                        <li>Fine Dining & Concierge</li>
                        <li>Quick Counter Service</li>
                        <li>Banquet Table Service</li>
                        <li>Family Style Service</li>
                        <li>Quick Delivery Service</li>
                        <li>Buffet Table Service</li>
                        <li>Traditional Counter Service</li>
                    </ul>
                </div>
                <div className="w-51 flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <p className='text-[#c5a572] text-[19px]'>Opening Hours</p>
                        <h1>Mon - Fri 09:00 AM - 08:00 PM</h1>
                        <h1>Sat - Sun 09:00 AM - 05:00 PM</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className='text-[#c5a572] text-[19px]'>Coffee Bar Opening</p>
                        <h1>Mon - Fri 09:00 AM - 08:00 PM</h1>
                        <h1>Sat - Sun 09:00 AM - 05:00 PM</h1>
                    </div>
                </div>
                <div className="w-51 flex flex-col gap-5">
                        <h1 className='text-[#c5a572] text-[19px]'>Newsletter</h1>
                        <p>Stay always in touch! Subscribe to our newsletter.</p>
                    <form className='flex flex-col gap-3' action="">
                        <input className='bg-[#2e373f] w-51 p-3 rounded-md text-[15px]' style={{
        backgroundImage: `linear-gradient(to bottom, rgb(46, 55, 63,0.95),rgb(46, 55, 63,0.95))`}} type="text" placeholder='Enter Your Email'/>
                        <button className='bg-[#c5a572] text-white w-51 p-3 rounded-md text-[15px]'>Subscribe Now</button>
                    </form>
                    
                </div>   
            </div> 
            <div className="flex justify-center text-[#888888] text-[10px] mt-16">
            <p className=''>COPYRIGHT © ALL RIGHTS RESERVED BY ONELINE CAFE</p>   
            </div>           
        </div>
    </div>
  )
}

export default Footer