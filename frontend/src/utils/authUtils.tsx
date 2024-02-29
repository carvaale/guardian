import axios from "axios";
import { SetStateAction, Dispatch } from "react";
import { NavigateFunction } from "react-router-dom";
interface VerifyTokenAndSetUserProps {
    token: string | null;
    setUser: Dispatch<SetStateAction<string | null>>;
    navigate: NavigateFunction;
}

export const verifyTokenAndSetUser = async ({ token, setUser, navigate }: VerifyTokenAndSetUserProps) => {

    try {
        if (!token) {
            throw new Error('Invalid token');
        }

        const response = await axios.post('/api_url', { token });
        const user = response.data.user;
        setUser(user);
        localStorage.setItem('userToken', token);
        navigate('/')

    } catch (error) {
        console.error(error);

        localStorage.removeItem('userToken');
        setUser(null);

    }
};