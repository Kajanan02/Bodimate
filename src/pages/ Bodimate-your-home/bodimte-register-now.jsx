import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/logo.svg";
import LoginBanner from "../../assets/login-banner.jpeg";
import { Link, useNavigate } from "react-router-dom";

function Register_Now() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Function to handle button click and navigate to the path
    const handleRegisterClick = () => {
        navigate("/bodimate-owner-register"); // Navigate to the desired path
    };

    return (
        <div className="container-fluid align-middle">
            <div className="row align-items-center login-container">
                <div className="col-lg-6 col-md-12 login-left bg-white d-flex align-items-center justify-content-center pt-5">
                    <div className="col-lg-6 col-md-12">
                        <div className="row d-flex justify-content-center">
                            <div className="col d-flex align-items-center pb-5">
                                <img src={Logo} alt="Website Logo" className="website-logo" />
                                <div className="login-head ms-3"><b>Bodimate</b></div>
                            </div>
                        </div>
                        <div className="sign-in-text text-left text-md-left">
                            <h2>Sign Up</h2>
                        </div>
                        <div className="sign-in-para text-left text-md-left pb-3">
                            <p className={"fw-normal"}>If you already have an account, you can</p>
                            <p className={"fw-normal"}>
                                <Link to="/login" className={"text-register text-decoration-none fw-semibold"}> Login here!</Link>
                            </p>
                        </div>

                        <div className="additional-info text-left text-md-left pb-3">
                            <p className={"fw-normal"}>As a Bodimate boarding owner, you can enjoy:</p>
                            <ul>
                                <li>Access to a wide range of potential guests</li>
                                <li>Easy management of bookings and reservations</li>
                                <li>24/7 support for all your inquiries</li>
                                <li>Promotional tools to enhance your visibility</li>
                            </ul>
                            <p className={"fw-normal"}>Join us today and start your journey with Bodimate!</p>
                        </div>

                        <div className="row">
                            <div className="col p-2">
                                <button type={"button"} className="btn login-btn w-100 fw-semibold p-2"
                                        onClick={handleRegisterClick}>
                                    Register Now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 login-right bg-white justify-content-center d-none d-sm-block">
                    <img src={LoginBanner} alt="Login Banner" className="banner-image image-fluid mx-auto" />
                </div>
            </div>
        </div>
    );
}

export default Register_Now;
