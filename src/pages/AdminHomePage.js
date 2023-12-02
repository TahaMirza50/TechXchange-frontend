import adminProfileImage from '../assets/images/adminProfileimage.png'
import LoggedInNavbar from '../components/LoggedInNavbar'
import img3 from "../assets/images/ps5.png"
import { Fragment } from 'react';

const AdminHomePage = () => {
    return(
        <>
            <LoggedInNavbar name="Admin" profileImage={adminProfileImage}/>
            <div class="flex items-center space-x-8 p-8">
                <a href="#" class="block max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <img src={img3}/>
                    <h5 class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ps5</h5>
                </a>
            
                <a href="#" class="block max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <img src={img3}/>
                    <h5 class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ps5</h5>
                </a>

                <a href="#" class="block max-w-sm  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <img src={img3}/>
                    <h5 class="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ps5</h5>
                </a>
            </div>


            
        </>
    );
}

export default AdminHomePage;