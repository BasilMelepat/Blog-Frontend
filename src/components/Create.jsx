import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WritingPad from "../Admin/AdminComponents/writtingPad";
import { axiosInstance } from "../Config/axiosConfig";

const Create = () => {
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
    </section>
  );
};

export default Create;
