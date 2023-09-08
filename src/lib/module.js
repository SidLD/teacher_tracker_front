import DashboardLayout from "../layout/DashboardLayout";
import {auth} from "./services"
import { Navigate, Outlet } from "react-router-dom";

export const PublicLayout = () => {
    if(auth.isAuthenticated()){
        return  <Navigate to={"/dashboard"} />;
    }
    return (
        <div >
            <Outlet/>
        </div>
    )
}
export const PrivateLayout = () => {
    if (!auth.isAuthenticated()) {
        return <Navigate to={"/login"} />;
    }
    else if (auth.getExpiration() * 1000 <= Date.now()) {
        auth.clear()
        alert("Session Expired")
        return <Navigate to={"/login"} />;
        
    }else{
        return <DashboardLayout />
    }
    
}
