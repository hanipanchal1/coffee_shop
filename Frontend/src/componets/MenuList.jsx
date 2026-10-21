import React from 'react'

const MenuList = ({ id, title, description, discription, price }) => {
  return (
    <div className="flex flex-col">
      {id && (
        <div className="flex flex-col items-center mb-5">
          <h1 className="text-xl font-serif text-[#c5a572]">{id.title}</h1>
          {id.img && <img src={id.img} alt="" className="w-20 h-12" />}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-2xl">{title}</h1>
        <p className="text-2xl">{price}</p>
      </div>
      <p className="text-[#b9b8b8] text-md">{description || discription}</p>
    </div>
  );
};

export default MenuList