import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  // const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;