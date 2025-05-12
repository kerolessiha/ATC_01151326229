import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/Login" />;
  }

  return element;
};

export default ProtectedRoute;
