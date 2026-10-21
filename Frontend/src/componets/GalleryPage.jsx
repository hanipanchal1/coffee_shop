import React from 'react'

const GalleryPage = ({img,title}) => {
  return (
    <div>
      <div className='mt-5'>
        <img className='w-[26vw] h-[42vh]' src={img} alt="" />
        <p className='bg-[#f4eee4] w-[26vw] font-serif text-2xl px-6 py-5 font-extralight'>{title}</p>
      </div>
    </div>
  )
}

export default GalleryPage