import React, {useEffect, useRef, useState} from 'react';
import "./admin-Setting.css"
import profileImage from "../../../assets/admin-setting/admin-profile.png"
import {FileUploader} from "react-drag-drop-files";
import {Col, Form, FormControl, Row} from "react-bootstrap";
import PasswordSetting from "./password-Setting.jsx";
import {validateAdminSettings} from "../../../utils/validation.js";
import maleIcon from "../../../assets/male-student-5-svgrepo-com.svg";
import femaleIcon from "../../../assets/female-doctor-2-svgrepo-com.svg";
import FormHandler from "react-form-buddy";
import {useSelector} from "react-redux";


function AdminSetting() {
    const inputRef = useRef(null)
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const userDetail = useSelector(state => state.userData.userDetails);


    const handleChangeSettingsProfileImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    console.log(selectedImage)

    const {
        handleSubmit,
        handleChange,
        values,
        initForm,
        errors,
    } = FormHandler(submitSettings, validateAdminSettings)

    console.log(errors)

    function submitSettings() {
        setFormSubmitted(true)
    }

    useEffect(() => {
        if(userDetail){
            initForm(userDetail)
        }
    },[userDetail])


    return (
        <div className={"container mb-4 p-5"}>
            <div className={""}>

            <div>
                <h3 className={'content-heading'}>User Management</h3>
            </div>

            <div className={"settings-form-container"}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <h5 className={"mb-3 fw-semibold"}>Profile</h5>
                        </div>
                        <div className={"container-fluid"}>
                            <div className={"row mt-3"}>
                                <div className={"col-md-6 px-0 profile-image"}>
                                    <div className={"settings-profile-photo"}>
                                        {!selectedImage ? <img src={profileImage}
                                                               className={"admin-profileImageDisplay mb-1"}/> :
                                            <img src={selectedImage}
                                                 className={"admin-profileImageDisplay mb-3"}/>}
                                    </div>
                                    <div className={"settings-image-uploader-container"}>
                                        <FileUploader handleChange={handleChangeSettingsProfileImage}>
                                            <div className={"settings-image-uploader"}>
                                                <button className={"profile-upload-button px-4 py-1"}>Change Photo
                                                </button>
                                                <div className={"fw-semibold my-2"}>
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"mt-3"}>
                            <Row className={"mb-lg-3"}>
                                <Col md={6} className={"ps-3 pe-lg-5"}>
                                    <h6><label htmlFor="boardingName" className="">First Name</label></h6>
                                    <FormControl id="firstName"
                                                 className={`input-border-color ${errors.firstName ? "border-danger" : ""}`}
                                                 onChange={handleChange}
                                                 value={values.firstName || ""}
                                                 placeholder="Enter First Name" name={"firstName"}
                                    />
                                    {errors.firstName &&
                                        <p className={"error-message text-danger"}>{errors.firstName}</p>}
                                </Col>
                                <Col md={6} className={"ps-3 ps-lg-5"}>
                                    <h6><label htmlFor="boardingNo" className="">Last Name</label></h6>
                                    <FormControl id="lastName" name={"lastName"}
                                                 className={`input-border-color ${errors.lastName ? "border-danger" : ""}`}
                                                 placeholder="Enter Last Name"
                                                 onChange={handleChange}
                                                 value={values.lastName || ""}
                                    />
                                    {errors.lastName &&
                                        <p className={"error-message text-danger"}>{errors.lastName}</p>}
                                </Col>
                            </Row>
                            <Row className={"mb-lg-3"}>
                                <Col md={6} className={"ps-3 pe-lg-5"}>
                                    <h6><label htmlFor="boardingName" className="">Date of Birth</label></h6>
                                    <FormControl id="dob"
                                                 type={"date"}
                                                 className={`input-border-color ${errors.dob ? "border-danger" : ""}`}
                                                 onChange={handleChange}
                                                 value={values.dob || ""}
                                                 placeholder="Enter Date of Birth" name={"dob"}
                                    />
                                    {errors.dob &&
                                        <p className={"error-message text-danger"}>{errors.dob}</p>}
                                </Col>
                                <Col md={6} className={"ps-3 ps-lg-5"}>
                                    <h6><label htmlFor="boardingNo" className="">NIC No</label></h6>
                                    <FormControl id="nicNo" name={"nicNo"}
                                                 className={`input-border-color ${errors.nicNo ? "border-danger" : ""}`}
                                                 placeholder="Enter NIC No"
                                                 onChange={handleChange}
                                                 value={values.nicNo || ""}
                                    />
                                    {errors.nicNo &&
                                        <p className={"error-message text-danger"}>{errors.nicNo}</p>}

                                </Col>
                            </Row>
                            <Row className={"mb-lg-3"}>
                                <Col md={6} className={"ps-3 pe-lg-5"}>
                                    <h6><label htmlFor="boardingNo" className="">Email</label></h6>
                                    <FormControl id="email" name={"email"}
                                                 className={`input-border-color ${errors.email ? "border-danger" : ""}`}
                                                 placeholder="Enter Email"
                                                 onChange={handleChange}
                                                 value={values.email || ""}
                                    />
                                    {errors.email &&
                                        <p className={"error-message text-danger"}>{errors.email}</p>}
                                </Col>
                                <Col md={6} className={"ps-3 ps-lg-5"}>
                                    <h6><label htmlFor="phoneNo" className="">Contact No</label></h6>
                                    <FormControl id="phoneNo"
                                                 className={`input-border-color ${errors.contactNo ? "border-danger" : ""}`}
                                                 onChange={handleChange}
                                                 value={values.contactNo || ""}
                                                 placeholder="Enter Phone No" name={"contactNo"}
                                    />
                                    {errors.phoneNo &&
                                        <p className={"error-message text-danger"}>{errors.phoneNo}</p>}
                                </Col>
                            </Row>
                            <Row className={"mb-lg-3"}>
                                <Col md={6} className={"ps-3 pe-lg-5"}>
                                    <h6><label htmlFor="address" className="">Address</label></h6>
                                    <FormControl id="address" name={"address"}
                                                 className={`input-border-color ${errors.address ? "border-danger" : ""}`}
                                                 placeholder="Enter Home No"
                                                 onChange={handleChange}
                                                 value={values.address || ""}
                                    />
                                    {errors.address &&
                                        <p className={"error-message text-danger"}>{errors.address}</p>}
                                </Col>
                                <Col md={6} className={"ps-3 ps-lg-5"}>
                                    <h6><label htmlFor="address" className="">Gender</label></h6>

                                    <div className={"boarding-type-home-button pb-2"}>
                                        <Form.Check
                                            type="radio"
                                            name="gender"
                                            onChange={handleChange}
                                            label={<div
                                                className={"boarding-type-home-container w-100 ps-3"}>
                                                <div
                                                    className={`boarding-type-home ps-3 fw-semibold ${errors.gender ? "border-danger" : ""}`}>
                                                    <div>
                                                        <div>Male</div>
                                                        <div className={"radio-btn"}>Select if you are male
                                                        </div>
                                                    </div>

                                                    <div className={"ps-5 pe-2"}><img src={maleIcon}
                                                                                      alt={"home"}/>
                                                    </div>
                                                </div>

                                            </div>}
                                            id="formHorizontalRadios4"
                                        />
                                    </div>

                                    <div className={"boarding-type-home-button pb-2"}
                                         style={{width: "100%"}}>
                                        <Form.Check
                                            type="radio"
                                            name="gender"
                                            onChange={handleChange}
                                            label={<div
                                                className={"boarding-type-home-container w-100 ps-3"}>
                                                <div
                                                    className={`boarding-type-home ps-3 fw-semibold ${errors.gender ? "border-danger" : ""}`}>
                                                    <div>
                                                        <div>Female</div>
                                                        <div className={"radio-btn"}>Select if you are female
                                                        </div>
                                                    </div>
                                                    <div className={"ps-5 pe-2"}><img src={femaleIcon}
                                                                                      alt={"home"}/>
                                                    </div>
                                                </div>

                                            </div>}
                                            id="formHorizontalRadios5"
                                            className={"w-100"}
                                        />
                                    </div>

                                    {errors.gender &&
                                        <p className={"error-message text-danger"}>{errors.gender}</p>}

                                </Col>


                            </Row>


                        </div>

                        <div className={"modal-footer student-settings-btn"}>
                            <button type="submit"
                                    className={"btn btn-secondary students-dropdown-btn "}
                                // onClick={handleSubmit}
                            >Update Profile
                            </button>
                        </div>
                    </div>
                </form>
                <PasswordSetting/>
            </div>
            </div>
        </div>
    );
}

export default AdminSetting;