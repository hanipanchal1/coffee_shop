import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ img, date, title, description,items = [], onExplore  }) => {
    const navigate = useNavigate();

  const handleExplore = onExplore || (() => navigate("/blog/detail"));
  return (
    <div className="flex justify-center py-10">
      <div className="flex flex-col items-start justify-center gap-3 w-[24vw]">
        <img className=" h-[42vh] object-cover mb-9" src={img} alt="" />

        <p className="text-[18px] text-[#979797]">{date}</p>
        <h1 className="text-xl">{title}</h1>
        <p className="text-[#696969]">{description}</p>
        <button className="text-[#c5a572]" onClick={handleExplore}>Read More →</button>
      </div>
    </div>
  );
};

export default BlogCard;
