import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/logo.svg";
import LoginBanner from "../../assets/login-banner.jpeg";
import {Link} from "react-router-dom";

function ForgotPassword() {
    return (
        <div className="container-fluid align-middle">
            <div className="row align-items-center login-container">
                <div
                    className="col-lg-6 col-md-12 login-left bg-white d-flex align-items-center justify-content-center pt-5">
                    <div className="col-lg-6 col-md-12">
                        <div className="row d-flex justify-content-center">
                            <div className="col d-flex align-items-center pb-5">
                                <img src={Logo} alt="Website Logo" className="website-logo"/>
                                <div className="login-head ms-3"><b>Bodimate</b></div>
                            </div>
                        </div>
                        <div className="sign-in-text text-left text-md-left">
                            <p>Forgot Password</p>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">Email</label>
                                <input type="email" className="form-control fw-normal" id="exampleInputEmail1"
                                       placeholder={"Enter email"}
                                       aria-describedby="emailHelp"/>
                            </div>
                            <div className="row pb-3">
                                <div className="col p-2">
                                    <button type={"button"} className="btn login-btn w-100 fw-semibold p-2">Reset
                                        Password
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <Link to="/login"
                                  className={"text-decoration-underline text-backToSign text-center d-flex justify-content-center pb-2 fw-normal"}>Back
                                to Sign In</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 login-right bg-white justify-content-center d-none d-sm-block">
                    <img src={LoginBanner} alt="Login Banner" className="banner-image image-fluid mx-auto"/>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;