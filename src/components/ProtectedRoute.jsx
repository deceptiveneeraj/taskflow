import { Navigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";

const ProtectedRoute = ({ children }) => {
  const { uid, loading } = useUserData();

  if (loading) return null;

  if (!uid) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
