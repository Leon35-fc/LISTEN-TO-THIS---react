import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LttNavbar from './components/LttNavbar';
import CenterContent from './components/CenterContent';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      <LttNavbar token={token} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/*"
          element={<Navigate to={token ? '/home' : '/auth'} replace />}
        />
        {/* <div className="d-flex justify-content-center row-cols-1 row-cols-lg-2 flex-wrap"> */}
        <Route
          path="/auth"
          element={
            !token ? <Login onLogin={handleLogin} /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              <CenterContent />
            </ProtectedRoute>
          }
        />
        {/* </div> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
