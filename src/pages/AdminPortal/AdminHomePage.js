import adminProfileImage from '../../assets/images/adminProfileimage.png'
import LoggedInNavbar from '../../components/LoggedInNavbar'
import SideBar from '../../components/AdminComponents/SideBar'
import { Route, Routes } from 'react-router-dom'
import AdminUsersPage from './AdminUsersPage'

const AdminHomePage = () => {
    return(
        <div className="h-screen bg-white ">
            <div className='flex flex-col space-y-16'>
                <LoggedInNavbar name="Admin" profileImage={adminProfileImage}/>
                <SideBar/>
            </div>
            


            <Routes>
                <Route path="/" element={<AdminUsersPage/>}/>
            </Routes>
            
        </div>
    );
}

export default AdminHomePage;
