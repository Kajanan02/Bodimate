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
import ExploreNearbyUniversities from "./pages/Explore nearby universities/explore-nearby-universities.jsx";
import Settings from "./pages/settings/settings.jsx";
import {useEffect} from "react";
import NearbyUniversity from "./pages/nearby-university/nearby-university.jsx";

function App() {

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    return (
        <>
            <Routes>
                <Route  path="/" element={<Layout/>}>
                    <Route  path="" element={<Home/>}/>
                    <Route path="boarding-details" element={<BoardingDetails/>}/>
                    <Route path="add-boarding" element={<AddBoarding/>}/>
                    <Route path="nearby-universities-Collection" element={<ExploreNearbyUniversities/>}/>
                    <Route path="nearby-universities" element={<NearbyUniversity/>}/>
                    <Route path="settings" element={<Settings/>}/>
                </Route>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route path="home" element={<Home/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="*" element={<h1 className={"text-center "}>404 Not Found</h1>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
