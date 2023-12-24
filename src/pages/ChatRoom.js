import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HomePageNavbar from "../components/HomePageNavbar";
import useApiPrivate from "../hooks/useAPIPrivate";
import { useSelector } from "react-redux";
import img from "../assets/images/chats.png"
import { Link } from "react-router-dom";

const ChatRoom = () => {
    const [chats, setChats] = useState([]);
    const [visibleChat, setVisibleChat] = useState([]);
    const [chatView, setChatView] = useState(false);
    const [message, setMessage] = useState("");
    const [deleteChat, setDeleteChat] = useState(false);

    const user = useSelector((state) => state.userProfile.value);

    const apiPrivate = useApiPrivate();

    useEffect(() => {

        let isMounted = true;
        const controller = new AbortController();

        const getChats = async () => {
            try {
                const response = await apiPrivate.get("chatroom");
                if (isMounted && response.status === 200) {
                    setChats(response.data.chatRooms);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getChats()

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [apiPrivate, deleteChat]);

    const handleReloadChat = async () => {
        try {
            const response2 = await apiPrivate.get(`chatroom/advert/${visibleChat.advertId}`);
            setVisibleChat(response2.data);
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (chatView) {
                handleReloadChat();
                console.log("called");
            }
        }, 10000);

        return () => {
            clearInterval(intervalId);
        }
    }, [chatView, visibleChat])

    const handleChatClick = (chat) => {
        setVisibleChat(chat);
        setChatView(true);
        setDeleteChat(false);
    };

    const handleMessages = (msg) => {

        const date = new Date(msg.timestamp);
        const formattedDate = date.toDateString();
        const formattedTime = date.toLocaleTimeString();

        if (user.firstName === msg.userID.firstName && user.lastName === msg.userID.lastName) {
            return (
                <div key={msg._id} className="flex place-items-start gap-2.5 my-5">
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-green-200 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">You</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate + " " + formattedTime}</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg.message}</p>
                    </div>
                    <svg onClick={() => handleDeleteMessage(msg)} className="w-4 h-4 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                    </svg>
                </div>
            )
        } else {
            return (
                <div key={msg._id} className="flex place-items-start justify-end gap-2.5 my-5">
                    <div className="flex flex-col w-full max-w-[320px] p-4 border-gray-200 bg-red-200 rounded-s-xl rounded-ee-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{msg.userID.firstName + " " + msg.userID.lastName}</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{formattedDate + " " + formattedTime}</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{msg.message}</p>
                    </div>
                </div>
            )
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        try {
            await apiPrivate.patch("chatroom/send-message", {
                chatID: visibleChat._id,
                message
            });
            // const response2 = await apiPrivate.get(`chatroom/advert/${response1.data.advertId}`);
            // setVisibleChat(response2.data);
            // setMessage("");
            await handleReloadChat();
        } catch (error) {
            console.log(error);
        }

    }

    const handleDeleteMessage = async (msg) => {
        try {
            await apiPrivate.patch('chatroom/delete-message', {
                messageID: msg._id,
                chatID: visibleChat._id
            });
            // const response2 = await apiPrivate.get(`chatroom/advert/${visibleChat.advertId}`);
            // setVisibleChat(response2.data);
            // setMessage("");
            await handleReloadChat();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteChatroom = async () => {
        try {
            const response = await apiPrivate.delete(`chatroom/delete/${visibleChat._id}`)
            if (response.status === 200) {
                setVisibleChat([])
                setChatView(false)
                setDeleteChat(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Profile</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div className="flex flex-row items-center justify-center px-28 w-full gap-5 my-10">
                <div className="h-full w-full flex flex-col gap-5">
                    <h4 className="text-2xl font-extrabold dark:text-white py-4">Chats</h4>
                    <div className="flex w-full h-96 flex-row gap-5 items-center justify-center">
                        <ul className="w-1/3 h-full text-sm font-medium overflow-y-auto text-gray-900  dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            {
                                chats.map(chat => (
                                    <li key={chat._id} className={`px-4 mb-5 py-2 gap-5 rounded-2xl w-full h-16 border-black border-2 flex flex-row items-center justify-start ${visibleChat._id === chat._id ? 'bg-sky-500' : 'bg-white'} hover:bg-sky-500 border-b-2 dark:border-gray-600`} onClick={() => handleChatClick(chat)} >
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        <p>
                                            {(user.firstName === chat.participants[0].firstName && user.lastName === chat.participants[0].lastName)
                                                ? `${chat.participants[1].firstName} ${chat.participants[1].lastName}`
                                                : `${chat.participants[0].firstName} ${chat.participants[0].lastName}`
                                            }
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="w-2/3 h-full flex items-center justify-center">
                            {chatView
                                ? <div className="w-full h-full rounded-2xl bg-white border-2 border-black">
                                    <div className="h-1/6 bg-blue-900 text-white font-bold rounded-t-2xl px-10 flex flex-row items-center justify-between">
                                        <p>
                                            {(user.firstName === visibleChat.participants[0].firstName && user.lastName === visibleChat.participants[0].lastName)
                                                ? `${visibleChat.participants[1].firstName} ${visibleChat.participants[1].lastName}`
                                                : `${visibleChat.participants[0].firstName} ${visibleChat.participants[0].lastName}`
                                            }
                                        </p>
                                        <div className="flex flex-row gap-3 items-center">
                                            <button className="border-2 hover:bg-sky-700 bg-sky-500 py-1 px-1 rounded-xl border-transparent">Go to ad</button>
                                            {/* <svg onClick={handleReloadChat} class="w-4 h-4 text-white hover:text-green-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
                                            </svg> */}
                                            <svg onClick={handleDeleteChatroom} className="w-4 h-4 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="h-2/3 bg-white overflow-y-auto px-5 w-full flex flex-col-reverse">
                                        {[...visibleChat.messages].reverse().map(msg => (handleMessages(msg)))}
                                    </div>
                                    <form onSubmit={handleSendMessage}>
                                        <label htmlFor="chat" className="sr-only">Your message</label>
                                        {!visibleChat.disabled
                                            ? <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                                                <textarea disabled={visibleChat.disabled} value={message} onChange={(e) => setMessage(e.target.value)} id="chat" rows="1" className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-900 focus:border-blue-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                                                <button type="submit" className="inline-flex justify-center p-2 text-blue-900 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                                    </svg>
                                                    <span className="sr-only">Send message</span>
                                                </button>
                                            </div>
                                            : <div className="flex flex-row justify-center w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                                                <p>Ad has been deleted.</p>
                                            </div>
                                        }

                                    </form>
                                </div>
                                : <img className='h-full' src={img} alt="..." />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ChatRoom;