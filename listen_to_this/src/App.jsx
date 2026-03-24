import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import LttNavbar from './components/LttNavbar';
import CenterContent from './components/CenterContent';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <LttNavbar />
      <Routes>
        <Route path="/*" element={<Navigate to="/auth" replace />} />
        {/* <div className="d-flex justify-content-center row-cols-1 row-cols-lg-2 flex-wrap"> */}
          <Route path="/auth" element={<Login />} />
          <Route path="/home" element={<CenterContent />} />
        {/* </div> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
