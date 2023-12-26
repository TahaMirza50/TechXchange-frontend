import { Dropdown } from 'flowbite-react';

const NotificationCard = ({ notification, deleteNotification }) => {

    const date = new Date(notification.timestamp);
    const formattedDate = date.toDateString();
    const formattedTime = date.toLocaleTimeString();

    const notificationType = () => {
        switch (notification.type) {
            case 'message_received':
                return <div className='flex flex-row h-2/3 w-full items-center justify-center'>
                    <span className="h-full w-1/3 text-2xl text-center" role="img" aria-label='happy-face'>
                        😛
                    </span>
                    <p className='w-2/3 pl-3'>You have received a message.</p>
                </div>
            case 'add_approved':
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <span className="h-full w-1/3 text-2xl text-center" role="img" aria-label='love-face'>
                        😍
                    </span>
                    <p className='w-2/3 pl-3'>Your ad has been approved.</p>
                </div>;
            case 'add_rejected':
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <span className="h-full w-1/3 text-2xl text-center" role="img" aria-label='happy-face'>
                        😕
                    </span>
                    <p className='w-2/3 pl-3'>Your ad has been rejected.</p>
                </div>;
            case 'fav_add_sold':
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <span className="h-full w-1/3 text-2xl text-center" role="img" aria-label='happy-face'>
                        😥
                    </span>
                    <p className='w-2/3 pl-3'>One of your favorite ad is sold.</p>
                </div>;
            default:
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <span className="h-full w-1/3 text-2xl text-center" role="img" aria-label='happy-face'>
                        🙂
                    </span>
                    <p className='w-2/3 pl-3'>You have received a notification.</p>
                </div>;
        }
    }

    return (
        <div>
            <Dropdown.Item className='text-start h-18'>{notificationType()}</Dropdown.Item>
            <div className='flex flex-row w-full items-center gap-2 justify-between px-2'>
                <p className='text-gray-500 text-sm'>{formattedDate + " " + formattedTime}</p>
                <svg onClick={() => { deleteNotification(notification._id) }} className="w-3 h-3 mr-2 text-gray-800 dark:text-white hover:text-red-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                </svg>
            </div>
            <Dropdown.Divider className='bg-gray-200' />
        </div>
    )
}

export default NotificationCard;