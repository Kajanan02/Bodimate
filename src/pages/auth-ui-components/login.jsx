import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/logo.svg";
import LoginBanner from "../../assets/login-banner.jpeg";
import FeatherIcon from 'feather-icons-react';
import {Link, useNavigate} from "react-router-dom";
import {validateLogin} from "../../utils/validation.js";
import FormHandler from "react-form-buddy";
import axiosInstance from "../../utils/axiosInstance.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {loadCredential, navigationDefault} from "../../utils/Authentication.js";
import {setLoading} from "../../redux/features/loaderSlice.js";
import {userUpdate} from "../../redux/features/userDataSlice.js";

function Login() {


    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleChange,
        handleSubmit,
        errors,
        values
    } = FormHandler(isLogin, validateLogin);

    function isLogin() {
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (!isSubmitted) {
            return;
        }
        dispatch(setLoading(true))
        let data = {
            email: values.email.toLowerCase(),
            password: values.password
        }
        axiosInstance.post("/users/login", data)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                loadCredential(res.data)
                dispatch(userUpdate(res.data))
                navigate(navigationDefault(res.data.role))
                toast.success("Successfully Login");
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
            .finally(() => {
                console.log("Request completed")
                setIsSubmitted(false)
                dispatch(setLoading(false))
            })
    }, [isSubmitted]);

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
                            <p>Sign In</p>
                        </div>
                        <div className="sign-in-para text-left text-md-left pb-3">
                            <p className={"fw-normal"}>If you don’t have an account register</p>
                            <p className={"fw-normal"}>You can
                                <Link to="/register"
                                      className={"text-register text-decoration-none fw-semibold"}> Register
                                    here!</Link>
                            </p>
                        </div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">Email</label>
                                <input className={`form-control fw-normal ${errors.email ? "border-red" : ""}`}
                                       id="exampleInputEmail1"
                                       name={"email"} onChange={handleChange} placeholder="Enter Email"
                                       aria-describedby="emailHelp"/>
                                {errors.email && <p className={"text-red"}>{errors.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1"
                                       className="form-label fw-normal login-font">Password</label>
                                <input className={`form-control fw-normal ${errors.password ? "border-red" : ""}`}
                                       type="password"
                                       name={"password"} onChange={handleChange} placeholder="Enter Password"/>
                                {errors.password && <p className={"text-red"}>{errors.password}</p>}
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3 form-check d-flex justify-content-between align-items-center">
                                        <div>
                                            <input type="checkbox" className="form-check-input custom-checkbox"
                                                   id="exampleCheck1"/>
                                            <label className="form-check-label fw-normal pe-2" htmlFor="exampleCheck1">Remember
                                                me</label>
                                        </div>
                                        <div>
                                            <Link to="/forgot-password"
                                                  className={"text-decoration-none text-secondary fw-normal"}>Forgot
                                                Password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col p-2">
                                    <button type={"submit"} className="btn login-btn w-100 fw-semibold p-2"
                                            onClick={handleSubmit}>Login
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="signin-with d-flex justify-content-center pb-2">
                            <p>or continue with</p>
                        </div>
                        <div className="icon-container pb-2">
                            <button className="icon-button">
                                <FeatherIcon className="action-icons-color" icon="mail"/>
                            </button>
                            <button className="icon-button">
                                <FeatherIcon className="action-icons-color" icon="facebook"/>
                            </button>
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

export default Login;