import React, {useState} from 'react';
import {Col, FormControl, Row} from "react-bootstrap";
import {validatePasswordSettings} from "../../utils/validation.js";
import FormHandler from "react-form-buddy";

function PasswordSettings() {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        handleSubmit,
        handleChange,
        values,
        errors,
    } = FormHandler(submitSettings, validatePasswordSettings)

    function submitSettings() {
        setFormSubmitted(true)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className={"mt-5"}>
                        <h5 className={"mb-4 fw-semibold"}>Password Settings</h5>
                    </div>
                    <div className={"mt-3"}>
                        <Row className={"mb-lg-3"}>
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="city" className="">Current Password</label></h6>
                                <FormControl id="currentPassword" name={"currentPassword"}
                                             className={`input-border-color ${errors.currentPassword ? "border-danger" : ""}`}
                                             placeholder="Enter Current Password"
                                             onChange={handleChange}
                                             value={values.currentPassword || ""}
                                />
                                {errors.currentPassword &&
                                    <p className={"error-message text-danger"}>{errors.currentPassword}</p>}
                            </Col>
                        </Row>
                        <Row className={"mb-lg-3"}>
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="city" className="">New Password</label></h6>
                                <FormControl id="city" name={"newPassword"}
                                             className={`input-border-color ${errors.newPassword ? "border-danger" : ""}`}
                                             placeholder="Enter New Password"
                                             onChange={handleChange}
                                             value={values.newPassword || ""}
                                />
                                {errors.newPassword &&
                                    <p className={"error-message text-danger"}>{errors.newPassword}</p>}
                            </Col>
                        </Row>
                        <Row className={"mb-lg-3"}>
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="city" className="">Confirm Password</label></h6>
                                <FormControl id="city" name={"confirmPassword"}
                                             className={`input-border-color ${errors.confirmPassword ? "border-danger" : ""}`}
                                             placeholder="Enter Confirm Password"
                                             onChange={handleChange}
                                             value={values.confirmPassword || ""}
                                />
                                {errors.confirmPassword &&
                                    <p className={"error-message text-danger"}>{errors.confirmPassword}</p>}
                            </Col>
                        </Row>
                    </div>
                    <div className={"mt-2"}>
                        <div className={"mb-4 fw-semibold"} style={{color: '#024950'}}>Forgot Password?</div>
                    </div>
                </div>
                <div className={"modal-footer student-settings-btn"}>
                    <button type="submit" className={"btn btn-secondary students-dropdown-btn "}
                        // onClick={handleSubmit}
                    >Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PasswordSettings;