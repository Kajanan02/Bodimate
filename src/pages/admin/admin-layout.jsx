import React, {useEffect, useState} from 'react';
import {NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';
import Logo from "../../assets/logo.svg";
import FeatherIcon from 'feather-icons-react';
import SideClose from "../../assets/admin-layout/carbon_side-panel-close.svg";
import ProfilePic from "../../assets/admin-layout/DefaultProfile.jpg";
import Msg from "../../assets/admin-layout/msg-icon.svg";
import Bell from "../../assets/admin-layout/bell-icon.svg";
import NotificationBox from './NotificationBox.jsx';
import {useSelector} from "react-redux";

function AdminLayout() {
    const [show, setShow] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [usersDropdown, setUsersDropdown] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('ACCESS_TOKEN');

    const userDetail = useSelector(state => state.userData.userDetails);

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    }, [userDetail]);

    const toggleNotification = () => setShowNotification(!showNotification);

    const closeNotification = () => setShowNotification(false);

    const markAsRead = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications[index].read = true;
        setNotifications(updatedNotifications);
    };

    const markAllRead = () => {
        const updatedNotifications = notifications.map((notification) => ({
            ...notification,
            read: true,
        }));
        setNotifications(updatedNotifications);
    };

    const toggleDrawer = () => setToggle(!toggle);

    const handleBackdropClick = () => {
        if (show) {
            setShow(false);
        }
    };

    const toggleUsersDropdown = () => setUsersDropdown(!usersDropdown);

    const isUsersActive = location.pathname === '/admin/users-boarding-owners' || location.pathname === '/admin/users-students';

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap overflow-auto">
                <div
                    className={(!toggle ? "col-xl-2" : "w-100px") + (!show ? " mobile-navbar-hide" : " mobile-show") + " col-auto col-md-1 px-0 bg-default nav-border-right min-vh-100 trans"}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="bodilogo d-flex align-items-center p-2">
                            <img className="bodilogosvg" src={Logo} alt=""/>
                            {!toggle && <b className="admin-head-text ps-2">Bodimate</b>}
                        </div>
                        <div className="close-btn-container d-flex mobile-hide" onClick={toggleDrawer}>
                            <img src={SideClose} alt="SideClose" className={!!toggle ? "rotate-180" : ""}/>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white pt-4">
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to="/admin" end>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="home" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={'trans-1'}>Home</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/admin/listings"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="list" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Listings</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/admin/bookings"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="book-open" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Bookings</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <div
                                className={`side-menu-item d-flex justify-content-between align-items-center ${isUsersActive ? 'side-menu-active' : ''}`}
                                onClick={toggleUsersDropdown}
                                style={{cursor: "pointer"}}
                            >
                                <div className={'d-flex align-items-center'}>
                                    <FeatherIcon icon="users" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Users</div>}
                                </div>
                                <FeatherIcon className={"users-navlink"}
                                             icon={usersDropdown ? "chevron-down" : "chevron-right"} size={18}/>
                            </div>
                            {usersDropdown && !toggle && (
                                <div className="w-100">
                                    <NavLink
                                        className={({isActive}) => isActive ? "side-menu-item sub-side-menu-active" : "side-menu-item"}
                                        to={"/admin/users-boarding-owners"}>
                                        <div className={'d-flex'}>
                                            <div className={!toggle ? 'ms-4 ps-2' : "ms-1"}>Boarding Owners</div>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={({isActive}) => isActive ? "side-menu-item sub-side-menu-active" : "side-menu-item"}
                                        to={"/admin/users-students"}>
                                        <div className={'d-flex'}>
                                            <div className={!toggle ? 'ms-4 ps-2' : "ms-1"}>Students</div>
                                        </div>
                                    </NavLink>
                                </div>
                            )}
                            {toggle && (
                                <div className="hover-dropdown">
                                    <NavLink
                                        className={({isActive}) => isActive ? "side-menu-item sub-side-menu-active" : "side-menu-item"}
                                        to={"/admin/users/boarding-owners"}>
                                        <div className={'d-flex'}>
                                            <div className={'ms-1'}>Boarding Owners</div>
                                        </div>
                                    </NavLink>
                                    <NavLink
                                        className={({isActive}) => isActive ? "side-menu-item sub-side-menu-active" : "side-menu-item"}
                                        to={"/admin/users/students"}>
                                        <div className={'d-flex'}>
                                            <div className={'ms-1'}>Students</div>
                                        </div>
                                    </NavLink>
                                </div>
                            )}
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/admin/chat-box"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="message-circle" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Chat Box</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/admin/analytics"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="pie-chart" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Analytics</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/admin/payments"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="credit-card" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Payments</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/admin/settings"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="settings" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Settings</div>}
                                </div>
                            </NavLink>
                        </div>
                        <div className={'w-100 border-bottom-d1d1d1 mb-3'}/>
                        <div className={"w-100 px-sm-2"}>
                            <NavLink onClick={()=> localStorage.clear()}
                                className={({isActive}) => isActive ? "side-menu-item side-menu-active" : "side-menu-item"}
                                to={"/login"}>
                                <div className={'d-flex'}>
                                    <FeatherIcon icon="log-out" className={!toggle ? 'me-2' : "ms-1"}/>
                                    {!toggle && <div className={''}>Logout</div>}
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className="col p-0">
                    <nav className="navbar navbar-expand-lg bg-default border-bottom-d1d1d1 px-4">
                        <div className="container-fluid nav-iconSet flex-nowrap">
                            <button className="navbar-toggler" type="button" onClick={() => setShow(!show)}>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="">
                                <ul className="navbar-nav ms-auto align-items-center flex-row">
                                    <li className="admin-nav-item px-2">
                                        <a className="admin-nav-link position-relative" aria-current="page" href="#">
                                            <img src={Msg} alt="Messages"/>
                                        </a>
                                    </li>
                                    <li className="admin-nav-item px-2">
                                        <a className="position-relative p-0" aria-current="page"
                                           href="#">
                                            <img src={ProfilePic} className="rounded-circle user-profile mr-2"
                                                 alt="Profile"/>
                                        </a>
                                    </li>
                                    <li className="admin-nav-item px-2 flex-column nav-profile">
                                        <p className="nav-profileName mb-0">{userDetail?.lastName ||"Guest"}<br/>
                                            <small
                                                className="text-muted mt-0 mb-0 py-0 nav-profileName nav-profileRole">{userDetail?.role ||"Guest"}</small>
                                        </p>
                                    </li>
                                    <li className="nav-item">
                                        <a className="admin-nav-link active position-relative px-2" aria-current="page"
                                           href="#">
                                            <img src={Bell} onClick={toggleNotification} alt="Notifications"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div>
                        {show && (
                            <div
                                className="nav-shadow opacity-25"
                                onClick={handleBackdropClick}
                            />
                        )}
                        <Outlet/>
                    </div>
                </div>
            </div>
            {showNotification && (
                <NotificationBox
                    notifications={notifications}
                    onClose={closeNotification}
                    markAsRead={markAsRead}
                    markAllRead={markAllRead}
                />
            )}
        </div>
    );
}

export default AdminLayout;
