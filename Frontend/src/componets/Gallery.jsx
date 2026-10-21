import React from 'react'

const Gallery = () => {
  return (
    <div className='px-25 flex flex-col gap-15'>
        <div className="flex flex-col justify-center items-center">
            <p className='text-[#c5a572] font-sans'>TAKE A TOUR</p>
            <h2 className="text-4xl font-serif text-center">Our Restaurant Gallery</h2>
        </div>
        <div className="flex justify-between">
            <img className='h-58 w-65' src="../src/assets/img/g4.png" alt="error" />
            <img className='h-58 w-65' src="../src/assets/img/G3.png" alt="error" />
            <img className='h-58 w-65' src="../src/assets/img/G1.png" alt="error" />
            <img className='h-58 w-65' src="../src/assets/img/G2.png" alt="error" />
        </div>
    </div>
  )
}

export default Gallery