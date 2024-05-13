import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./pages/auth-ui-components/login.jsx";
import Register from "./pages/auth-ui-components/register.jsx";
import Home from "./pages/home/home.jsx";
import {ToastContainer} from "react-toastify";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
            <ToastContainer />
        </>
    )
}

export default App
