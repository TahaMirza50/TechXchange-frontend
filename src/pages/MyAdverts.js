import React, { useEffect, useState } from 'react';
import HomePageNavbar from '../components/HomePageNavbar';
import Footer from '../components/Footer';
import useApiPrivate from '../hooks/useAPIPrivate';
import AdvertCard from '../components/AdvertCard';
import { Link } from "react-router-dom";

function MyAdverts() {
    const apiPrivate = useApiPrivate();
    const [adverts, setAdverts] = useState([]);

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();
        
        const getmyAds = async () => {
            try {
                const res = await apiPrivate.get('advert/get');
                if (isMounted && res.status === 200) {
                    setAdverts(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getmyAds();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <div>
            <HomePageNavbar />
            <nav className="flex mx-28 my-10" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-sky-500 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">My Advertisements</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <h1 className="font-bold text-3xl mb-4 ml-20 mt-10">My Advertisements</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-20 mb-10">
                {adverts.length === 0 
                ? (
                    <p>No Adverts</p>
                ) 
                : (
                    adverts.map((advert, index) => (
                        <AdvertCard key={index} advert={advert} />
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}

export default MyAdverts;
