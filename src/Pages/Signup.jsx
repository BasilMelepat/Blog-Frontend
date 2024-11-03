import React, { useState } from "react";
import Acard from "../components/warningCards/Acard";
import { axiosInstance } from "../Config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    Email: "",
    Password: "",
    correctPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    userNameError: "",
    EmailError: "",
    PasswordError: "",
    correctPasswordError: "",
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
    const { userName, Email, Password, correctPassword } = formData;
    const errors = {
      userNameError: "",
      EmailError: "",
      PasswordError: "",
      correctPasswordError: "",
    };

    if (!userName.trim()) {
      errors.userNameError = "User Name is required";
    }

    if (!Email.trim()) {
      errors.EmailError = "Email ID is required";
    } else if (!isValidEmail(Email)) {
      errors.EmailError = "Invalid email format";
    }

    if (!Password.trim()) {
      errors.PasswordError = "Password required";
    }

    if (!correctPassword.trim()) {
      errors.correctPasswordError = "Password required";
    } else if (Password !== correctPassword) {
      errors.correctPasswordError = "Password mismatch";
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance({
        url: "/signup",
        method: "POST",
        data: formData,
      });

      setResponseMessage(response.data);
      
      setFormData({
        userName: "",
        Email: "",
        Password: "",
        correctPassword: "",
      });

      setTimeout(() => {
        setResponseMessage("");
        navigate("/signin");
      }, 1000);

    } catch (error) {
      // Handle error
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
        <div className="w-full h-screen">
          <img
            src="/images/2381677.jpg"
            alt="Background"
            className="w-full h-screen block object-cover"
          />
        </div>

        {/* Alert card */}
        <Acard
          data={responseMessage}
          className={responseMessage ? "slide-in" : "slide-out"}
        />

        {/* Form section */}
        <div className="h-screen w-full flex justify-center items-center absolute md:relative">
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col drop-shadow-xl border-2 p-5 rounded-2xl w-[90%] backdrop-blur-lg md:w-[70%] lg:w-[70%] xl:w-[50%]"
          >
            <h1 className="font-bold text-[2rem] my-5 text-white md:text-black">
              Register in My Blog
            </h1>

            {/* Username field */}
            <label htmlFor="userName" className="text-white mb-2 text-[0.9rem] md:text-gray-600">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className={`bg-transparent border rounded-md h-[2rem] outline-none px-4 mb-2 text-white md:text-black ${
                formErrors.userNameError ? "border-red-500" : ""}`} 
            />
            {formErrors.userNameError && (
              <div className="flex justify-end text-red-500">
                <p>{formErrors.userNameError}</p>
              </div>
            )}

            {/* Email field */}
            <label htmlFor="Email"
              className="text-white mb-2 text-[0.9rem] md:text-gray-600">
              Email </label>
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

            {/* Confirm Password field */}
            <label
              htmlFor="correctPassword"
              className="text-white mb-2 text-[0.9rem] md:text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="correctPassword"
              name="correctPassword"
              value={formData.correctPassword}
              onChange={handleChange}
              className={`bg-transparent border rounded-md h-[2rem] outline-none px-4 mb-2 text-white md:text-black ${
                formErrors.correctPasswordError ? "border-red-500" : ""
              }`}
            />
            {formErrors.correctPasswordError && (
              <div className="flex justify-end text-red-500">
                <p>{formErrors.correctPasswordError}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md my-4 hover:bg-blue-600 transition-colors"
            >
              Register
            </button>

            {/* Sign in link */}
            <div className="flex justify-center mb-5">
              <p className="text-white md:text-black">
                Already Have An Account?{" "}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;