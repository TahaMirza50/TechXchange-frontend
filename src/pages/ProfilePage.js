import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import HomePageNavbar from "../components/HomePageNavbar";
import { useSelector } from "react-redux";

const ProfilePage = () => {

    // const [profile, setProfile] = useState({});
    // const apiPrivate = useApiPrivate();

    const user = useSelector((state) => state.userProfile.value);


    // useEffect(() => {
    //     let isMounted = true;
    //     const controller = new AbortController();

    //     const getProfile = async () => {
    //         try {
    //             const response = await apiPrivate.get(`profile/get/${user.profileID}`);
    //             if (isMounted) {
    //                 setProfile(response.data);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     getProfile();


    //     return () => {
    //         isMounted = false;
    //         controller.abort();
    //     };

    // }, [apiPrivate,user.profileID])

    const renderStar = (num) => {
        const stars = [];

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
            <div className="flex mx-28 my-10 flex-col gap-10">
                <nav aria-label="Breadcrumb">
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
                                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Profile</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="w-full flex flex-row rounded-xl bg-gray-200 mb-10 py-10 px-10">
                    <div className="w-1/3">
                        <svg className="mx-16 my-5 text-blue-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <h4 className="text-2xl font-bold dark:text-white text-center">{user.firstName + " " + user.lastName}</h4>
                    </div>
                    <div className="w-2/3 m-9 dark:text-white">
                        <h6 className="text-lg font-bold">Address</h6>
                        <p className="pb-5">{user.address}</p>
                        <div className="flex w-full pb-5 flex-row">
                            <div className="w-1/2">
                                <h6 className="text-lg font-bold">CNIC</h6>
                                <p>{user.CNIC}</p>
                            </div>
                            <div className="w-1/2">
                                <h6 className="text-lg font-bold">Contact No.</h6>
                                <p>{user.contact}</p>
                            </div>
                        </div>
                        <h6 className="text-lg font-bold">Rating</h6>
                        {user.rating === null
                            ? <p className="pb-5 text-gray-500">user not rated yet</p>
                            : <div className="flex pb-5 flex-row items-center">
                                {renderStar(user.rating)}
                                <p>{user.rating} ({user.numberOfReviews})</p>
                            </div>
                        }
                        <h6 className="text-lg font-bold">Social Media</h6>
                        <div className="flex flex-col">
                        {user.socialMediaLinks.map((link) => 
                            <a className="hover:text-sky-500" target="_blank" rel="noopener noreferrer" href={`${link}`}>{link}</a>
                        )}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;