import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/auth-ui-components/login.jsx";
import Register from "./pages/auth-ui-components/register.jsx";
import Home from "./pages/home/home.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BoardingDetails from "./pages/boarding-details/boarding-details.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/boarding-details" element={<BoardingDetails/>}/>
            </Routes>
            <ToastContainer/>
        </>
    )
}

export default App
