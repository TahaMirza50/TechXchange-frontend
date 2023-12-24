import logo from '../assets/images/logo.png';

const LoggedInNavbar = (props) => {
    const name = props.name;
    const profileImage = props.profileImage;

    return (
        <nav className="fixed top-0 w-full border-gray-200 bg-sky-500 dark:bg-gray-900">
            <div className="max-w-screen-l flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <img src={logo} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TechXchange</span>
                </div>
                <div className="w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium items-center flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-1 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-sky-500 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            {name}
                        </li>
                        <li>
                            <img src={profileImage} className="h-8" alt="Profile" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default LoggedInNavbar;
