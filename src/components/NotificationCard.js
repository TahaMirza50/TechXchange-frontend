import { Dropdown } from 'flowbite-react';

const NotificationCard = ({notification}) => {
    
    return (
        <Dropdown.Item>{notification.type}</Dropdown.Item>
    );
}

export default NotificationCard;