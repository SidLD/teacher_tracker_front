import { createBrowserRouter, createRoutesFromElements , Navigate, Route} from "react-router-dom";

import Dashboard from "../pages/Dashboard/index";
import Register from "../pages/Register/index";
import { PublicLayout, PrivateLayout } from "./module";
import Login from "../pages/Login/index";
import { auth } from "./services";
import { Approve } from "../pages/Approve";
import { Setting } from "../pages/Setting";
import { MasterList } from "../pages/MasterList";
import { LogOut } from "../pages/Logout";
const routers = createBrowserRouter(
    createRoutesFromElements(
        <> 
        <Route element={<PublicLayout/>}>
            <Route  path="/login" element={<Login/>} />
            <Route  path="/register" element={<Register/>} />      
        </Route>
        <Route element={<PrivateLayout/>}>
            <Route index path="/dashboard" element={<Dashboard/>} />
            <Route path="/setting" element={<Setting/>} />
            <Route path="logout" element={<LogOut />} />
            {auth.getRole() !== "student" && <Route  path="/approve" element={<Approve/>} />}      
            {auth.getRole() !== "student" && <Route  path="/masterlist" element={<MasterList/>} />}  

            <Route  path="*" element={<Navigate to="/dashboard" />}/>
        </Route>
        </>
    )
)
export default routers