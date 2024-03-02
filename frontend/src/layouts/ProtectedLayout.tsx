import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedLayout = () => {

    const { user } = useAuth();
    const token = localStorage.getItem('userToken');
        
    return (
       token || user ? <Outlet /> : <Navigate to="/login" />
    );
};

export default ProtectedLayout;