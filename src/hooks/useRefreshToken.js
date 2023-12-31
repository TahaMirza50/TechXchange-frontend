import { useNavigate } from "react-router-dom";
import { api, apiPrivate } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthValues, setAuthValues } from "../features/auth";
import { jwtDecode } from "jwt-decode";

const useRefreshToken = () => {
    // const { setAuth } = useAuth();
    const dispatch = useDispatch();

    const refresh = async () => {

        try {
            const response = await apiPrivate.get(
                "/auth/get-access-token", {
                withCredentials: true
            }
            )
            const decodedToken = jwtDecode(response.data.accessToken);
            // localStorage.setItem("accessToken", response.data.accessToken);
            // setAuth(prev => {
            //     return { ...prev, accessToken: response.data.accessToken }
            // });
            // console.log(decodedToken);
            dispatch(setAuthValues({ email: decodedToken.email, role: decodedToken.role, accessToken: response.data.accessToken }));

            return response.data.accessToken
        } catch (error) {
            if (error.response.status === 403) {
                try {
                    const response = await apiPrivate.get(
                        "/auth/logout", {
                        withCredentials: true
                    })
                    if (response.status === 200) {
                        dispatch(removeAuthValues());

                    }
                } catch (error) {
                    console.log(error)
                }
            }
            console.log(error);
        }

    }

    return refresh;
}

export default useRefreshToken;