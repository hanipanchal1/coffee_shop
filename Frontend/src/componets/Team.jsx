import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

const Team = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-25 py-12 sm:py-16 lg:py-15">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10 mb-10 sm:mb-12 lg:mb-15">
        <div className="flex flex-col gap-3 sm:gap-5">
          <h1 className="text-[#c5a572] font-sans tracking-wide">
            TEAM MEMBER
          </h1>
          <h2 className="text-3xl sm:text-4xl font-serif">
            Meet Our Team
          </h2>
        </div>

        <div className="text-gray-600 text-sm sm:text-base max-w-xl lg:max-w-md leading-relaxed">
          <p>
            Omnis fuga velit temporibus ut unde quas occaecati. Quia dolorem vel
            similique. Temporibus et tempore. A et eos ducimus recusandae ut.
            Sunt blanditiis assumenda suscipit.
          </p>
        </div>
      </div>

      {/* Team Cards */}
      <div className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        lg:grid-cols-3 
        gap-6 
        sm:gap-8 
        lg:gap-10 
        justify-items-center
      ">
        {/* Card 1 - with overlay */}
        <div
          className="
            w-full 
            max-w-[320px] 
            sm:max-w-85 
            lg:w-80 
            h-80 
            sm:h-90 
            lg:h-100
            bg-cover bg-center 
            flex flex-col justify-center items-center gap-3
            rounded-sm
          "
          style={{
            backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.62), rgb(16, 29, 40,0.95)), url(../src/assets/img/team1.png)`,
          }}
        >
          <h1 className="text-white text-xl sm:text-2xl font-serif">
            Mr. Gunner Upton
          </h1>
          <h2 className="text-gray-300 text-sm sm:text-base">
            Decoration Chef
          </h2>
          <div className="flex text-white gap-3 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-[#c5a572] transition-colors" />
            <FaInstagram className="cursor-pointer hover:text-[#c5a572] transition-colors" />
            <FaLinkedinIn className="cursor-pointer hover:text-[#c5a572] transition-colors" />
            <FaTwitter className="cursor-pointer hover:text-[#c5a572] transition-colors" />
          </div>
        </div>

        {/* Card 2 */}
        <img
          className="
            w-full 
            max-w-[320px] 
            sm:max-w-85 
            lg:w-80 
            h-80 
            sm:h-90 
            lg:h-100
            object-cover
            rounded-sm
          "
          src="../src/assets/img/team2.png"
          alt="Team Member 2"
        />

        {/* Card 3 */}
        <img
          className="
            w-full 
            max-w-[320px] 
            sm:max-w-85 
            lg:w-80 
            h-80 
            sm:h-90 
            lg:h-100
            object-cover
            rounded-sm
          "
          src="../src/assets/img/team3.png"
          alt="Team Member 3"
        />
      </div>
    </div>
  );
};

export default Team;