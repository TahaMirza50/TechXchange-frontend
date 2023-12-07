import {apiPrivate} from "../services/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const {setAuth} = useAuth();
    
    const refresh = async () => {
        
        const response = await apiPrivate.get(
            "/auth/get-access-token",{
                withCredentials: true
            }
        )
        setAuth(prev => {
            return {...prev,accessToken:response.data.accessToken}
        });

        return response.data.accessToken

    }

    return refresh;
}
 
export default useRefreshToken;