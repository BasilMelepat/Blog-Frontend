import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("Admintoken");
    navigate("signin");
  };

  return (
    <header className=" fixed flex  h-[70px] z-10 bg-white w-full top-0">
      <nav className="flex justify-between items-center w-full">
        <Link to={"/"}>
          <div className="h-[50px] w-[50px] mx-2">
            <img
              src="images/logo.png"
              alt=""
              className="w-full h-full block"
            />
          </div>
        </Link>

        <div className="mx-2">
          <Link to="create">
            <button className="mx-2 p-2 rounded-lg bg-blue-500 font-poppins text-white  ">
              Create Blog
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="mx-2 bg-red-500 p-2 rounded-lg font-poppins text-white"
          >
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
