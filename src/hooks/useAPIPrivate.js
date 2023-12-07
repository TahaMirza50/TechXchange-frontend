import { apiPrivate } from "../services/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useApiPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{

        const requestIntercept = apiPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = apiPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response.status === 401 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return apiPrivate(prevRequest);
                }
                if(error?.response.status === 403){
                    console.log("hello")
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        )

        return () => {
            apiPrivate.interceptors.request.eject(requestIntercept);
            apiPrivate.interceptors.response.eject(responseIntercept);
        }

    },[auth,refresh,navigate])

    return apiPrivate;
}
 
export default useApiPrivate;