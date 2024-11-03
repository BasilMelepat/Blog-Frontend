import React, { useState } from "react";
import WritingPad from "../AdminComponents/writtingPad";
import { axiosInstance } from "../../Config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const [value, setValue] = useState("");

  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    let imagePath = undefined;
    if (image) {
      const formDataImage = new FormData();
      formDataImage.append("img", image);

      imagePath = await axiosInstance({
        url: "/Blog/addImage",
        method: "POST",
        data: formDataImage,
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
 
    axiosInstance({
      url: "/Blog/BlogCreated",
      method: "POST",
      data: {
        content: value,
        imagePath: imagePath.data.path,
      },
    }).then((res) => {
 
      setValue("");
      setImage(null);
    });
  };

  return (
    <section>
      <div className="bg-black w-full h-[50px]"></div>

      <div className="flex">
        <div className=" h-screen bg-blue-600 w-[auto] p-3">
          <div className="w-full bg-white rounded-md h-7 font-poppins flex justify-center items-center drop-shadow-xl mb-5 p-2">
            Create Blog
          </div>
          <div className="w-full text-white rounded-md h-7 font-poppins flex justify-center items-center drop-shadow-xl p-2">
            Create Blog List
          </div>
          <Link to="/">
            <div className="w-full text-white rounded-md h-7 font-poppins flex justify-center items-center drop-shadow-xl p-2">
              Home
            </div>
          </Link>

          <div
            className="flex flex-col justify-center items-center text-white "
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <span>
              <img
                src="images/logout.png"
                alt="LogOut"
                className="h-[40px] w-[40px]"
              />
            </span>{" "}
            Log Out
          </div>
        </div>

        <div className="mx-5">
          <div className="flex flex-wrap my-5">
            <div className="flex flex-col">
              <h1 className="font-poppins font-semibold my-5">Upload Image</h1>
              <input type="file" onChange={handleImage} accept="image/*" />
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="w-[200px] h-[200px] block object-contain my-2"
                />
              )}
            </div>
          </div>

          <WritingPad
            value={value}
            setValue={setValue}
            theme="snow"
            readOnly={false}
          />
          <button
            onClick={handleSave}
            className=" bg-green-600 p-4 mt-5 text-white font-poppins rounded "
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default Admin;
