import React, { useState } from "react";
import { axiosInstance } from "../../Config/axiosConfig";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [adminData, setadminData] = useState({
    mail: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;

    setadminData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosInstance({
      url: "adminLogin",
      method: "POST",
      data: adminData,
    }).then((res) => {
      localStorage.setItem("Admintoken", res.data.token);
      navigate("/adminDashboard")
    }).catch((err)=>{
      if (err.response) {
        setresponse(err.response.data.message); // Error message from server
      } else {
        setresponse("An unexpected error occurred.");
      }
    })
  };
  return (
    <section>
      <div className="flex relative w-full h-screen lg:grid grid-cols-2 overflow-clip">
        <div className="w-full h-screen ">
          <img
            src="images/High Size/2151732243.jpg"
            alt=""
            className="w-full h-screen block object-cover"
          />
        </div>

        <div className="h-screen w-full flex justify-center items-center absolute md:relative ">
          <div className="flex flex-col drop-shadow-xl border-2 p-5 rounded-2xl w-[90%] backdrop-blur-lg  md:w-[70%] lg:w-[70%] xl:w-[50%]  ">
            <h1 className="font-poppins font-bold text-[2rem] my-5 text-white md:text-black ">
              Welcome Ajay
            </h1>
            <label
              htmlFor="mail"
              className="text-white mb-2 font-poppins text-[0.9rem] md:text-gray-600 "
            >
              Email
            </label>
            <input
              type="text"
              id="mail"
              value={adminData.mail}
              name="mail"
              onChange={handlechange}
              className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white md:text-black `}
            />

            <label
              htmlFor="password"
              className="text-white mb-2 font-poppins text-[0.9rem] md:text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={adminData.Password}
              name="Password"
              onChange={handlechange}
              className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white md:text-black `}
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-poppins py-2 rounded-full my-4 "
            >
              Login In
            </button>

            {/* <div className="flex items-center gap-4 w-full justify-center">
                <span className="border-2 flex w-[5rem] h-1"></span>
                <div>or</div>
                <span className="border-2 flex w-[5rem] h-1"></span>
                
              </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
