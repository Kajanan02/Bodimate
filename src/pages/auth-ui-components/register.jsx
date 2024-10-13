import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/logo.svg";
import LoginBanner from "../../assets/login-banner.jpeg";
import {Link, useNavigate} from "react-router-dom";
import {validateRegister} from "../../utils/validation.js";
import FormHandler from "react-form-buddy";
import axiosInstance from "../../utils/axiosInstance.js";
import {useDispatch} from "react-redux";
import {setLoading} from "../../redux/features/loaderSlice.js";
import {toast} from "react-toastify";

function Register() {

    const {
        values,
        handleChange,
        handleSubmit,
        errors,
    } = FormHandler(isRegister, validateRegister);

    const dispatch = useDispatch();
    const navigate = useNavigate()

    console.log(values)

    function isRegister() {
        dispatch(setLoading(true))
        axiosInstance.post("/users/register", values)
            .then(res => {
                console.log(res.data)
                toast.success("Successfully Registered")
                navigate("/login")
            })
            .catch(err => {
                console.log(err.response.data)
                toast.error(err.response.data.message)
            }).finally(() => {
            dispatch(setLoading(false))
        })
    }

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
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">First Name</label>
                                <input className={`form-control fw-normal ${errors.firstName ? "border-red" : ""}`}
                                       id="exampleInputEmail1"
                                       name={"firstName"} onChange={handleChange} placeholder="Enter Email"
                                       aria-describedby="emailHelp"/>
                                {errors.firstName && <p className={"text-red"}>{errors.firstName}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">Last Name</label>
                                <input className={`form-control fw-normal ${errors.lastName ? "border-red" : ""}`}
                                       type="text"
                                       name={"lastName"} onChange={handleChange} placeholder="Enter Username"/>
                                {errors.lastName && <p className={"text-red"}>{errors.lastName}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">Email</label>
                                <input className={`form-control fw-normal ${errors.email ? "border-red" : ""}`}
                                       id="exampleInputEmail1"
                                       name={"email"} onChange={handleChange} placeholder="Enter Email"
                                       aria-describedby="emailHelp"/>
                                <div id="emailHelp" className="form-text">Please Use University Email Address,(If you don't have Email address Please contact Admin)
                                </div>

                                {errors.email && <p className={"text-red"}>{errors.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">Contact No</label>
                                <input className={`form-control fw-normal ${errors.contactNo ? "border-red" : ""}`}
                                       type="text"
                                       name={"contactNo"} onChange={handleChange} placeholder="Enter Username"/>
                                {errors.contactNo && <p className={"text-red"}>{errors.contactNo}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1"
                                       className="form-label fw-normal login-font">Address</label>
                                <input className={`form-control fw-normal ${errors.address ? "border-red" : ""}`}
                                       type="text"
                                       name={"address"} onChange={handleChange} placeholder="Enter Username"/>
                                {errors.address && <p className={"text-red"}>{errors.address}</p>}
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
                                    <button type={"submit"} className="btn login-btn w-100 fw-semibold p-2"
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