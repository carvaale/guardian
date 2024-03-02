
import { Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthLayout = () => {
  const {user} = useAuth();
  const token = localStorage.getItem('userToken');
  console.log(user);
  return (
    token || user? <p>You should not be allowed to see this!</p> : <Outlet />
  );
};
export default AuthLayout;