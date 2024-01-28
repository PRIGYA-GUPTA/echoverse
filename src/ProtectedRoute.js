import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // adjust the import path if needed

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;
