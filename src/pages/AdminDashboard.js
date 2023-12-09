import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {Outlet} from "react-router-dom"
import LoggedInNavbar from '../components/LoggedInNavbar'
import SideBar from '../components/AdminComponents/SideBar'
import adminProfileImage from '../assets/images/adminProfileimage.png'

const AdminDashboard = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();


    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        navigate("/");
    }

    return ( 
        <div className="h-screen bg-white ">
        <div className='flex flex-col space-y-16'>
            <LoggedInNavbar name="Admin" profileImage={adminProfileImage}/>
            <SideBar handleLogOut={handleLogOut}/>
        </div>

        <Outlet/>
        
    </div>
     );
}
 
export default AdminDashboard;