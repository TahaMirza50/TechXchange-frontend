import { useNavigate } from "react-router-dom";
import { apiPrivate } from "../services/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {

        try {
            const response = await apiPrivate.get(
                "/auth/get-access-token", {
                withCredentials: true
            }
            )
            console.log(response.data)
            localStorage.setItem("accessToken", response.data.accessToken);
            setAuth(prev => {
                return { ...prev, accessToken: response.data.accessToken }
            });

            return response.data.accessToken
        } catch (error) {
            console.log("refresh expiref")
            sessionStorage.removeItem("accessToken");
            navigate(0);
        }

    }

    return refresh;
}

export default useRefreshToken;