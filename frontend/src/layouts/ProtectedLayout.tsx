
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {

    return (
        <>
        <div className="">
        <Outlet />
        </div>
        </>
    );
};


export default ProtectedLayout;