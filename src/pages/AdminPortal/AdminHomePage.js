import adminProfileImage from '../../assets/images/adminProfileimage.png'
import LoggedInNavbar from '../../components/LoggedInNavbar'
import ImageCard from "../../components/ImageCard"
import usersImage from "../../assets/images/users.png"
import categoriesImage from "../../assets/images/categories.jpg"
import advertisementImage from "../../assets/images/advertisements.jpg"
import reportsImage from "../../assets/images/reports.png"

const AdminHomePage = () => {
    return(
        <div className="h-screen bg-white">
            <LoggedInNavbar name="Admin" profileImage={adminProfileImage}/>
            <div class="flex items-center space-x-8 p-5">
                <ImageCard route="users" image={usersImage} title="Users"/>
                <ImageCard route="categories" image={categoriesImage} title="Categories"/>
                <ImageCard route="advertisements" image={advertisementImage} title="Advertisements"/>
                <ImageCard route="reports" image={reportsImage} title="Reports"/>
            </div>

            
        </div>
    );
}

export default AdminHomePage;