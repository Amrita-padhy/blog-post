import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Loginpage from './pages/Loginpage.js';
import Regpage from './pages/Regpage';
import Home from './pages/HomePage';
import ForgetPassword from './pages/ForgetPassword';
import CreatePost from './pages/CreatePost';
import ProfilePage from './pages/ProfilePage.js';
// import Navbar from './components/Navbar';

function AppRoute() {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/login' element={<Loginpage />}></Route>
      <Route path='/registration' element={<Regpage />}></Route>
      <Route exact path='/' element={<Home />}></Route>
      <Route path='/forget-password' element={<ForgetPassword />}></Route>
      <Route path='/create-post' element={<CreatePost />}></Route>
      <Route path='/profile-page' element={< ProfilePage/>}></Route>

    </Routes>
  </BrowserRouter>
  )
}

export default AppRoute
