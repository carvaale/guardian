
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
 
const ProtectedLayout = () => {
    const {user} = useAuth();
    return (
        user ? <Outlet /> : <Navigate to="/login" />
    );
};


export default ProtectedLayout;