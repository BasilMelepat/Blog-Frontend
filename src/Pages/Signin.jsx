import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Config/axiosConfig";
import Bcard from "../components/warningCards/Bcard";

const Signin = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [formErrors, setFormErrors] = useState({
    EmailError: "",
    PasswordError: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const isValidEmail = (email) => {
    return /^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-_]+)\.([a-zA-Z]{2,10})$/.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [`${name}Error`]: "",
    }));
  };

  const validateForm = () => {
    const { Email, Password } = formData;
    const errors = {
      EmailError: "",
      PasswordError: "",
    };
    
    if (!Email.trim()) {
      errors.EmailError = "Email ID is required";
    } else if (!isValidEmail(Email)) {
      errors.EmailError = "Invalid email format";
    }

    if (!Password.trim()) {
      errors.PasswordError = "Password required";
    }

    setFormErrors(errors);
    return !errors.EmailError && !errors.PasswordError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance({
        url: "/signin",
        method: "POST",
        data: formData,
      });

      setResponseMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      
      setFormData({
        Email: "",
        Password: "",
      });

      setTimeout(() => {
        setResponseMessage("");
        navigate("/");
      }, 1000);

    } catch (error) {
      const errorMessage = error.response?.data || "An unexpected error occurred.";
      setResponseMessage(errorMessage);
      
      setTimeout(() => {
        setResponseMessage("");
      }, 1500);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="flex relative w-full h-screen lg:grid grid-cols-2 overflow-clip">
        {/* Image section */}
        <div className="w-full h-screen">
          <img
            src="images/1216414.jpg"
            alt="Background"
            className="w-full h-screen block object-cover"
          />
        </div>

        <Bcard
          logindata={responseMessage}
          className={responseMessage ? "slide-in" : "slide-out"}
        />

        {/* Form section */}
        <div className="h-screen w-full flex justify-center items-center absolute md:relative">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col drop-shadow-xl border-2 p-5 rounded-2xl w-[90%] backdrop-blur-lg md:w-[70%] lg:w-[70%] xl:w-[50%]"
          >
            <h1 className="font-bold text-[2rem] my-5 text-white md:text-black">
              Welcome to My Blog 
            </h1>

            {/* Email field */}
            <label
              htmlFor="Email"
              className="text-white mb-2 text-[0.9rem] md:text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              className={`bg-transparent border rounded-md h-[2rem] outline-none px-4 mb-2 text-white md:text-black ${
                formErrors.EmailError ? "border-red-500" : ""
              }`}
            />
            {formErrors.EmailError && (
              <div className="flex justify-end text-red-500">
                <p>{formErrors.EmailError}</p>
              </div>
            )}

            {/* Password field */}
            <label
              htmlFor="Password"
              className="text-white mb-2 text-[0.9rem] md:text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className={`bg-transparent border rounded-md h-[2rem] outline-none px-4 mb-2 text-white md:text-black ${
                formErrors.PasswordError ? "border-red-500" : ""
              }`}
            />
            {formErrors.PasswordError && (
              <div className="flex justify-end text-red-500">
                <p>{formErrors.PasswordError}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md my-4 hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>

            {/* Sign up link */}
            <div className="flex justify-center mb-5">
              <p className="text-white md:text-black">
                Don't Have An Account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;