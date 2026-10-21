import React from 'react'

const ServicePage1 = ({icon,title,titleIcon,description,img}) => {
  return (
    <div className='flex bg-[#f4eee4] h-auto justify-between'>
      <div className="flex flex-col gap-3 items-center justify-center w-[130vw] px-25 text-center">
        <img className='w-15' src={icon} alt="error" />
        <h1 className='text-4xl font-serif'>{title}</h1>
        <img className='w-35' src={titleIcon} alt="error" />
        <p className='mt-3 text-[#615d5d] '>{description}</p>
      </div>
      <div className="w-[140vw] ">
        <img className='' src={img} alt="error" />
      </div>
    </div>
  )
}

export default ServicePage1