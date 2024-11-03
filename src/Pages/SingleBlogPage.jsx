import React, { useEffect, useState } from "react";
import { axiosInstance } from "../Config/axiosConfig";
import WritingPad from "../Admin/AdminComponents/writtingPad";

const SingleBlogPage = () => {
  const [blog, setblog] = useState("");

  // useEffect(() => {
  //   api();
  // }, []);

  // function api() {}
  // axiosInstance({
  //   url: "/Blog/createdBlog",
  //   method: "GET",
  // }).then((res) => {
  //   setblog(res.data);
  // });

  return (
    <section className="flex justify-center">
      <div className="w-[800px] h-[500px]">
        <img
          src={import.meta.env.VITE_API_BASE_URL + "/" + blog.ImagePath}
          alt=""
          className="w-full h-full  object-cover overflow-hidden"
        />
      </div>

      <div>
        <WritingPad value={`${blog.content}`} theme="bubble" readOnly={true} />
      </div>
    </section>
  );
};

export default SingleBlogPage;
