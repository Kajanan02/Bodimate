import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes, useLocation} from "react-router-dom";
import Login from "./pages/auth-ui-components/login.jsx";
import Register from "./pages/auth-ui-components/register.jsx";
import Home from "./pages/home/home.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BoardingDetails from "./pages/boarding-details/boarding-details.jsx";
import ForgotPassword from "./pages/auth-ui-components/forgot-password.jsx";
import Layout from "./components/layout/layout.jsx";
import AdminLayout from "./pages/admin/admin-layout.jsx";
import AddBoarding from "./pages/add-boarding/add-boarding.jsx";
import ExploreNearbyUniversities from "./pages/explore-nearby-university/explore-nearby-universities.jsx";
import Settings from "./pages/settings/settings.jsx";
import {useEffect} from "react";
import ChatBox from "./pages/admin/chatbox/chat-box.jsx";
import NearbyUniversity from "./pages/nearby-university/nearby-university.jsx";
import AdminHome from "./pages/admin/home/admin-home.jsx";
import AdminListings from "./pages/admin/listings/admin-listings.jsx";
import ContactUs from "./pages/contact-us/contact-us.jsx";
import AdminBookings from "./pages/admin/bookings/admin-bookings.jsx";
import AdminBoardingOwners from "./pages/admin/users/admin-boarding-owners/admin-boarding-owners.jsx";
import AdminStudents from "./pages/admin/users/admin-students/admin-students.jsx";
import AdminPayments from "./pages/admin/payments/admin-payments.jsx";
import Loader from "./components/loader.jsx";
import AdminSetting from "./pages/admin/setting/admin-Setting.jsx";
import Analytics from "./pages/admin/analytics/analytics.jsx";
import ConfirmationDialog from "./components/confirmation-dialog.jsx";
import Register_Now from "./pages/Bodimate-your-home/bodimte-register-now.jsx";
import Owner_Register from "./pages/Bodimate-your-home/bodimate-owner-register.jsx";
import {AccountCategory, Payhere} from "@payhere-js-sdk/client";
import {useDispatch} from "react-redux";
import {userUpdate} from "./redux/features/userDataSlice.js";
import PaymentComplete from "./pages/payment-complete/payment-complete.jsx";
import Contact from "./pages/admin/contact/contact.jsx";

Payhere.init(import.meta.env.VITE_REACT_APP_PAYHERE_MERCHANT_ID, AccountCategory.SANDBOX);


function App() {

    const location = useLocation()
    const userDetails = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    useEffect(() => {
        if(userDetails){
            dispatch(userUpdate(userDetails))
        }
    }, [userDetails]);

    return (
        <>
            <Routes>

                <Route  path="/" element={<Layout/>}>
                    <Route  path="" element={<Home/>}/>
                    <Route path="boarding-details/:id" element={<BoardingDetails/>}/>
                    <Route path="add-boarding" element={<AddBoarding/>}/>
                    <Route path="nearby-universities" element={<ExploreNearbyUniversities/>}/>
                    <Route path="/nearby-university/:universityName" element={<NearbyUniversity />} />
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="contact-us" element={<ContactUs/>}/>
                    <Route path="payment-complete" element={<PaymentComplete/>}/>

                </Route>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="" element={<AdminHome/>}/>
                    <Route path="listings" element={<AdminListings/>}/>
                    <Route path="bookings" element={<AdminBookings/>}/>
                    <Route path="users-boarding-owners" element={<AdminBoardingOwners/>}/>
                    <Route path="users-students" element={<AdminStudents/>}/>
                    <Route path="payments" element={<AdminPayments/>}/>
                    <Route path="chat-box" element={<ChatBox/>}/>
                    <Route path="settings" element={<AdminSetting/>}/>
                    <Route path="analytics" element={<Analytics/>}/>
                    <Route path="contact" element={<Contact/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/bodimate-register-now" element={<Register_Now/>}/>
                <Route path="/bodimate-owner-register" element={<Owner_Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="*" element={<h1 className={"text-center "}>404 Not Found</h1>}/>
            </Routes>
            <ToastContainer/>
            <Loader/>
            <ConfirmationDialog/>
        </>
    )
}

export default App