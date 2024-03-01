
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthLayout = () => {
  const {user} = useAuth();
  return (
    user? null : <Outlet />
    
  );
};
export default AuthLayout;
