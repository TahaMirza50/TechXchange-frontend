import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const HomePage = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const handleLogOut = () => {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        navigate(0);
    }

    return ( 
        <div>
            <h1>HOmepage</h1>
            <button onClick={handleLogOut}>Log out.</button>
        </div>
     );
}
 
export default HomePage;