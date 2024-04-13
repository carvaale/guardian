import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log("Loading...");
    return <h1>Loading...</h1>;
  } else if (!user) {
    return <Navigate to="/login" />;
  }
  console.log(user)

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
