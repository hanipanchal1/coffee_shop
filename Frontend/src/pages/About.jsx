import React from "react";
import { FaPlay } from "react-icons/fa6";
import Team from "../componets/Team";
import Gallery from "../componets/Gallery";
import Footer from "../componets/Footer";

const About = () => {
  return (
    <div>
      {/* ===== Hero Banner ===== */}
      <div
        className="
          w-full 
          h-64 sm:h-80 md:h-96 lg:h-100
          bg-cover bg-center 
          flex flex-col justify-center items-center gap-2 sm:gap-3
          px-4
        "
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55), rgb(16, 29, 40,0.90)), url(../src/assets/img/footerbg.png)`,
        }}
      >
        <h1 className="text-[#c5a572] text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-center">
          About Us
        </h1>
        <p className="text-[#b9b8b8] text-sm sm:text-base md:text-md">
          Home / About
        </p>
      </div>

      {/* ===== Our Story ===== */}
      <div className="mt-16 sm:mt-20 lg:mt-30 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40">
        <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center">
          <h1 className="text-[#c5a572] font-sans tracking-wide">OUR STORY</h1>
          <h2 className="text-3xl sm:text-4xl text-center font-serif">
            Since 2007
          </h2>
        </div>

        {/* Two Cards */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10 mt-10">
          <div className="border-2 border-[#c5a572] w-full lg:w-[35vw] mb-6 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl font-serif text-center mt-8 sm:mt-10">
              Who We Are
            </h1>
            <p className="text-[#888888] text-center mb-8 sm:mb-10 mt-5 px-4 sm:px-6 leading-relaxed text-sm sm:text-base">
              Iste sed saepe animi magnam voluptatibus voluptatibus natus
              quaerat. Sit sunt id rem. Doloribus et quam et tempora veritatis
              praesentium vero. Tempora repudiandae quia. Dicta dolorum neque
              illum sit quam nemo labore asperiores sed. Exercitationem
              voluptatem ut qui accusamus veniam. Fugit voluptatem dignissimos
              aperiam beatae labore esse.
            </p>
          </div>

          <div className="border-2 border-[#c5a572] w-full lg:w-[35vw] mb-6 lg:mb-10">
            <h1 className="text-2xl sm:text-3xl font-serif text-center mt-8 sm:mt-10">
              Who We Are
            </h1>
            <p className="text-[#888888] text-center mb-8 sm:mb-10 mt-5 px-4 sm:px-6 leading-relaxed text-sm sm:text-base">
              Iste sed saepe animi magnam voluptatibus voluptatibus natus
              quaerat. Sit sunt id rem. Doloribus et quam et tempora veritatis
              praesentium vero. Tempora repudiandae quia. Dicta dolorum neque
              illum sit quam nemo labore asperiores sed. Exercitationem
              voluptatem ut qui accusamus veniam. Fugit voluptatem dignissimos
              aperiam beatae labore esse.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Stats Section ===== */}
      <div className="bg-[#f4eee4] w-full py-12 sm:py-16 lg:h-60 flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0 px-6 sm:px-10 md:px-16 lg:px-25">
        <div className="text-2xl sm:text-3xl font-serif text-center lg:text-left">
          <h1>
            Every day We <br className="hidden lg:block" />
            get Better for you
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-6 lg:gap-0 w-full lg:w-auto">
          {/* Stat 1 */}
          <div className="w-full sm:w-48 lg:w-60 flex flex-col justify-center items-center gap-2 sm:gap-3 border-l-0 lg:border-l border-[#c5a572] h-auto lg:h-40">
            <img className="w-12 sm:w-13" src="../src/assets/img/outline.svg" alt="Dishes" />
            <h1 className="hover:border-b-2 text-2xl sm:text-3xl font-serif">150</h1>
            <p className="text-[#888888] text-base sm:text-xl font-normal text-center">
              Dishes Menu
            </p>
          </div>

          {/* Stat 2 */}
          <div className="w-full sm:w-48 lg:w-60 flex flex-col justify-center items-center gap-2 sm:gap-3 border-l-0 lg:border-l border-[#c5a572] h-auto lg:h-40">
            <img className="w-9 sm:w-10" src="../src/assets/img/happiness.svg" alt="Happy Customers" />
            <h1 className="hover:border-b-2 text-2xl sm:text-3xl font-serif">2000</h1>
            <p className="text-[#888888] text-base sm:text-xl font-normal text-center">
              Happy Customers
            </p>
          </div>

          {/* Stat 3 */}
          <div className="w-full sm:w-48 lg:w-60 flex flex-col justify-center items-center gap-2 sm:gap-3 border-l-0 lg:border-l border-[#c5a572] h-auto lg:h-40">
            <img className="w-9 sm:w-10" src="../src/assets/img/cheers.svg" alt="Featured Events" />
            <h1 className="hover:border-b-2 text-2xl sm:text-3xl font-serif">450</h1>
            <p className="text-[#888888] text-base sm:text-xl font-normal text-center">
              Featured Events
            </p>
          </div>
        </div>
      </div>

      {/* ===== Video Section ===== */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 mt-12 sm:mt-16 lg:mt-20">
        <div className="w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-[url(../src/assets/img/about_us_video.png)] bg-cover bg-center flex items-center justify-center">
          <button className="text-[#c5a572] text-2xl sm:text-3xl bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 flex justify-center items-center hover:border-8 hover:border-[#888888] transition-all">
            <FaPlay />
          </button>
        </div>
      </div>

      {/* ===== Specialities ===== */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 mt-16 sm:mt-20">
        <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center">
          <h1 className="text-[#c5a572] font-sans tracking-wide">OUR SPECIALITIES</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-serif max-w-2xl">
            Praesent Condimentum Rutrum Nibh.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-6 mt-10">
          <div className="text-center flex flex-col gap-3 items-center">
            <img className="w-full max-w-[360px] lg:w-90 object-cover" src="../src/assets/img/sp1.png" alt="Fine Dining" />
            <h1 className="text-2xl sm:text-3xl font-serif mt-4 sm:mt-5">Fine Dining</h1>
            <p className="text-[#888888] text-sm sm:text-base leading-relaxed px-2">
              Alias suscipit iure voluptas ea et et voluptatibus. Animi assumenda libero. At natus id. Perferendis sunt
            </p>
          </div>

          <div className="text-center flex flex-col gap-3 items-center">
            <img className="w-full max-w-[360px] lg:w-90 object-cover" src="../src/assets/img/sp2.png" alt="Spicy Cocktails" />
            <h1 className="text-2xl sm:text-3xl font-serif mt-4 sm:mt-5">Spicy Cocktails</h1>
            <p className="text-[#888888] text-sm sm:text-base leading-relaxed px-2">
              Quibusdam quas quae animi tempore est. Ipsum alias beatae enim tempore occaecati alias aut id. Quisquam
            </p>
          </div>

          <div className="text-center flex flex-col gap-3 items-center">
            <img className="w-full max-w-[360px] lg:w-90 object-cover" src="../src/assets/img/sp3.png" alt="Best Veggie" />
            <h1 className="text-2xl sm:text-3xl font-serif mt-4 sm:mt-5">Best Veggie</h1>
            <p className="text-[#888888] text-sm sm:text-base leading-relaxed px-2">
              Ut laudantium consectetur. Veritatis rerum reprehenderit qui occaecati quis autem. Animi aut incidunt perferendis
            </p>
          </div>
        </div>
      </div>

      {/* ===== Standards ===== */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-25 mt-16 sm:mt-20">
        <div className="bg-[#f4eee4] pb-16 sm:pb-20">
          <div className="flex flex-col gap-2 sm:gap-3 justify-center items-center pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10 px-4">
            <h1 className="text-[#c5a572] font-sans tracking-wide">OUR STANDARDS</h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-serif max-w-3xl">
              There Are Many Variations Of Passages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            <div className="flex flex-col gap-3 sm:gap-4 text-center border-r-0 md:border-r border-[#c5a572] px-4 sm:px-6 h-auto md:h-60 justify-center">
              <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl">01</h1>
              <h2 className="text-lg sm:text-xl font-serif">
                Choose Music Carefully <br className="hidden sm:block" /> Sapiente.
              </h2>
              <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                Sed ipsa et id ea saepe sint. Eligendi aut ea ea. Quos cupiditatei est est doloremque quasi velit
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 text-center border-r-0 md:border-r border-[#c5a572] px-4 sm:px-6 h-auto md:h-60 justify-center">
              <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl">02</h1>
              <h2 className="text-lg sm:text-xl font-serif">
                Never Serve Food That Has <br className="hidden sm:block" /> Expired.
              </h2>
              <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                Perferendis hic illum placeat. Enim sint rerum vitae rerum et voluptas dolorem et nemo. Culpa maiores
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 text-center px-4 sm:px-6 h-auto md:h-60 justify-center">
              <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl">03</h1>
              <h2 className="text-lg sm:text-xl font-serif">
                Keep The Restaurant <br className="hidden sm:block" /> Spotless.
              </h2>
              <p className="text-[#888888] text-sm sm:text-base leading-relaxed">
                Consequatur atque ut aspernatur pariatur. Iusto reiciendis fugiat aut rerum tempore. Dolor facere a.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Team />
      <Gallery />
      <Footer />
    </div>
  );
};

export default About;