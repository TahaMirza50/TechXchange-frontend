import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApiPrivate from "../hooks/useAPIPrivate";
import { wishlist } from "../features/userProfile";

const AdvertCard = ({ advert, setUserAction, onHomePage }) => {

    const user = useSelector((state) => state.userProfile.value);
    const dispatch = useDispatch();
    
    const [myAd, setMyAd] = useState(false);
    const [status, setStatus] = useState("");
    const [wishListed, setWishListed] = useState(false);
    const navigate = useNavigate();

    const apiPrivate = useApiPrivate();

    useEffect(() => {
        if (user.wishlist.includes(advert._id))
            setWishListed(true);
        else
            setWishListed(false);
        if (user.profileID === advert.userId) {
            setMyAd(true);
            if (advert.sold)
                setStatus("sold");
            else
                setStatus(advert.status);
        }
    }, [advert, user])

    const date = new Date(advert.timestamp);
    const formattedDate = date.toDateString();
    const formattedTime = date.toLocaleTimeString();

    const handleSold = async () => {
        try {
            const response = await apiPrivate.patch(`advert/mark-sold/${advert._id}`);
            if (response.status === 200)
                setUserAction();
        } catch (error) {
            console.error(error);
        }
    }

    const addToWishlist = async () => {
        const newWishlist = [...user.wishlist, advert._id];
        dispatch(wishlist(newWishlist));
    }

    const removeFromWishlist = async () => {
        const newWishlist = user.wishlist.filter((item) => item !== advert._id);
        dispatch(wishlist(newWishlist));
    }

    return (
        <div className="flex-col flex items-center flex-shrink-0">
            <div className="border-2 border-gray-200 w-64 h-112 mb-2 rounded-md flex flex-col items-center justify-start hover:shadow-md hover:shadow-gray-400">
                <img className="h-1/2 p-2" src={advert.images[0]} alt="title"></img>
                <line className="h-0.5 w-full bg-gray-200" />
                <div className="flex flex-row w-full items-center my-4">
                    <p className="font-bold text-xl pl-4 w-full text-blue-900">Rs. {advert.price}</p>
                    {myAd ||
                        (wishListed ?
                            <svg onClick={removeFromWishlist} class="w-5 h-5 mx-4 text-red-700 dark:text-white hover:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                            </svg>
                            :
                            <svg onClick={addToWishlist} class="w-5 h-5 mx-4 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                            </svg>
                        )}
                </div>
                <div className="flex w-full px-4 justify-start flex-row items-center">
                    <button onClick={() => navigate(`/advert/${advert._id}`)} disabled={status === "in review" || status === "rejected" || status === "sold"} className="text-left hover:underline hover:text-sky-700">{advert.title}</button>
                </div>
                {/* <button disabled={status === "in review" || status === "rejected" || status === "sold"} onClick={() => navigate(`/advert/${advert._id}`)}><p className="w-full font-bold text-lg">{advert.title}</p></button> */}
                <p className="w-full text-sm px-4 my-2 font-extralight ">{advert.location}</p>
                {!onHomePage && myAd && <p className="w-full text-sm text-center font-bold text-red-600">{status}</p>}
                <div className="flex flex-col flex-grow"></div>
                <p className="w-full mb-2 px-4 text-right text-sm">{formattedDate + " " + formattedTime}</p>
            </div>
            {!onHomePage && myAd && <button disabled={status === "rejected" || status === "in review" || status === "sold"} onClick={handleSold} className={`mt-2 p-2 ${(status === "approved") ? 'bg-red-600 hover:bg-red-900' : 'bg-red-400'}  rounded-md text-white`}>Mark as sold</button>}
        </div>
    );
}

export default AdvertCard;