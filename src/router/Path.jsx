import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../Pages/Signup";
import Signin from "../Pages/Signin";
import Admin from "../Admin/AdminPage/Admin";
import Home from "../Pages/Home";
import NavBar from "../Pages/NavBar";
import About from "../Pages/About";
import {
  AdminInnerAuth,
  AdminOuterAuth,
  InnerAuth,
  OuterAuth,
} from "../Auth/Auth";
import AdminLogin from "../Admin/AdminPage/AdminLogin";
import SingleBlogPage from "../Pages/SingleBlogPage";
import Create from "../components/Create";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminOuterAuth />}>
          <Route path="adminLogin" element={<AdminLogin />} />
        </Route>

        <Route element={<AdminInnerAuth />}>
          <Route path="adminDashboard" element={<Admin />} />
        </Route>

        <Route element={<OuterAuth />}>
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Route>

        <Route element={<InnerAuth />}>
          <Route path="/*" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="blogpage" element={<SingleBlogPage />} />
            <Route path="create" element={<Create />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
