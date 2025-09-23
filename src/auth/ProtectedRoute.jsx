import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { token, user, loading } = useAuth();

  console.log("protected Route:");
  console.log("token:", token);
  console.log("user:", user);

  if (loading) return <div>Loading...</div>;

  if (!token) return <Navigate to="/login" />;

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  //redirecting from dashboard
  // if (!adminOnly && user?.role === "admin") {
  //   return <Navigate to="/admin" />;
  // }

  return children;
};

export default ProtectedRoute;
