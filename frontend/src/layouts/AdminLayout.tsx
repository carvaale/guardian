import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
