import { useNavigate } from "react-router-dom";
import img from "../../assets/guardian-logo.webp";

import { useAuth } from "../../layouts/AuthContext";

 const Banner = () => {
    const navigate = useNavigate();
    const {logoutUser} = useAuth()

    const handleSubmit = async() => {
        localStorage.removeItem('userToken');
        await logoutUser();
    };

    return (
        <div className='p-4 flex flex-row items-center gap-4 w-full border-neutral-700 bg-neutral-800 absolute'>
            <span
                className="mr-16 flex flex-row items-center cursor-pointer"
                onClick={() => navigate("/chat")}>
                <img src={img} alt="Guardian Logo" className="h-10 w-10 ml-4" />
                <span className="ml-2 text-white text-xl font-bold">Guardian</span>
            </span>
            <span
                className="text-white cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/chat")}>
                Chat
            </span>
            <span
                className="text-white cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/pii_identifier")}>
                PII Identifier
            </span>
            <span
                className="text-white cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/data_leak")}>
                Data Leak Analytics
            </span>
            <span
                className="text-white cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/settings")}>
                Settings
            </span>
            <span
                className="text-white ml-auto cursor-pointer hover:text-blue-500"
                onClick={() => navigate("/admin_console")}>
                Admin Console
            </span>
            <input
                className='text-white mr-4 cursor-pointer hover:text-blue-500'
                onClick={handleSubmit}

                type='submit'
                value='Logout'
            />
        </div>
    )
}
export default Banner;
