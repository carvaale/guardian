import axios from "axios";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { verifyTokenAndSetUser } from "../utils/authUtils";


interface AuthContextType {
    user: string | null;
    loginUser: (userInfo: LoginInfo) => void;
    logoutUser: () => void;
    registerUser: (userInfo: RegisterInfo) => void;
}

 interface LoginInfo {
    email: string;
    password: string;
}
interface RegisterInfo {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode; 
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(false); 
        checkUserStatus(); 

    },[])

    const loginUser = async(userInfo: LoginInfo) => {
        try{
             const response = await axios.post('API_KEY',{ email: userInfo.email, password: userInfo.password});
             const token = response.data.token;
             await verifyTokenAndSetUser({ token, setUser, navigate });
            
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };


    const logoutUser = async() => {
        localStorage.removeItem('userToken');
        setUser(null);
    };


    const registerUser = async (userInfo: RegisterInfo) => {

        try{
             const response = await axios.post('API_KEY',{ email: userInfo.email, password: userInfo.password, firstName: userInfo.firstname, lastName: userInfo.lastname})
             const token = response.data.token
             await verifyTokenAndSetUser({ token, setUser, navigate });
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    };


    const checkUserStatus = async () => {
        try{
            const token = localStorage.getItem('userToken');
            setUser(token)
        }
        catch(error){
            console.error(error);
        }   
        finally{
            setLoading(false);
        }
    };

    const contextData: AuthContextType = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {return useContext(AuthContext)!;}

export default AuthContext;





