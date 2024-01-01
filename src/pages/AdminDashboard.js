import { useNavigate } from "react-router-dom";
import {Outlet} from "react-router-dom"
import LoggedInNavbar from '../components/LoggedInNavbar'
import SideBar from '../components/AdminComponents/SideBar'
import adminProfileImage from '../assets/images/adminProfileimage.png'
import { removeAuthValues } from "../features/auth";
import { useDispatch } from "react-redux";
import { apiPrivate } from "../services/api";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            const response = await apiPrivate.get(
                "/auth/logout", {
                withCredentials: true
            }
            )
            if (response.status === 200) {
                dispatch(removeAuthValues());
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div className="bg-white ">
            <div className='flex-col space-y-16'>
                <LoggedInNavbar name="Admin" profileImage={adminProfileImage}/>
                <SideBar handleLogOut={handleLogOut} />
            </div>

            <div className="ml-60 mr-60">
                <Outlet />
            </div>
            
        
        </div>
     );
}
 
export default AdminDashboard;