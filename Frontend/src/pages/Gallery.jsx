import React from 'react'
import GalleryPage from '../componets/GalleryPage'
import img1 from '../assets/img/gallery/g10.png'
import img2 from '../assets/img/gallery/g3.png'
import img3 from '../assets/img/gallery/g6.png'
import img4 from '../assets/img/gallery/g11.png'
import img5 from '../assets/img/gallery/g9.png'
import img6 from '../assets/img/gallery/g13.png'
import img7 from '../assets/img/gallery/g5.png'
import img8 from '../assets/img/gallery/g8.png'
import img9 from '../assets/img/gallery/g2.png'
import img10 from '../assets/img/gallery/g7.png'
import img11 from '../assets/img/gallery/g4.png'
import img12 from '../assets/img/gallery/g1.png'
import Footer from '../componets/Footer'

const Gallery = () => {

  const data = [
    {img:img1, title:"Grilled Roast Meat"},
    {img:img2, title:'Ginger Chicken Kabob'},
    {img:img3, title:'Tandoori Fish'},
    {img:img4, title:'Night Life'},
    {img:img5, title:'Events Images'},
    {img:img6, title:'Indoors'},
    {img:img7, title:'Grilled Potato Pizza'},
    {img:img8, title:'Mexican Cheese Burger'},
    {img:img9, title:'Raspberry Cupcake Dessert'},
    {img:img10, title:'Little India Cosmo'},
    {img:img11, title:"American Grilled Chicken"},
    {img:img12, title:'Mexican Cheese Roll'}
  ]
  return (
    <>
    <div className='flex flex-col justify-center items-center w-full'>
      <div
        className="w-full h-100 bg-cover bg-center flex flex-col justify-center items-center gap-3"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(16, 29, 40,0.55),rgb(16, 29, 40,0.90)), url(../src/assets/img/footerbg.png) `,
        }}
      >
        <h1 className="text-[#c5a572] text-5xl font-serif text-extrabold">
          Take a tour
        </h1>
        <p className="text-[#b9b8b8] text-md">Home/Gallery</p>
      </div>

      <div className="px-25">
        <div className="mb-10">
          <ul className='flex justify-between w-[60vw]  mt-20  '>
            <li className='hover:border-b-2'>All</li>
            <li className='hover:border-b-2'>Food</li>
            <li className='hover:border-b-2'>Café Interior</li>
            <li className='hover:border-b-2'>Italian Food</li>
            <li className='hover:border-b-2'>Non-Veg Food</li>
            <li className='hover:border-b-2'>Vegetarian</li>
            <li className='hover:border-b-2'>Events / Celebration</li>
          </ul>
          </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            data.map((item)=>(
                <GalleryPage 
                key={item.img} 
                img={item.img} 
                title={item.title} />
            ))
          }
        </div>
      </div>

      {/* <button className='border border-[#c5a572] text-[#c5a572] px-5 py-2 mt-15'>View More</button> */}
    </div>
    <Footer/>
    </>
  )
}

export default Gallery