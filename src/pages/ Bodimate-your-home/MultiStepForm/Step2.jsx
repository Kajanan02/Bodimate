import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import homeIcon from './../../../assets/admin-listings/homeIcon.svg';
import roomIcon from './../../../assets/admin-listings/roomIcon.svg';
import studentIcon from './../../../assets/admin-listings/studentIcon.svg';
import './step2.css';

const Step2 = ({ handleChange, errors }) => {
    return (
        <div className="step-container">
            <Row className="align-items-center justify-content-center"> {/* Centering the content */}
                <Col md={12} className="ps-3">
                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <h5 className="mb-3 admin-form-head fw-semibold">Select Boarding Type</h5>
                            <Col sm={12} className="pe-1">
                                <div className="admin-boarding-type-home-button pb-2">
                                    <Form.Check
                                        type="radio"
                                        name="boardingType"
                                        onChange={handleChange}
                                        label={
                                            <div className="admin-boarding-type-home-container w-100 ps-3">
                                                <div className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? 'border-danger' : ''}`}>
                                                    <div>
                                                        <div className="admin-form-radio-head">An Entire Home</div>
                                                        <div className="admin-radio-btn w-100 text-start">
                                                            Students have the whole place to themselves.
                                                        </div>
                                                    </div>
                                                    <div className="ps-5 pe-2">
                                                        <img src={homeIcon} alt="homeIcon" />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        id="formHorizontalRadios1"
                                        className="radio-circle w-100 admin-radio-form-check-label"
                                    />
                                </div>
                                <div className="admin-boarding-type-home-button pb-2">
                                    <Form.Check
                                        type="radio"
                                        name="boardingType"
                                        onChange={handleChange}
                                        label={
                                            <div className="admin-boarding-type-home-container w-100 ps-3">
                                                <div className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? 'border-danger' : ''}`}>
                                                    <div>
                                                        <div className="admin-form-radio-head">A Room</div>
                                                        <div className="admin-radio-btn">
                                                            Students have their own room.
                                                        </div>
                                                    </div>
                                                    <div className="ps-5 pe-2">
                                                        <img src={roomIcon} alt="roomIcon" />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        id="formHorizontalRadios2"
                                        className="radio-circle w-100 admin-radio-form-check-label"
                                    />
                                </div>
                                <div className="admin-boarding-type-home-button pb-2">
                                    <Form.Check
                                        type="radio"
                                        name="boardingType"
                                        onChange={handleChange}
                                        label={
                                            <div className="admin-boarding-type-home-container w-100 ps-3">
                                                <div className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? 'border-danger' : ''}`}>
                                                    <div>
                                                        <div className="admin-form-radio-head">A Shared Room</div>
                                                        <div className="admin-radio-btn">
                                                            Room can be shared with more than one student.
                                                        </div>
                                                    </div>
                                                    <div className="ps-5 pe-2">
                                                        <img src={studentIcon} alt="studentIcon" />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        id="formHorizontalRadios3"
                                        className="radio-circle w-100 admin-radio-form-check-label"
                                    />
                                </div>
                                {errors.boardingType && <p className="admin-text-red">{errors.boardingType}</p>}
                            </Col>
                        </Form.Group>
                    </fieldset>
                </Col>
            </Row>
        </div>
    );
};

export default Step2;
