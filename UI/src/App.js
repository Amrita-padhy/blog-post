import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Loginpage from './pages/Loginpage.js';
import Regpage from './pages/Regpage';
import Home from './pages/HomePage';
import ForgetPassword from './pages/ForgetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/login' element={<Loginpage />}></Route>
        <Route path='/registration' element={<Regpage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/forget-password' element={<ForgetPassword />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
