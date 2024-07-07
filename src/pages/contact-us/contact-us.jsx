import React, {useState, useEffect} from 'react';
import "./contact-us.css";
import mapImage from '../../assets/contact-us/map.png';
import faceBookImage from '../../assets/contact-us/facebook.svg';
import twitterImage from '../../assets/contact-us/twitter.svg';
import youtubeImage from '../../assets/contact-us/youtube.svg';
import tiktokImage from '../../assets/contact-us/tiktok.svg';
import instagramImage from '../../assets/contact-us/instagram.svg';
import emailImage from '../../assets/contact-us/email.svg';
import phoneImage from '../../assets/contact-us/Frame.svg'
import {toggleLoader} from "../../redux/action.js";
import axios from "axios";
import {toast} from 'react-toastify';
import {useDispatch} from "react-redux";
import formHandler from "../../utils/FormHandler.js";
import {validateContactUs} from "../../utils/validation.js";

function ContactUs() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useDispatch();


    const {
        handleSubmit,
        handleChange,
        values,
        errors,
    } = formHandler(submitContactUs, validateContactUs)
    console.log(errors)


    useEffect(() => {
        if (!formSubmitted) {
            return
        }

        axios.post(`http://localhost:5002/api/contactUs/sendMessage`, values)
            .then((res) => {
                console.log(res.data)
                //props.update()
                //props.onHide();
                toast.success(`Successfully Message is Created`)
            }).catch((err) => {
            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setFormSubmitted(false);
            // resetForm()
            // if (parentSubmit) {
            //     setStudentId(null);
            //     props.onHide()

            // }
        })
    }, [formSubmitted]);



    function submitContactUs() {
        setFormSubmitted(true)
    }
    return (
        <div className={"contact-us-container"}>
            <div className="container-fluid contact-us-msg-content my-5 pt-3 mb-3 ps-lg-5 pe-lg-5">
                <div className={"row mt-4"}>
                    <div className={"contact-us-form-container col-md-6 px-0 pe-lg-3 pb-3 pb-lg-5 ps-lg-5"}>
                        <div>
                            <div className={"contact-us-title fw-semibold"}>Get in <span
                                className={"contact-us-title-touch"}>Touch</span></div>
                            <div className={"pt-2 contact-us-description"}>We will help you find the right boarding. Fill out the form below or contact us, and
                                our
                                friendly team will respond quickly.
                            </div>
                        </div>
                        <div className={"mt-4"}>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1"
                                           className="form-label fw-normal login-font">Name</label>
                                    <input className={`form-control fw-normal ${errors.name ? "border-red" : ""}`}
                                           type="text"
                                           onChange={handleChange}
                                           value={values.name || ""}
                                           name={"name"} placeholder="Enter Your Name"/>
                                    {errors.name &&
                                        <p className={"error-message text-danger"}>{errors.name}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1"
                                           className="form-label fw-normal login-font">Email</label>
                                    <input className={`form-control fw-normal ${errors.email ? "border-red" : ""}`}
                                           id="exampleInputEmail1"
                                           name={"email"} placeholder="Enter Email"
                                           onChange={handleChange}
                                           value={values.email || ""}
                                           aria-describedby="emailHelp"/>
                                    {errors.email &&
                                        <p className={"error-message text-danger"}>{errors.email}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1"
                                           className="form-label fw-normal login-font">Contact Number</label>
                                    <input className={`form-control fw-normal ${errors.phoneNo ? "border-red" : ""}`}
                                           name={"phoneNo"}
                                           value={values.phoneNo || ""}
                                           onChange={handleChange}
                                           placeholder="Enter Contact Number"/>
                                    {errors.phoneNo &&
                                        <p className={"error-message text-danger"}>{errors.phoneNo}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1"
                                           className="form-label fw-normal login-font">Message Topic</label>
                                    <input className={`form-control fw-normal ${errors.messageTopic ? "border-red" : ""}`}
                                           name={"messageTopic"}
                                           value={values.messageTopic || ""}
                                           onChange={handleChange}
                                           placeholder="Enter Message Topic"/>
                                    {errors.messageTopic &&
                                        <p className={"error-message text-danger"}>{errors.messageTopic}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1"
                                           className="form-label fw-normal login-font">Message</label>
                                    <textarea className={`form-control fw-normal ${errors.message ? "border-red" : ""}`}
                                              name={"message"}
                                              value={values.message || ""}
                                              onChange={handleChange}
                                              placeholder="Enter Your Message"/>
                                    {errors.message &&
                                        <p className={"error-message text-danger"}>{errors.message}</p>}
                                </div>
                                <div className="row">
                                    <div className="col p-2">
                                        <button type={"button"} className="btn login-btn w-100 fw-semibold p-2" onClick={handleSubmit}>Submit
                                        </button>
                                    </div>
                                </div>
                                <div className={"social-icon-container ps-5 pe-5 me-lg-5 ms-lg-5"}>
                                    <div>
                                        <img src={faceBookImage} alt="facebook image" className="img-fluid mx-auto"/>
                                    </div>
                                    <div>
                                        <img src={instagramImage} alt="instagram image" className="img-fluid mx-auto"/>
                                    </div>
                                    <div>
                                        <img src={twitterImage} alt="twitter image" className="img-fluid mx-auto"/>
                                    </div>
                                    <div>
                                        <img src={youtubeImage} alt="youtube image" className="img-fluid mx-auto"/>
                                    </div>
                                    <div>
                                        <img src={tiktokImage} alt="tiktok image" className="img-fluid mx-auto"/>
                                    </div>
                                </div>
                                <div className={"contact-us-contact mt-4"}>
                                    <div className={"contact-phone"}>
                                        <div>
                                            <img src={phoneImage} alt={"Contact Number"}/>
                                        </div>
                                        <div className={"ms-3"}>
                                            <div className={"fw-semibold"}>
                                                Phone
                                            </div>
                                            <div className={"contact-phone-no fw-semibold"}>
                                                021 222 4845
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"contact-email"}>
                                        <div>
                                            <img src={emailImage} alt={"Contact Email"}/>
                                        </div>
                                        <div className={"ms-3"}>
                                            <div className={"fw-semibold"}>
                                                E-MAIL
                                            </div>
                                            <div className={"contact-email-id fw-semibold"}>
                                                bodimate@gamil.com
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 contact-us-map bg-white justify-content-center d-none d-sm-block ps-lg-2 pe-lg-3">
                        <img src={mapImage} alt="Map Banner" className="map-banner-image img-fluid mx-auto"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
