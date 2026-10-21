import React from 'react'
import { FaPlay } from "react-icons/fa6";
import Team from '../componets/Team';
import Gallery from '../componets/Gallery';
import Footer from '../componets/Footer';

const About = () => {
  return (
    <div>
      <div className="w-full h-100 bg-cover bg-center flex flex-col justify-center items-center gap-3"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55),rgb(16, 29, 40,0.90)), url(../src/assets/img/footerbg.png) ` }}>
          <h1 className='text-[#c5a572] text-5xl font-serif text-extrabold'>About Us</h1>
          <p className='text-[#b9b8b8] text-md'>Home/About</p>
        </div>

      <div className="mt-30">
          <div className=" flex flex-col gap-3 justify-center items-center">
              <h1 className="text-[#c5a572] font-sans">OUR STORY</h1>
            <h2 className="text-4xl text-center">Since 2007</h2>
          </div>

        <div className="flex justify-between px-40 mt-10">
                    <div className="border-2 w-[35vw] border-[#c5a572] mb-10">
            <h1 className='text-3xl font-serif text-center mt-10'>Who We Are </h1>
            <p className="text-[#888888] text-center mb-10 mt-5">Iste sed saepe animi magnam voluptatibus <br />voluptatibus natus quaerat. Sit sunt id rem. Doloribus <br />et quam et tempora veritatis praesentium vero. <br />Tempora repudiandae quia. Dicta dolorum neque illum <br />sit quam nemo labore asperiores sed. Exercitationem <br />voluptatem ut qui accusamus veniam. Fugit <br />voluptatem dignissimos aperiam beatae labore esse.</p>
          </div>

                    <div className="border-2 w-[35vw] border-[#c5a572] mb-10">
            <h1 className='text-3xl font-serif text-center mt-10'>Who We Are </h1>
            <p className="text-[#888888] text-center mb-10 mt-5">Iste sed saepe animi magnam voluptatibus <br />voluptatibus natus quaerat. Sit sunt id rem. Doloribus <br />et quam et tempora veritatis praesentium vero. <br />Tempora repudiandae quia. Dicta dolorum neque illum <br />sit quam nemo labore asperiores sed. Exercitationem <br />voluptatem ut qui accusamus veniam. Fugit <br />voluptatem dignissimos aperiam beatae labore esse.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#f4eee4] w-full h-60 flex justify-between items-center px-25">
        <div className="text-3xl font-serif  ">
          <h1>Every day We <br />get Better for you</h1>
        </div>
        <div className="w-60 flex flex-col justify-center items-center gap-3 border-l h-40  border-[#c5a572]">
          <img className='w-13' src="../src/assets/img/outline.svg" alt="error" />
          <h1 className='hover:border-b-2 w-12 text-3xl font-serif'>150</h1>
          <p className='text-[#888888] text-xl font-normal text-center'>Dishes Menu</p>
        </div>
        <div className="w-60 flex flex-col justify-center items-center gap-3 border-l h-40 border-[#c5a572]">
          <img className='w-10' src="../src/assets/img/happiness.svg" alt="error" />
          <h1 className='hover:border-b-2 w-20 text-3xl font-serif'>2000</h1>
          <p className='text-[#888888] text-xl font-normal text-center'>Happy Customers</p>
        </div>
        <div className="w-60 flex flex-col justify-center items-center gap-3 border-l h-40 border-[#c5a572]">
          <img className='w-10' src="../src/assets/img/cheers.svg" alt="error" />
          <h1 className='hover:border-b-2 w-12 text-3xl font-serif'>450</h1>
          <p className='text-[#888888] text-xl font-normal text-center'>Featured Events</p>
        </div>
      </div>

        <div className="px-25">
                <div className="mt-20 w-full h-[60vh] bg-[url(../src/assets/img/about_us_video.png)] bg-cover bg-center flex items-center justify-center ">
        <button className='text-[#c5a572] text-3xl bg-white rounded-full w-20 h-20 flex justify-center items-center hover:border-8 hover:border-[#888888] '><FaPlay/></button>
      </div>
        </div>

        <div className="mt-20 px-25">
              <div className=" flex flex-col gap-3 justify-center items-center">
                  <h1 className="text-[#c5a572] font-sans">OUR SPECIALITIES</h1>
                  <h2 className="text-4xl text-center font-serif">Praesent Condimentum Rutrum Nibh.</h2>
              </div>
          <div className="flex justify-between mt-10">
            <div className="text-center flex flex-col gap-3">
              <img className='w-90' src="../src/assets/img/sp1.png" alt="" />
              <h1 className='text-3xl font-serif text-center mt-5'>Fine Dining</h1>
              <p className='text-[#888888] text-center'>Alias suscipit iure voluptas ea et et <br />voluptatibus. Animi assumenda libero. <br />At natus id. Perferendis sunt</p>
            </div>
            <div className="text-center flex flex-col gap-3">
              <img className='w-90' src="../src/assets/img/sp2.png" alt="" />
              <h1 className='text-3xl font-serif text-center mt-5'>Spicy Cocktails</h1>
              <p className='text-[#888888] text-center'>Quibusdam quas quae animi tempore <br />est. Ipsum alias beatae enim tempore <br />occaecati alias aut id. Quisquam</p>
            </div>
            <div className="text-center flex flex-col gap-3">
              <img className='w-90' src="../src/assets/img/sp3.png" alt="" />
              <h1 className='text-3xl font-serif text-center mt-5'>Best Veggie</h1>
              <p className='text-[#888888] text-center'>Ut laudantium consectetur. Veritatis <br />rerum reprehenderit qui occaecati quis <br />autem. Animi aut incidunt perferendis</p>
            </div>
          </div>
        </div>

        <div className="px-25">
        <div className="bg-[#f4eee4] mt-20 h-auto pb-20">
          <div className="flex flex-col gap-3 justify-center items-center pt-20 pb-10">
                  <h1 className="text-[#c5a572] font-sans">OUR STANDARDS</h1>
                  <h2 className="text-4xl text-center font-serif">There Are Many Variations Of Passages</h2>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-4 text-center border-r h-60 w-[30vw] border-[#c5a572]">
              <h1 className='text-white text-7xl '>01</h1>
              <h2 className='text-xl font-serif'>Choose Music Carefully <br />Sapiente.</h2>
              <p className='text-[#888888]'>Sed ipsa et id ea saepe sint. <br />Eligendi aut ea ea. Quos cupiditatei <br />est est doloremque quasi velit</p>
            </div>
            <div className="flex flex-col gap-4 text-center border-r h-60 w-[30vw] border-[#c5a572]">
              <h1 className='text-white text-7xl '>02</h1>
              <h2 className='text-xl font-serif'>Never Serve Food That Has<br />Expired.</h2>
              <p className='text-[#888888]'>Perferendis hic illum placeat. Enim <br />sint rerum vitae rerum et voluptas <br />dolorem et nemo.Culpa maiores</p>
            </div>
            <div className="flex flex-col gap-4 text-center w-[30vw]">
              <h1 className='text-white text-7xl '>03</h1>
              <h2 className='text-xl font-serif'>Keep The Restaurant<br />Spotless.</h2>
              <p className='text-[#888888]'>Consequatur atque ut aspernatur <br />pariatur. Iusto reiciendis fugiat aut <br />rerum tempore. Dolor facere a.</p>
            </div>
          </div>
        </div>
        </div>

        <Team/>
        <Gallery/>
        <Footer/>
    </div>
  )
}

export default About