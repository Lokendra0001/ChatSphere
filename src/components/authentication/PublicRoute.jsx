// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const authStatus = useSelector((state) => state.auth.status); // adjust this based on your auth slice
  console.log(authStatus);
  return authStatus ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
