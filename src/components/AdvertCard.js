import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdvertCard = ({ advert }) => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.userProfile.value);
    const [myAd, setMyAd] = useState(false);

    useEffect(() => {
        console.log(user.profileID, advert.userId)
        if(user.profileID === advert.userId) {
            setMyAd(true);
        }
    },[user,advert.userId])

    const date = new Date(advert.timestamp);
    const formattedDate = date.toDateString();
    const formattedTime = date.toLocaleTimeString();

    return (
        <div onClick={() => navigate(`/advert/${advert._id}`)} className="border-2 w-60 h-96 m-1 flex flex-col flex-shrink-0 rounded-md items-center hover:shadow-md hover:shadow-gray-400">
            <img className="h-1/2 m-2 border-b-2" src={advert.images[0]} alt="title"></img>
            <div className="flex flex-row w-full items-center p-2">
                <p className="font-bold text-lg w-full text-blue-900">Rs. {advert.price}</p>
                {myAd || <svg class="w-4 h-4 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                </svg>}
            </div>
            <p className="w-full pb-2 px-2">{advert.title}</p>
            <p className="w-full text-sm font-extralight pb-2 px-2">{advert.location}</p>
            <div className="flex flex-col flex-grow"></div>
            <p className="w-full  text-right text-sm pb-2 px-2">{formattedDate + " " + formattedTime}</p>
        </div>
    );
}

export default AdvertCard;