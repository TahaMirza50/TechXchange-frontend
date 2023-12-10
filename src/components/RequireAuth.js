import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const RequiredAuth = ({ allowedRole }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth?.email) {

            const storedAccessToken = localStorage.getItem('accessToken');

            if (storedAccessToken) {

                const decodedToken = jwtDecode(storedAccessToken);
                const { email, role } = decodedToken;

                setAuth({
                    accessToken: storedAccessToken,
                    email,
                    role,
                });

                if (role === 'user') {
                    navigate('/home');
                } else if (role === 'admin') {
                    navigate('/admin-dashboard');
                }

            }
        }
    }, [navigate, setAuth,auth?.email]);

    // if (!auth?.email) {

    //     const storedAccessToken = localStorage.getItem("accessToken")
    //     console.log(storedAccessToken)
    //     if (storedAccessToken) {
    //         const decodedToken = jwtDecode(storedAccessToken);

    //         // Extract email and role from the decoded token
    //         const { email, role } = decodedToken;
    //         console.log(email, role);
    //         // Set the access token, email, and role in the auth state
    //         auth.email=email;
    //         auth.role=role;
    //         auth.accessToken=storedAccessToken
    //         // setAuth({
    //         //     accessToken: storedAccessToken,
    //         //     email,
    //         //     role,
    //         // }
    //         // );
    //     }
    // }
    // console.log(allowedRole)
    // console.log(auth?.role)
    // console.log(auth?.email)
    return (
        allowedRole === auth?.role
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequiredAuth;