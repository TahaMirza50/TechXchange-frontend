import { useNavigate } from "react-router-dom";
import {Outlet} from "react-router-dom"
import LoggedInNavbar from '../components/LoggedInNavbar'
import SideBar from '../components/AdminComponents/SideBar'
import adminProfileImage from '../assets/images/adminProfileimage.png'

const AdminDashboard = () => {
    const navigate = useNavigate();


    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        navigate("/");
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