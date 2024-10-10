import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/logo.svg";
import LoginBanner from "../../assets/login-banner.jpeg";
import {Link, useNavigate} from "react-router-dom";
import {validateForgotPassword} from "../../utils/validation.js";
import FormHandler from "react-form-buddy";

import formHandler from "../../utils/FormHandler";
import axiosInstance from "../../utils/axiosInstance.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {loadCredential} from "../../utils/Authentication.js";
import {setLoading} from "../../redux/features/loaderSlice.js";

function ForgotPassword() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        handleChange,
        handleSubmit,
        errors,

        values
    } = formHandler(isForgotPassword, validateForgotPassword);

    function isForgotPassword() {
        setIsSubmitted(true)

    }
    useEffect(() => {
        if (!isSubmitted) {
            return;
        }
        dispatch(setLoading(true))
        let data = {
            email: values.email.toLowerCase()
        }
        axiosInstance.post("/users/forgotPassword", data)
            .then(res => {
                console.log(res.data)
                loadCredential(res.data)
                navigate("/login")
                toast.success("Password reset link sent to your email.");
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
                            <p>Forgot Password</p>
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
                            <div className="row pb-3">
                                <div className="col p-2">
                                    <button type={"button"} className="btn login-btn w-100 fw-semibold p-2"
                                            onClick={handleSubmit}>Reset
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