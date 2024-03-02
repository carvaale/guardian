import axios from "axios";


const api_url = 'http://127.0.01/api/auth'

export const verifyToken = async (token: string) => {

    try {
        if (!token) {
            throw new Error('Invalid token');
        }

        const response = await axios.get(`${api_url}/verify`, {headers: {Authorization: `Bearer ${token}`}});  
        return response.data 
    } catch (error) {
        console.error("Token Verification failed", error);
    }
};