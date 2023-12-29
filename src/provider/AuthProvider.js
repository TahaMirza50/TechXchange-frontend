import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
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
    }, [auth?.email,navigate]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;