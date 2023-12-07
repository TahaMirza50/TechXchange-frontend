import { useState} from "react";
import logo from '../assets/images/logo.png'
import {api} from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ModalAlerts from "../components/ModalAlerts";
import useAuth from "../hooks/useAuth";

const Login = ({ onLogin }) => {
    const { setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [isPending, setIsPending] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [heading, setHeading] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsPending(true);
            await api.post("/auth/login", {
                email,
                password: pass
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }).then((res) => {
                if (res.status === 200) {
                    const {accessToken} = res.data;

                    localStorage.setItem("accessToken", accessToken);


                    const decodedToken = jwtDecode(accessToken);
                    const role = decodedToken.role;
                    const email = decodedToken.email;
                    setAuth({ email, role, accessToken });
                    if (decodedToken.role === "admin") {
                        navigate("/admin-dashboard");
                    } else {
                        navigate("/home")
                    }
                }
            })
        } catch (error) {
            console.log(error)
            setHeading("Error");
            if (!error?.response) {
                setMessage("No server response.");
            } else if (error.response?.status === 400) {
                setMessage(error.response.data);
            } else {
                setMessage("Login failed.")
            }
            setIsPending(false);
            setOpenModal(true);
        }
    }

    return (
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
                    TechXchange
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="name@company.com" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                            </div>
                            <div>
                                <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                            </div>
                            {!isPending && <button type="submit" class="w-full h-12 text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>}
                            {isPending && <button disabled type="submit" class="w-full h-12 text-white bg-sky-500 font-medium rounded-lg px-5 py-2.5 dark:bg-primary-600">
                                <div className="flex items-center justify-center">
                                    <div className="border-t-4 border-white border-solid rounded-full h-8 w-8 animate-spin"></div>
                                </div>
                            </button>}
                            {openModal && <ModalAlerts heading={heading} message={message} onClose={() => { setOpenModal(false) }} />}
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;