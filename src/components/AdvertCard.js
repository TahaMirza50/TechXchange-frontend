import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApiPrivate from "../hooks/useAPIPrivate";

const AdvertCard = ({ advert, setUserAction, onHomePage }) => {

    const navigate = useNavigate()
    const user = useSelector((state) => state.userProfile.value);
    const [myAd, setMyAd] = useState(false);
    const [status, setStatus] = useState("");

    const apiPrivate = useApiPrivate();

    useEffect(() => {
        console.log(user.profileID, advert.userId)
        if (user.profileID === advert.userId) {
            setMyAd(true);
            if (advert.sold)
                setStatus("sold");
            else
                setStatus(advert.status);
        }
    }, [user, advert.userId, advert.status, advert.sold])

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

    return (
        <div className="flex-col flex items-center">
            <button disabled={status === "in review" || status === "rejected" || status === "sold"} onClick={() => navigate(`/advert/${advert._id}`)} className="border-2 text-left w-60 h-112 m-1 flex flex-col flex-shrink-0 rounded-md items-center hover:shadow-md hover:shadow-gray-400">
                <img className="h-1/2 m-2 border-b-2" src={advert.images[0]} alt="title"></img>
                <div className="flex flex-row w-full items-center p-2">
                    <p className="font-bold text-lg w-full text-blue-900">Rs. {advert.price}</p>
                    {myAd || <svg class="w-4 h-4 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                    </svg>}
                </div>
                <p className="w-full pb-2 px-2">{advert.title}</p>
                <p className="w-full text-sm font-extralight pb-2 px-2">{advert.location}</p>
                {!onHomePage && myAd && <p className="w-full text-sm text-center font-bold text-red-600">{status}</p>}
                <div className="flex flex-col flex-grow"></div>
                <p className="w-full  text-right text-sm pb-2 px-2">{formattedDate + " " + formattedTime}</p>
            </button>
            {!onHomePage && myAd && <button disabled={status === "rejected" || status === "in review" || status === "sold"} onClick={handleSold} className={`mt-2 p-2 ${(status === "approved")? 'bg-red-600 hover:bg-red-900' : 'bg-red-400'}  rounded-md text-white`}>Mark as sold</button>}
        </div>
    );
}

export default AdvertCard;