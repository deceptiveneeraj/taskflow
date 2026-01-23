import { Navigate } from "react-router-dom";
import { useUserData } from "../context/UserDataContext";

function PublicRoute({ children }) {
  const { uid, loading } = useUserData();

  if (loading) return null;

  if (uid) {
    return <Navigate to="/" replace />;   // ✅ Already logged in → go home
  }

  return children;
}

export default PublicRoute;
