
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
 
const ProtectedLayout = () => {
    let {user} = useAuth();
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    );
};


export default ProtectedLayout;