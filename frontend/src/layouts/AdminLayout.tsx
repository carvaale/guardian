import { useAuth } from "./AuthContext";
import { Outlet } from "react-router-dom";


export const AdminLayout = () => {
    const {role} = useAuth();
    console.log("Deeptanshu Role is : ",role);
    
    return (

        role !=  'admin' ? <p>You dont have admin access.</p> : <Outlet /> 
    );
}
