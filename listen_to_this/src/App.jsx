import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import LttNavbar from './components/LttNavbar';
import CenterContent from './components/CenterContent';
import Login from './components/Login';

function App() {
  return (
    <>
      <LttNavbar />
      <div 
      className="d-flex justify-content-center row-cols-1 row-cols-lg-2 flex-wrap"
      >
        {/* <Login /> */}
        <CenterContent />
      </div>
    </>
  );
}

export default App;
