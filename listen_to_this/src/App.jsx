import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import LttNavbar from './components/LttNavbar';
import CenterContent from './components/CenterContent';

function App() {
  return (
    <>
      <LttNavbar />
      <div 
      className="d-flex justify-content-center row-cols-2"
      >
        <CenterContent />
      </div>
    </>
  );
}

export default App;
