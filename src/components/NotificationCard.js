import { Dropdown } from 'flowbite-react';

const NotificationCard = ({ notification, deleteNotification }) => {

    const date = new Date(notification.timestamp);
    const formattedDate = date.toDateString();
    const formattedTime = date.toLocaleTimeString();

    const notificationType = () => {
        switch (notification.type) {
            case 'message_received':
                return <div className='flex flex-row h-2/3 w-full items-center justify-center'>
                    <svg class="w-1/3 h-6 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.5 6.5h.01m4.49 0h.01m4.49 0h.01M18 1H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    <p className='w-2/3 pl-3'>You have received a message.</p>
                </div>
            case 'add_approved':
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <svg class="w-1/3 h-6 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className='w-2/3 pl-3'>Your ad has been approved.</p>
                </div>;
            case 'add_rejected':
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <svg class="w-1/3 h-6 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className='w-2/3 pl-3'>Your ad has been rejected.</p>
                </div>;
            case 'fav_add_sold':
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <svg class="w-1/3 h-6 text-center text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 12 5.419 3.871A1 1 0 0 0 16 15.057V2.943a1 1 0 0 0-1.581-.814L9 6m0 6V6m0 6H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h7m-5 6h3v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Zm15-3a3 3 0 0 1-3 3V6a3 3 0 0 1 3 3Z" />
                    </svg>
                    <p className='w-2/3 pl-3'>One of your favorite ad is sold.</p>
                </div>;
            default:
                return <div className='flex flex-row h-full w-full items-center justify-center'>
                    <svg class="w-1/3 text-center h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9.046 3.59-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.77c.439 2.344 2.383 2.587 2.599 3.76.11.586.22 1.171-.309 1.271L5 17.101c-.529.1-.639-.488-.749-1.074-.219-1.172 1.506-2.102 1.067-4.447l-.331-1.769a5.338 5.338 0 0 1 4.059-6.22Zm-7.13 4.602a8.472 8.472 0 0 1 2.17-5.048m2.646 13.633A3.472 3.472 0 0 0 13.46 16l.089-.5-6.817 1.277Z" />
                    </svg>
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