import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AdminDashboard = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleLogOut = () => {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        navigate(0);
    }

    return ( 
        <div>
                        <button onClick={() => navigate("/home")}>go to homepage</button>
            <h1>Admin</h1>
            <button onClick={handleLogOut}>Log out.</button>
        </div>
     );
}
 
export default AdminDashboard;