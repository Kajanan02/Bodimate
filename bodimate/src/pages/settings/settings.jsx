import React, {useState} from 'react';
import home from "../../assets/home.svg";
import "./settings.css"
import profileImage from "../../assets/settings/profile.png"
import camera from "../../assets/camera.svg";
import {FileUploader} from "react-drag-drop-files";
import {Col, FormControl, Row} from "react-bootstrap";
import PasswordSettings from "./passwordSettings.jsx";
import formHandler from "../../utils/FormHandler.js";
import {validatePersonalSettings} from "../../utils/validation.js";



function Settings() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        handleSubmit,
        handleChange,
        values,
        errors,
    } = formHandler(submitSettings, validatePersonalSettings)

    console.log(errors)

    function submitSettings() {
        setFormSubmitted(true)
    }

    return (
        <div className={"settings-container"}>
            <div>
                <h3 className={'mb-5 main-title'}>Settings</h3>
            </div>
            <div className={'details-title-container mb-2'}>
                <img src={home} alt="Home Icon"/>
                <div className={'title ms-1 fw-bold'}>Account Details</div>
            </div>
            <div className={"settings-form-container"}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <h5 className={"mb-3 fw-semibold"}>Personal Information</h5>
                        </div>
                        <div className={"container-fluid"}>
                            <div className={"row mt-3"}>
                                <div className={"col-md-6 px-0 profile-image"}>
                                    <div className={"settings-profile-photo"}>
                                        <img src={profileImage} className={"w-25"}/>
                                    </div>
                                    <div className={"settings-image-uploader-container"}>
                                        <FileUploader>
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
                                    <h6><label htmlFor="userName" className="">User Name</label></h6>
                                    <FormControl id="userName"
                                                 className={`input-border-color ${errors.userName ? "border-danger" : ""}`}
                                        onChange={handleChange}
                                        value={values.userName || ""}
                                                 placeholder="Enter User Name" name={"userName"}
                                    />
                                    {errors.userName &&
                                        <p className={"error-message text-danger"}>{errors.userName}</p>}
                                </Col>
                                <Col md={6} className={"ps-3 ps-lg-5"}>
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
                            </Row>
                            <Row className={"mb-lg-3"}>
                                <Col md={6} className={"ps-3 pe-lg-5"}>
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
                                <Col md={6} className={"ps-3 ps-lg-5"}>
                                    <h6><label htmlFor="phoneNo" className="">Contact No</label></h6>
                                    <FormControl id="phoneNo"
                                                 className={`input-border-color ${errors.phoneNo ? "border-danger" : ""}`}
                                        onChange={handleChange}
                                        value={values.phoneNo || ""}
                                                 placeholder="Enter Phone No" name={"phoneNo"}
                                    />
                                    {errors.phoneNo &&
                                        <p className={"error-message text-danger"}>{errors.phoneNo}</p>}
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
                            </Row>
                        </div>
                        <div>
                            <div>
                                <h5 className={"mb-3 fw-semibold"}>Address</h5>
                            </div>
                            <div className={"mt-3"}>
                                <Row className={"mb-lg-3"}>
                                    <Col md={6} className={"ps-3 pe-lg-5"}>
                                        <h6><label htmlFor="boardingNo" className="">Home No</label></h6>
                                        <FormControl id="homeNo" name={"homeNo"}
                                                     className={`input-border-color ${errors.homeNo ? "border-danger" : ""}`}
                                                     placeholder="Enter Home No"
                                            onChange={handleChange}
                                            value={values.homeNo || ""}
                                        />
                                        {errors.homeNo &&
                                            <p className={"error-message text-danger"}>{errors.homeNo}</p>}
                                    </Col>
                                    <Col md={6} className={"ps-3 ps-lg-5"}>
                                        <h6><label htmlFor="street" className="">Street</label></h6>
                                        <FormControl id="street" name={"street"}
                                                     className={`input-border-color ${errors.street ? "border-danger" : ""}`}
                                                     placeholder="Enter Street"
                                            onChange={handleChange}
                                            value={values.street || ""}
                                        />
                                        {errors.street &&
                                            <p className={"error-message text-danger"}>{errors.street}</p>}
                                    </Col>
                                </Row>
                                <Row className={"mb-lg-3"}>
                                    <Col md={6} className={"ps-3 pe-lg-5"}>
                                        <h6><label htmlFor="city" className="">City/Town/Village</label></h6>
                                        <FormControl id="city" name={"city"}
                                                     className={`input-border-color ${errors.city ? "border-danger" : ""}`}
                                                     placeholder="Enter City"
                                            onChange={handleChange}
                                            value={values.city || ""}
                                        />
                                        {errors.city &&
                                            <p className={"error-message text-danger"}>{errors.city}</p>}
                                    </Col>
                                    <Col md={6} className={"ps-3 ps-lg-5"}>
                                        <h6><label htmlFor="district" className="">District</label></h6>
                                        <FormControl id="district" name={"district"}
                                                     className={`input-border-color ${errors.district ? "border-danger" : ""}`}
                                                     placeholder="Enter District"
                                            onChange={handleChange}
                                            value={values.district || ""}
                                        />
                                        {errors.district &&
                                            <p className={"error-message text-danger"}>{errors.district}</p>}
                                    </Col>
                                </Row>
                                <Row className={"mb-lg-3"}>
                                    <Col md={6} className={"ps-3 pe-lg-5"}>
                                        <h6><label htmlFor="city" className="">Province</label></h6>
                                        <FormControl id="province" name={"province"}
                                                     className={`input-border-color ${errors.province ? "border-danger" : ""}`}
                                                     placeholder="Enter Province"
                                            onChange={handleChange}
                                            value={values.province || ""}
                                        />
                                        {errors.province &&
                                            <p className={"error-message text-danger"}>{errors.province}</p>}
                                    </Col>
                                    <Col md={6} className={"ps-3 ps-lg-5"}>
                                        <h6><label htmlFor="district" className="">Postal Code</label></h6>
                                        <FormControl id="postalCode" name={"postalCode"}
                                                     className={`input-border-color ${errors.postalCode ? "border-danger" : ""}`}
                                                     placeholder="Enter Postal Code"
                                            onChange={handleChange}
                                            value={values.postalCode || ""}
                                        />
                                        {errors.postalCode &&
                                            <p className={"error-message text-danger"}>{errors.postalCode}</p>}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div>
                            <div className="container-fluid boading-image-uploader my-5 pt-3 mb-3">
                                <div className={""}>
                                    <div className="fw-bold fs-5">Upload NIC Images</div>
                                    <div className={"fw-light fst-normal pt-2"}>Add NIC Front and Back Image
                                    </div>
                                </div>
                                <div className={"row mt-4"}>
                                    <div className={"col-md-6 px-0 pe-lg-3 pb-3 pb-lg-0 settings-nic-upload"}>
                                        <FileUploader>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"fw-semibold my-2"}>
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                    <div className={"col-md-6 px-0 pb-3 pb-lg-0 settings-nic-upload"}>
                                        <FileUploader>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"fw-semibold my-2"}>
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"modal-footer student-settings-btn"}>
                            <button type="submit" className={"btn btn-secondary students-dropdown-btn "}
                                // onClick={handleSubmit}
                            >Submit
                            </button>
                        </div>
                    </div>
                </form>
                <PasswordSettings/>
            </div>
        </div>
    );
}

export default Settings;