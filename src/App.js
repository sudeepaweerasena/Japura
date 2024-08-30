import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import SeparatorComponent from './components/SeparatorComponent';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      
      <SeparatorComponent />
      <Outlet />
    </div>
  );
}

export default App;
