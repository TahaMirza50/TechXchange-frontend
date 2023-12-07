import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiPrivate from "../hooks/useAPIPrivate";

const HomePage = () => {
    const [user,setUser] = useState({});
    const apiPrivate = useApiPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProfile = async () => {
            try {
                await apiPrivate.get('profile/get').then((res) => {
                    console.log(res);
                    isMounted && setUser(res.data)
                });
            } catch (error) {
                console.error(error)
            }
        }

        getProfile();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        navigate("/");
    }

    const handlereload = async () => {
        try {
            const res = await apiPrivate.get('profile/get');
            console.log(res);
        } catch (error) {
        }

    }

    return (
        <div>
            <button onClick={() => navigate("/admin-dashboard")}>go to admin</button>
            <button onClick={() => navigate("/profile")}>go to profile</button>
            <h1>Homepage</h1>
            <button onClick={handlereload}>Reload Profile with new access token</button>
            <button onClick={handleLogOut}>Log out.</button>
        </div>
    );
}

export default HomePage;