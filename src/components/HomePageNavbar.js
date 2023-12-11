import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png'
import { useSelector } from 'react-redux';

const HomePageNavbar = () => {

    const user = useSelector((state) => state.userProfile.value);

    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
    }

    return (<div>
        <nav className=" border-gray-200 bg-sky-500 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between mx-28 p-4 h-24">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TechXchange</span>
                </div>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-sky-500 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <button style={{
                                borderTopColor: 'red',
                                borderRightColor: 'yellow',
                                borderBottomColor: 'blue',
                                borderLeftColor: 'green', // or specify a color for the left border
                            }} className="gap-1 relative inline-flex items-center justify-center p-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full border-4 group bg-white hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-200 dark:text-white dark:hover:text-gray-900 focus:ring-0 focus:outline-none">
                                <p>Create Ad</p>
                                <svg className="w-2 h-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </li>
                        <div className="flex items-center">
                            <li>
                                <Link to="/profile" className=" block py-2 px-3 text-gray-900 rounded hover:text-white dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-white md:p-0 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-gray-700 md:dark:hover:bg-transparent">
                                    <div className='flex gap-1 items-center'>
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z" />
                                        </svg>
                                        <p>{user.firstName}</p>
                                    </div>
                                </Link>
                            </li>
                        </div>
                        <div className="flex items-center">
                            <li>
                                <a href="/" onClick={handleLogOut} className=" block py-2 px-3 text-gray-900 rounded hover:text-red-700 dark:text-white hover:bg-red-700 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 md:dark:hover:text-red-700 dark:hover:bg-red-700 dark:hover:text-red-700 md:dark:hover:bg-transparent">
                                    <div className='flex gap-1 items-center'>
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
                                        </svg>
                                        <p>Logout</p>
                                    </div>
                                </a>
                            </li>
                        </div>
                        <div className='flex items-center'>
                            <button className="notification-btn">
                                <svg className="w-5 h-5 text-gray-800 dark:text-white hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z" />
                                </svg>
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        <nav className="bg-blue-900 dark:bg-gray-700">
            <div className="flex flex-wrap items-center justify-between mx-28 p-4">
                <div className='w-1/2'>
                    <form>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Adverts" required />
                            <button type="submit" className="text-white absolute end-1 bottom-1 top-1 right-1 bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-xs px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-row items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <Link to="#" className="text-white dark:text-white hover:text-sky-500" aria-current="page">My Adverts</Link>
                        </li>
                        <li>
                            <Link to="/chats" className="text-white dark:text-white hover:text-sky-500">My Chats</Link>
                        </li>
                        <li>
                            <Link to="#" className="text-white dark:text-white hover:text-sky-500">My Wishlist</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </div>

    );
}

export default HomePageNavbar;
