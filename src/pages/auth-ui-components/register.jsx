import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/logo.svg";
import LoginBanner from "../../assets/login-banner.jpeg";
import {Link, useNavigate} from "react-router-dom";
import {validateRegister} from "../../utils/validation.js";
import formHandler from "../../utils/FormHandler";
import {useDispatch} from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import {toast} from "react-toastify";
import {loadCredential} from "../../utils/Authentication.js";
import {setLoading} from "../../redux/features/loaderSlice.js";

function Register() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleChange,
        handleSubmit,
        errors,
        values
    } = formHandler(isRegister, validateRegister);

    function isRegister() {
        setIsSubmitted(true)
    }

    useEffect(() => {
        if (!isSubmitted){
            return;
        }
        dispatch(setLoading(true))
        let data = {
            email: values.email.toLowerCase(),
            username: values.username,
            password: values.password
        }
        axiosInstance.post('/users/register', data)
            .then(res=>{
                console.log(res.data)
                loadCredential(res.data)
                navigate('/login')
                toast.success('Successfully Registered');
            })
           .catch(err => {
               toast.error(err.response.data.message)
           })
            .finally(()=>{
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
                            <p>Sign Up</p>
                        </div>
                        <div className="sign-in-para text-left text-md-left pb-3">
                            <p className={"fw-normal"}>If you already have an account register</p>
                            <p className={"fw-normal"}>You can
                                <Link to="/login" className={"text-register text-decoration-none fw-semibold"}> Login
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
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">Username</label>
                                <input className={`form-control fw-normal ${errors.username ? "border-red" : ""}`}
                                       type="text"
                                       name={"username"} onChange={handleChange} placeholder="Enter Username"/>
                                {errors.username && <p className={"text-red"}>{errors.username}</p>}
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
                                <div className="col p-2">
                                    <button type={"button"} className="btn login-btn w-100 fw-semibold p-2"
                                            onClick={handleSubmit}>Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 login-right bg-white justify-content-center d-none d-sm-block">
                    <img src={LoginBanner} alt="Login Banner" className="banner-image image-fluid mx-auto"/>
                </div>
            </div>
        </div>
    );
}

export default Register;