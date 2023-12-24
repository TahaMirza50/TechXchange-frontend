import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApiPrivate from "../hooks/useAPIPrivate";
import HomePageNavbar from "../components/HomePageNavbar";
import img from "../assets/images/arthur-morgan.png"
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { profile } from "../features/userProfile";
import { category } from "../features/categories";

const HomePage = () => {
    const [categories, setCategories] = useState([]);
    const [categoryOne, setCategoryOne] = useState();
    const [categoryTwo, setCategoryTwo] = useState();

    const dispatch = useDispatch();

    const apiPrivate = useApiPrivate();
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProfile = async () => {
            try {
                const response = await apiPrivate.get('profile/get');
                if (isMounted) {
                    console.log(response.data);
                    dispatch(profile(
                        { 
                            firstName: response.data.firstName, 
                            lastName: response.data.lastName, 
                            profileID: response.data._id, 
                            notificationsID: response.data.notificationsID,
                            address: response.data.address,
                            contact: response.data.contact,
                            CNIC: response.data.CNIC,
                            rating: response.data.rating,
                            numberOfReviews: response.data.numberOfReviews,
                            socialMediaLinks: response.data.socialMediaLinks
                        }
                    ));
                }
            } catch (error) {
                console.error(error);
            }
        };

        const getCategories = async () => {
            try {
                const response = await apiPrivate.get('category');
                if (isMounted && response.status === 200) {
                    setCategories(response.data);
                    setCategoryOne(response.data[0].name);
                    setCategoryTwo(response.data[3].name);
                    dispatch(category(response.data));
                }
            } catch (error) {
                console.error(error);
            }
        };

        getProfile();
        getCategories();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [apiPrivate, dispatch]);

    const colors = [
        'bg-blue-700',
        'bg-green-700',
        'bg-yellow-700',
        'bg-red-700',
    ];

    return (
        <div>
            <HomePageNavbar />
            <div className="flex flex-col items-center mx-28">
                <section className="bg-gradient-to-r from-sky-500 to-blue-900 my-10 w-full">
                    <div className="grid max-w-screen-xl px-16 pt-12 mx-auto lg:gap-8 xl:gap-2 lg:pt-12 lg:grid-cols-12">
                        <div className="mr-auto place-self-center lg:col-span-7">
                            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black dark:text-white">Buy and Sell with Ease and Trust</h1>
                            <p className="max-w-2xl mb-6 font-light text-black lg:mb-8 md:text-lg lg:text-xl dark:text-white">Streamline your electronics selling experience effortlessly on our platform. Benefit from simplicity and premium service as you optimize your device's value. With swift listings and interactive chats, our platform guarantees a hassle-free selling journey—no transactions involved. Join now and effortlessly turn your unused electronics into cash!</p>
                        </div>
                        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                            <img src={img} alt="mockup" />
                        </div>
                    </div>
                </section>
                <section className="my-10">
                    <h4 className="text-center text-2xl font-extrabold dark:text-white pb-10">Shop deals by category</h4>
                    <div className="w-full flex flex-wrap justify-center gap-10 ">
                        {categories.map((category, index) => (
                            <CategoryCard key={category._id} category={category} backgroundColor={colors[index % colors.length]} />
                        ))}
                    </div>
                </section>
                <section className="w-full my-10 text-left">
                    <h4 className="text-2xl font-extrabold dark:text-white pb-10">Latest {categoryOne}</h4>
                </section>
                <section className="w-full my-10 text-left">
                    <h4 className="text-2xl font-extrabold dark:text-white pb-10">Latest {categoryTwo}</h4>
                </section>
            </div>

            <button onClick={() => navigate("/admin-dashboard")}>go to admin</button>
            <Footer />
        </div>
    );
}

export default HomePage;
