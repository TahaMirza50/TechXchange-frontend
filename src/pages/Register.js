import { useState } from 'react';
import logo from '../assets/images/logo.png';
import {api} from "../services/api";
import ModalAlerts from "../components/ModalAlerts";

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [CNIC, setCNIC] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [contact, setContact] = useState('');
    const [link1, setLink1] = useState('');
    const [link2, setLink2] = useState('');
    const [link3, setLink3] = useState('');
    const [isPending, setIsPending] = useState(false);

    const [openModal, setOpenModal] = useState(false);
    const [heading, setHeading] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setIsPending(false);
            setHeading("Error");
            setMessage("Please, confirm your password.");
            setOpenModal(true);
            return;
        }
        console.log(firstName, lastName, CNIC, email, password, confirmPassword, address, birthday, contact, link1, link2, link3);
        try {
            setIsPending(true);
            await api.post("/auth/register", {
                email,
                password,
                firstName,
                lastName,
                address,
                contact,
                CNIC,
                birthday,
                socialMediaLinks: [link1, link2, link3]
            }).then((res) => {
                if (res.status === 201) {
                    setHeading("Success");
                    setMessage("Account successfully created. Go back to login page.");
                    setOpenModal(true);
                    setIsPending(false);
                }
            });
        } catch (error) {
            setIsPending(false);
            setHeading("Error");
            setMessage(error.response.data);
            setOpenModal(true);
        }
    }

    return (
        <section class="bg-gray-200 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
                    TechXchange
                </a>
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                            <div class="flex flex-row gap-4">
                                <div className='w-2/3 space-y-4 md:space-y-6'>
                                    <div class="flex flex-row gap-4">
                                        <div className="w-1/2">
                                            <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
                                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Alex" required />
                                        </div>
                                        <div className="w-1/2">
                                            <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
                                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Smith" required />
                                        </div>
                                    </div>
                                    <div class="flex flex-row gap-4">
                                        <div className="w-1/2">
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="name@company.com" required />
                                        </div>
                                        <div className="w-1/2">
                                            <label for="CNIC" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your CNIC</label>
                                            <input value={CNIC} onChange={(e) => setCNIC(e.target.value)} type="tel" name="CNIC" id="CNIC" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="00000-0000000-0" pattern="[0-9]{5}-[0-9]{7}-[0-9]{1}" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <div className="w-1/2">
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                                        </div>
                                        <div className="w-1/2">
                                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your address</label>
                                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" placeholder="Street Address, City, State, ZIP Code" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                                    </div>
                                </div>
                                <div class="w-1/3">
                                    <div className="flex flex-col space-y-4 md:space-y-6">
                                        <div>
                                            <label for="birthday" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your birthday</label>
                                            <input value={birthday} onChange={(e) => setBirthday(e.target.value)} type="date" name="birthday" id="birthday" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                                        </div>
                                        <div>
                                            <label for="contact" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your contact number</label>
                                            <input value={contact} onChange={(e) => setContact(e.target.value)} type="tel" name="contact" id="contact" placeholder="0300-XXXXXXX" pattern="[0-9]{4}-[0-9]{7}" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                                        </div>
                                        <div>
                                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your social-media links</label>
                                            <input value={link1} onChange={(e) => setLink1(e.target.value)} type="url" name="link1" id="link1" placeholder="https://www.facebook.com/yourusername" class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" required />
                                            <input value={link2} onChange={(e) => setLink2(e.target.value)} type="url" name="link2" id="link2" placeholder="https://www.instagram.com/yourusername" class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
                                            <input value={link3} onChange={(e) => setLink3(e.target.value)} type="url" name="link3" id="link3" placeholder="https://www.x.com/yourusername" class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {!isPending && <button type="submit" class="w-full h-12 text-white bg-sky-500 hover:bg-sky-700 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>}
                            {isPending && <button disabled type="submit" class="w-full h-12 text-white bg-sky-500 font-medium rounded-lg px-5 py-2.5 dark:bg-primary-600">
                                <div className="flex items-center justify-center">
                                    <div className="border-t-4 border-white border-solid rounded-full h-8 w-8 animate-spin"></div>
                                </div>
                            </button>}
                            {openModal && <ModalAlerts heading={heading} message={message} onClose={() => { setOpenModal(false) }} />}
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;