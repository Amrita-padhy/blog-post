import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Loginpage from './components/Loginpage.js';
import Regpage from './components/Regpage';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/login' element={<Loginpage />}></Route>
        <Route path='/registration' element={<Regpage />}></Route>
        <Route path='/Home' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
