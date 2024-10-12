import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { validateUserRegistration } from "../../utils/validation.js";

import FormHandler from "react-form-buddy";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { loadCredential } from "../../utils/Authentication.js";
import { setLoading } from "../../redux/features/loaderSlice.js";
import { FileUploader } from 'react-drag-drop-files';
import uploadIcon from "../../assets/admin-listings/camera.svg";
import './Bodimateyourhome .css';
import axios from "axios";

function Owner_Register() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nicFront, setNicFront] = useState(null);
    const [nicBack, setNicBack] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { handleChange, handleSubmit, errors, values ,setValue} = FormHandler(isOwnerRegister, validateUserRegistration);

    function isOwnerRegister() {
        const validationErrors = validateUserRegistration(values);
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitted(true);
        } else {
            handleSubmit(validationErrors);
        }
    }


    function imageUpload(file, key) {
        console.log("File")

        dispatch(setLoading(true))
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "xi7icexi")
        data.append("cloud_name", "dacrccjrm")
        axios.put("https://api.cloudinary.com/v1_1/dacrccjrm/image/upload", data)
            .then((res) => {
                console.log(res.data.url)
                setValue({[key]: res.data.url})
            }).finally(() => dispatch(setLoading(false)))
    }

    useEffect(() => {
        if (!isSubmitted) return;



        dispatch(setLoading(true));

      values.role = "boardingOwner";


        axiosInstance.post('/users/register', values)
            .then(res => {
                console.log(res.data);
                loadCredential(res.data);
                navigate('/login');
                toast.success('Successfully Registered');
            })
            .catch(err => {
                toast.error(err.response?.data?.message || "Registration failed");
            })
            .finally(() => {
                setIsSubmitted(false);
                dispatch(setLoading(false)); // Hide loading indicator
            });
    }, [isSubmitted]);

    const handleChangeNicFront = (file) => {
        setNicFront(file);
        imageUpload(file, "nicFront")
    };

    const handleChangeNicBack = (file) => {
        setNicBack(file);
        imageUpload(file, "nicBack")
    };

    const handleChangeProfilePicture = (file) => {
        setProfilePicture(file);
        imageUpload(file, "profilePic")
    };


    return (
        <div className="container-fluid align-middle">
            <div className="row align-items-center login-container">
                <div className="col-lg-12 col-md-12 login-left bg-white d-flex align-items-center justify-content-center pt-5">
                    <div className="col-lg-8 col-md-12">
                        <div className="row d-flex justify-content-center">
                            <div className="col d-flex align-items-center pb-5">
                                <img src={Logo} alt="Website Logo" className="website-logo" />
                                <div className="login-head ms-3"><b>Bodimate</b></div>
                            </div>
                        </div>
                        <div className="sign-in-text text-left text-md-left">
                            <h2>Sign Up</h2>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            isOwnerRegister();
                        }}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input className="form-control" name="firstName" onChange={handleChange}
                                           placeholder="Enter First Name"/>
                                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input className="form-control" name="lastName" onChange={handleChange}
                                           placeholder="Enter Last Name"/>
                                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" name="email" onChange={handleChange}
                                           placeholder="Enter Email"/>
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input className="form-control" type="password" name="password"
                                           onChange={handleChange} placeholder="Enter Password"/>
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Contact Number</label>
                                    <input className="form-control" name="contactNo" onChange={handleChange}
                                           placeholder="Enter Contact Number"/>
                                    {errors.contactNo && <div className="text-danger">{errors.contactNo}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Gender</label>
                                    <select className="form-control" name="gender" onChange={handleChange}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && <div className="text-danger">{errors.gender}</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Address</label>
                                    <input className="form-control" name="address" onChange={handleChange}
                                           placeholder="Enter Address"/>
                                    {errors.address && <div className="text-danger">{errors.address}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">NIC Number</label>
                                    <input className="form-control" name="nicNo" onChange={handleChange}
                                           placeholder="Enter NIC Number"/>
                                    {errors.nicNo && <div className="text-danger">{errors.nicNo}</div>}
                                </div>
                            </div>


                            <div className="row mb-3">
                                <label className="form-label d-block">NIC Front</label>
                                <FileUploader handleChange={handleChangeNicFront} types={["JPEG", "PNG","JPG"]}>
                                    <div className="file-uploader-container d-flex flex-column align-items-center">
                                        <img src={uploadIcon} alt="Upload Icon"/>
                                        {!nicFront?.name ? (  // Changed condition to check for `name` property
                                            <div>
                                                <div className="fw-semibold my-2">Drop or Select file</div>
                                                <div>Drop files here or click <span
                                                    className="text-success text-decoration-underline">browse</span> through
                                                    your machine
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="fw-semibold my-2">{nicFront?.name}</div>
                                        )}
                                    </div>
                                </FileUploader>
                            </div>

                            {/* Full-width NIC Back */}
                            <div className="row mb-3">
                                <label className="form-label d-block">NIC Back</label>
                                <FileUploader handleChange={handleChangeNicBack} types={["JPEG", "PNG","JPG"]}>
                                    <div className="file-uploader-container d-flex flex-column align-items-center">
                                        <img src={uploadIcon} alt="Upload Icon"/>
                                        {!nicBack?.name ? (  // Changed condition to check for `name` property
                                            <div>
                                                <div className="fw-semibold my-2">Drop or Select file</div>
                                                <div>Drop files here or click <span
                                                    className="text-success text-decoration-underline">browse</span> through
                                                    your machine
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="fw-semibold my-2">{nicBack?.name}</div>
                                        )}
                                    </div>
                                </FileUploader>
                            </div>


                            <div className="row mb-3">
                                <label className="form-label d-block">Profile Picture</label>
                                <FileUploader handleChange={handleChangeProfilePicture} types={["JPEG", "PNG","JPG"]}>
                                    <div className="file-uploader-container d-flex flex-column align-items-center">
                                        <img src={uploadIcon} alt="Upload Icon"/>
                                        {!profilePicture?.name ? (
                                            <div>
                                                <div className="fw-semibold my-2">Drop or Select file</div>
                                                <div>Drop files here or click <span
                                                    className="text-success text-decoration-underline">browse</span> through
                                                    your machine
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="fw-semibold my-2">{profilePicture?.name}</div>
                                        )}
                                    </div>
                                </FileUploader>
                            </div>


                            <div className="  mb-3 row p-2">
                                <button type={"button"} className="btn login-btn col-md-6"
                                        onClick={handleSubmit}>Register
                                </button>
                            </div>
                        </form>
                        <div className="mt-4">
                            <p>Already have an account? <Link to="/login"
                                                              className="text-register text-decoration-none fw-semibold">Login
                                here!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Owner_Register;
