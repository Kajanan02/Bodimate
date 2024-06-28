import React, {useState} from 'react';
import {Col, FormControl, Row} from "react-bootstrap";
import formHandler from "../../../utils/FormHandler.js";
import {validateAdminPasswordSettings} from "../../../utils/validation.js";

function PasswordSettings() {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        handleSubmit,
        handleChange,
        values,
        errors,
    } = formHandler(submitSettings, validateAdminPasswordSettings)

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
                            <Col md={6} className={"ps-3 ps-lg-5"}>
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


                    </div>

                </div>
                <div className={"modal-footer student-settings-btn"}>
                    <button type="submit" className={"btn btn-secondary students-dropdown-btn "}
                        // onClick={handleSubmit}
                    >Update Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PasswordSettings;