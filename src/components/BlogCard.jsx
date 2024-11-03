import React, { useEffect, useState } from "react";
import WritingPad from "../Admin/AdminComponents/writtingPad";

const BlogCard = ({ item }) => {

  


  return (
    <div className="relative h-[300px] w-[300px]  overflow-hidden drop-shadow-xl border-2 rounded-xl">
      <div className="w-full h-[200px]">
        <img
            src={import.meta.env.VITE_API_BASE_URL+"/"+item.ImagePath}

          alt=""
          className="w-full h-full block object-cover"
        />
      </div>

      <div className="font-poppins m-2 text-black">
        

        <WritingPad
            value={`${item?.content.slice(0,150)}`}
          theme="bubble"
          readOnly={true}
        />

       

       
      </div> 
    </div>
  );
};

export default BlogCard;
