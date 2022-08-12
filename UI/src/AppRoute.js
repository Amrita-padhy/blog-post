import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage.js";
import Regpage from "./pages/Regpage";
import Home from "./pages/HomePage";
import ForgetPassword from "./pages/ForgetPassword";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage.js";
import DetailsPage from "./pages/DetailsPage";
import ReadingListPage from "./pages/ReadingListPage";
// import Navbar from './components/Navbar';

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/registration" element={<Regpage />}></Route>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/create-post/:postId" element={<CreatePost />}></Route>
        <Route path="/profile-page" element={<ProfilePage />}></Route>
        <Route path="/details-page/:postId" element={<DetailsPage />}></Route>
        <Route path="/reading-list" element={<ReadingListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
