import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import HomePageNavbar from "../components/HomePageNavbar";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApiPrivate from "../hooks/useAPIPrivate";

const AdvertPage = () => {
    const { id } = useParams();

    const apiPrivate = useApiPrivate();
    const [advert, setAdvert] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
    const [formattedTime, setFormattedTime] = useState("");

    const navigate = useNavigate();
    const user = useSelector((state) => state.userProfile.value);
    const categories = useSelector((state) => state.categories.value);
    const [myAd, setMyAd] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {

        const getAdvertAndUser = async () => {
            try {
                const response = await apiPrivate.get(`/advert/get/${id}`);
                if (response.status === 200) {
                    setAdvert(response.data);
                    if (user.profileID === response.data.userId) {
                        setMyAd(true);
                        setUserProfile(user);
                    } else {
                        const responseUser = await apiPrivate.get(`/profile/get/${response.data.userId}`);
                        if (responseUser.status === 200) {
                            setUserProfile(responseUser.data);
                            console.log(responseUser.data);
                        }
                    }
                    setCategoryName(categories?.find((category) => category._id === response.data.categoryId));
                    const date = new Date(response.data.timestamp);
                    setFormattedDate(date.toDateString());
                    setFormattedTime(date.toLocaleTimeString());
                }
            } catch (error) {
                console.error(error);
            }
        }

        getAdvertAndUser();

    }, [apiPrivate, id, user.profileID, user, categories])

    const renderStar = (num) => {
        const stars = [];
        console.log(num)

        for (let i = 1; i <= 5; i++) {
            const starColor = i <= num
                ? "text-yellow-300"
                : "text-gray-500";

            stars.push(
                <svg className={`w-4 h-4 ${starColor} me-1`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            );
        }

        return stars;
    }

    return (
        <div>
            <HomePageNavbar />
            {advert && <div className="relative flex gap-5 flex-row flex-shrink items-start justify-center  mx-28 my-10">
                <div className="border-2 h-full w-2/3 rounded-md">
                    <div className="flex flex-row h-14 bg-blue-900 rounded-t-md items-center px-5">
                        <svg onClick={() => navigate(-1)} class="w-4 h-4 dark:text-gray-800 text-white hover:text-sky-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        <p className="w-full font-bold text-md text-white text-center">{advert.title}</p>
                    </div>
                    <Carousel leftControl={<button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>}
                        rightControl={<button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>}
                        className="h-96 border-b-2 p-2">
                        <img className="max-h-full max-w-fit" src={advert.images[0]} alt="..." />
                        <img className="max-h-full max-w-fit" src={advert.images[1]} alt="..." />
                        <img className="max-h-full max-w-fit" src={advert.images[2]} alt="..." />
                    </Carousel>
                    <div className="flex flex-row w-full px-5 py-2 items-center justify-between">
                        {!myAd
                            ? <svg className="w-4 h-4 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                            </svg>
                            : <div></div>}
                        <p className="font-bold text-2xl text-blue-900">Rs. {advert.price}</p>
                    </div>
                    <p className="px-5 font-bold">Description:</p>
                    <p className="px-5">{advert.description}</p>
                    <div className="flex flex-row items-center pt-2 px-5">
                        <p className="font-bold pr-2">Category:</p>
                        <p>{categoryName?.name}</p>
                    </div>
                    <div className="flex flex-row items-center pt-2 px-5">
                        <p className="font-bold pr-2">Condition:</p>
                        <p>{advert.condition}</p>
                    </div>
                    <div className="flex flex-row items-center pt-2 px-5">
                        <p className="font-bold pr-2">Location:</p>
                        <p>{advert.location}</p>
                    </div>
                    <div className="h-10" />
                    <div className="flex flex-row items-center pb-2 px-5 w-full justify-between">
                        <p className="text-gray-400">{formattedDate + " " + formattedTime}</p>
                        <button className="gap-2 text-red-700 font-bold flex-row flex hover:text-red-900 items-center">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M6 1v4a1 1 0 0 1-1 1H1m14-4v16a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2Z" />
                            </svg>
                            <p>Report Advert</p>
                        </button>
                    </div>
                </div>
                <div className="border-2 h-full w-1/3 rounded-md flex flex-col items-center">
                    <div className="flex flex-row h-14 bg-blue-900 w-full rounded-t-md" />
                    {userProfile &&
                        <div className="my-5 w-11/12 p-5 bg-gray-200 rounded-md">
                            <div className="flex items-center flex-row gap-5">
                                <svg className="w-1/6 h-20 text-blue-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                                <div className="flex flex-col justify-center h-20">
                                    <h2 className="font-bold">{userProfile.firstName} {userProfile.lastName}</h2>
                                    <div className="flex flex-row items-center">
                                        {renderStar(userProfile.rating)}
                                        <p>{userProfile.rating} ({userProfile.numberOfReviews})</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-2 mb-2">
                                <h6 className="text-md font-bold">Contact No:</h6>
                                <p>{userProfile.contact}</p>
                            </div>
                            <h6 className="text-md font-bold">Social Media Links</h6>
                            <div className="flex flex-col">
                                {userProfile.socialMediaLinks.map((link) =>
                                    <a className="hover:text-sky-500 text-sm" target="_blank" rel="noopener noreferrer" href={`${link}`}>{link}</a>
                                )}
                            </div>
                        </div>
                    }
                    {!myAd && <button className="text-white mb-5 w-1/3 font-bold border-2 hover:bg-sky-700 bg-sky-500 py-1 px-1 rounded-xl border-transparent">Chat Now</button>}
                </div>
            </div>}
            <Footer />
        </div>
    );
}

export default AdvertPage;