import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import Footer from '../componets/Footer'

const Contact = () => {
  return (
    <div>
      <div
        className="w-full h-100 bg-cover bg-center flex flex-col justify-center items-center gap-3"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55),rgb(16, 29, 40,0.90)), url(../src/assets/img/footerbg.png) `,
        }}
      >
        <h1 className="text-[#c5a572] text-5xl font-serif text-extrabold">
          Contact Us
        </h1>
        <p className="text-[#b9b8b8] text-md">Home/Contact</p>
      </div>
        <div className="px-25">
      <div className="flex gap-25 mt-30 mb-25">
        <div className="">
          <div className="flex flex-col gap-5">
            <h1 className="text-[#c5a572] font-sans">CONTACT US</h1>
            <h2 className="text-4xl font-serif">Get In Touch</h2>
          </div> 
          <div className="text-[#6f6f6f] text-xl flex flex-col gap-5 mt-15 ">
            <p className='flex items-center gap-5'><IoLocationOutline className='text-2xl'/>2839 Old Dear Lane New York,<br/> NY 10013 United States</p>
            <h1 className='flex items-center gap-5'><BiPhoneCall className='text-2xl'/>+ (0712) 819 79 555</h1>
            <p className='flex items-center mb-5 gap-5'><MdOutlineEmail className='text-2xl'/>info@havnor.com</p>

            <p className='border-gray-500 w-[25vw] gap-5 border-t'></p>
          

          <div className="flex flex-col gap-2">
            <p className='text-2xl text-black mb-2'>Opening Hours</p>
            <h1>Mon - Fri 09:00 AM - 08:00 PM</h1>
            <h1>Sat - Sun 09:00 AM - 05:00 PM</h1>
          </div>
          </div>
        </div>

        <div className="">
      <section className="w-[50vw] ">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg shadow-md">
        <iframe
          title="Our Location"
          src="https://maps.google.com/maps?q=Cheyenne%2C%20Wyoming&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full"
        ></iframe>
      </div>
    </section>
        </div>
      </div>

      <div className=" bg-[#f4eee4] w-full f-autho py-20 flex flex-col gap-10">
        <div className="flex flex-col justify-center items-center gap-3">
            <p className='text-[#c5a572] font-sans text-3xl'>SEND A MESSAGE</p>
            <h2 className=" font-serif text-center">Do you have anything in your mind to tell us? please don't hesitate to <br />get in touch to us via our contact form.</h2>
        </div>
        <div className="flex justify-center ">
        <form className='flex flex-col gap-10 px-20' action="">
          <div className="flex gap-15 px-50">
          <input className='border-b w-[25vw]' type="text" placeholder='Name*'/>
          <input className='border-b w-[25vw]' type="text" placeholder='E-mail*'/>
          </div>
          <div className="flex gap-15 px-50 ">
          <input className='border-b w-[25vw]' type="text" placeholder='Phone*'/>
          <input className='border-b w-[25vw]' type="text" placeholder='Subject*'/>
          </div>
          <div className="px-50 flex flex-col gap-8 justify-center items-center">
          <input className='border-b w-full' type="text" placeholder='Notes'/>
          <button className="border text-zxl w-35 px-3 py-2 border-[#121D27] bg-[#121D27] text-[white] hover:bg-[white] hover:text-[#121D27] transition-all duration-300">Send Message</button>
          </div>
        </form>
        </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Contact