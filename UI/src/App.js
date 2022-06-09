import React from 'react';
import './App.css';
import AppRoute from './AppRoute';
import AuthContextProvider from './contextPage/Context'


function App() {
  return (
    <AuthContextProvider>
    <AppRoute/>
  </AuthContextProvider>
  );
}

export default App;
