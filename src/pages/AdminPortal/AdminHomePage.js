import adminProfileImage from '../../assets/images/adminProfileimage.png'
import LoggedInNavbar from '../../components/LoggedInNavbar'
import ImageCard from "../../components/AdminComponents/ImageCard"
import usersImage from "../../assets/images/users.png"
import categoriesImage from "../../assets/images/categories.jpg"
import advertisementImage from "../../assets/images/advertisements.jpg"
import reportsImage from "../../assets/images/reports.png"
import SideBar from '../../components/AdminComponents/SideBar'

const AdminHomePage = () => {
    return(
        <div className="h-screen bg-white flex flex-col space-y-16">
            <div>
                <LoggedInNavbar name="Admin" profileImage={adminProfileImage}/>
            </div>
            <SideBar/>
        </div>
    );
}

export default AdminHomePage;
