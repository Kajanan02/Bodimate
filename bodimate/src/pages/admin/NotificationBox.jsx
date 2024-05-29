import React, {useState, useEffect, useRef} from 'react';
import FeatherIcon from 'feather-icons-react';
import DefaultProfilePic from "../../assets/admin-layout/DefaultProfile.jpg";

function NotificationBox() {
    const [expanded, setExpanded] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            profilePic: DefaultProfilePic,
            topic: 'John Doe',
            text: 'A new message from John Doe.',
            time: '10:30 AM',
            read: false,
            date: new Date()
        },
        {
            id: 2,
            topic: 'Jane Smith',
            profilePic: DefaultProfilePic,
            text: 'Boarding request received for Jane Smith.',
            time: '11:45 AM',
            read: true,
            date: new Date()
        },
        {
            id: 3,
            topic: 'Michael Johnson',
            profilePic: DefaultProfilePic,
            text: 'Boarding confirmation for Michael Johnson.',
            time: '12:15 PM',
            read: false,
            date: new Date(new Date().setDate(new Date().getDate() - 1)) // Yesterday
        },
        {
            id: 4,
            topic: 'Matthew Martinez',
            profilePic: DefaultProfilePic,
            text: 'Boarding confirmation for Matthew Martinez.',
            time: '1:00 PM',
            read: true,
            date: new Date(new Date().setDate(new Date().getDate() - 1)) // Yesterday
        },
        {
            id: 5,
            topic: 'Olivia Anderson',
            profilePic: DefaultProfilePic,
            text: 'Boarding request received for Olivia Anderson.',
            time: '2:30 PM',
            read: true,
            date: new Date(new Date().setDate(new Date().getDate() - 2)) // Day Before Yesterday
        },
        {
            id: 6,
            topic: 'Emma Taylor',
            profilePic: DefaultProfilePic,
            text: 'New message from Emma Taylor.',
            time: '3:15 PM',
            read: false,
            date: new Date(new Date().setDate(new Date().getDate() - 2)) // Day Before Yesterday
        },
        {
            id: 7,
            topic: 'Daniel Thomas',
            profilePic: DefaultProfilePic,
            text: 'Boarding confirmation for Daniel Thomas.',
            time: '4:00 PM',
            read: true,
            date: new Date(new Date().setDate(new Date().getDate() - 3)) // 3 days ago
        },
    ]);

    const formatDate = (date) => {
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);

    const dates = [
        {date: today, label: "Today"},
        {date: yesterday, label: "Yesterday"},
        {date: dayBeforeYesterday, label: formatDate(dayBeforeYesterday)}
    ];

    const groupedNotifications = dates.map(dateObj => {
        return {
            date: dateObj.label,
            notifications: notifications.filter(notification => {
                const notificationDate = new Date(notification.date);
                return notificationDate.toDateString() === dateObj.date.toDateString();
            })
        };
    });

    const otherNotifications = notifications.filter(notification => {
        const notificationDate = new Date(notification.date);
        return !dates.some(dateObj => notificationDate.toDateString() === dateObj.date.toDateString());
    });

    if (otherNotifications.length > 0) {
        groupedNotifications.push({
            date: "Earlier",
            notifications: otherNotifications
        });
    }

    const notificationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeNotificationBox = () => {
        setIsVisible(false);
    };

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({...notification, read: true}));
        setNotifications(updatedNotifications);
    };

    if (!isVisible) return null;

    const unreadCount = notifications.filter(notification => !notification.read).length;

    return (
        <div ref={notificationRef} className="notification-box">
            <div className="notification-header d-flex align-items-center justify-content-between">
                <div>
                    <p className={"notification-box-heading fw-bold m-0"}>Notifications</p>
                </div>
                <div>
                    <button className="mark-all-read-button fw-medium pe-3" title="Mark All as Read"
                            onClick={markAllAsRead}>
                        Mark All Read
                    </button>
                    <FeatherIcon icon="x" className={"notification-box-close"} onClick={closeNotificationBox}/>
                </div>
            </div>
            <ul className="notification-list">
                {groupedNotifications.map((group, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                        <li className="notification-date-heading fw-medium">{group.date}</li>
                        {group.notifications.map((notification, index) => (
                            <li key={notification.id} className={`pb-2 ${notification.read ? 'read' : 'unread'}`}>
                                <div className="notification-item row d-flex px-2 py-2">
                                    <div className="col-2 d-flex align-items-center">
                                        <img src={notification.profilePic || DefaultProfilePic}
                                             className="rounded-circle notification-user-profile" alt="Profile"/>
                                    </div>
                                    <div className="col-10">
                                        <div className="row ps-2">
                                            <div className="col-8 p-0">
                                                <p className="notification-heading m-0 fw-medium">{notification.topic}</p>
                                            </div>
                                            <div className="col-4">
                                                <p className="notification-time m-0 fw-medium text-end">{notification.time}</p>
                                            </div>
                                        </div>
                                        <div className="row ps-2">
                                            <div className="col-11 notification-content p-0">
                                                <div
                                                    className={`notification-text fw-medium ${expanded[index] ? 'expanded' : ''}`}>
                                                    {notification.text.length > 30 ? `${notification.text.slice(0, 30)}...` : notification.text}
                                                </div>
                                            </div>
                                            {!notification.read && (
                                                <div
                                                    className="col-1 m-0 d-flex align-items-center justify-content-center pe-4">
                                                    <div className="message-count-circle p-2">
                                                        {unreadCount}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
}

export default NotificationBox;
