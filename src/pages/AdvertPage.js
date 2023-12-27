import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import HomePageNavbar from "../components/HomePageNavbar";
import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApiPrivate from "../hooks/useAPIPrivate";

const AdvertPage = () => {
    const {id} = useParams();

    const apiPrivate = useApiPrivate();
    const [advert, setAdvert] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
    const [formattedTime, setFormattedTime] = useState("");

    const navigate = useNavigate();
    const user = useSelector((state) => state.userProfile.value);
    const categories = useSelector((state) => state.categories.value);
    const [myAd, setMyAd] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {

        const getAdvert = async () => {
            try {
                console.log(id)
                const response = await apiPrivate.get(`/advert/get/${id}`);
                if (response.status === 200) {
                    setAdvert(response.data);
                    if (user.profileID === response.data.userId) {
                        setMyAd(true);
                    }    
                    setCategoryName(categories.find((category) => category._id === response.data.categoryId));
                    const date = new Date(response.data.timestamp);
                    setFormattedDate(date.toDateString());
                    setFormattedTime(date.toLocaleTimeString());
                }
            } catch (error) {
                console.error(error);
            }
        }

        getAdvert();

    },[apiPrivate,categories,id,user.profileID])

    return (
        <div>
            <HomePageNavbar />
            {advert && <div className="relative flex gap-5 flex-row flex-shrink items-center justify-center  mx-28 my-10">
                <div className="border-2 h-full w-2/3 rounded-md">
                    <div className="flex flex-row h-14 bg-blue-900 rounded-t-md items-center px-5">
                        <svg onClick={() => navigate(-1)} class="w-4 h-4 dark:text-gray-800 text-white hover:text-sky-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                        </svg>
                        <p className="w-full font-bold text-md text-white text-center">{advert.title}</p>
                    </div>
                    <Carousel leftControl={<button type="button" class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                            </svg>
                            <span class="sr-only">Previous</span>
                        </span>
                    </button>}
                        rightControl={<button type="button" class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/30 group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span class="sr-only">Next</span>
                            </span>
                        </button>}
                        className="h-96 border-b-2 p-2">
                        <img className="max-h-full max-w-fit" src={advert.images[0]} alt="..." />
                        <img className="max-h-full max-w-fit" src={advert.images[1]} alt="..." />
                        <img className="max-h-full max-w-fit" src={advert.images[2]} alt="..." />
                    </Carousel>
                    <div className="flex flex-row w-full px-5 py-2 items-center justify-between">
                        {!myAd
                            ? <svg class="w-4 h-4 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                            </svg>
                            : <div></div>}
                        <p className="font-bold text-2xl text-blue-900">Rs. {advert.price}</p>
                    </div>
                    <p className="px-5 font-bold">Description:</p>
                    <p className="px-5">{advert.description}</p>
                    <div className="flex flex-row items-center pt-2 px-5">
                        <p className="font-bold pr-2">Category:</p>
                        <p>{categoryName.name}</p>
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
                    <p className="text-gray-400 px-5 pb-2">{formattedDate + " " + formattedTime}</p>
                </div>
                <div className="border-2 h-full w-1/3 rounded-md">

                </div>
            </div>}
            <Footer />
        </div>
    );
}

export default AdvertPage;