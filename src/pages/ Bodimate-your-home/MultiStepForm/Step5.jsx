import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import './step5.css'; // Import custom CSS for additional styling

const Step5 = ({ nextStep, prevStep }) => {
    const [guests, setGuests] = useState(1);
    const [bedrooms, setBedrooms] = useState(1);
    const [beds, setBeds] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);

    const handleIncrease = (setter, value, max) => {
        if (value < max) {
            setter(value + 1);
        }
    };

    const handleDecrease = (setter, value) => {
        if (value > 1) {
            setter(value - 1);
        }
    };

    return (
        <div className="step-container p-4">
            <h2 className="mb-3">Share some basics about your place</h2>
            <p className="text-muted">You'll add more details later, like bed types.</p>

            <Form>
                {[
                    { label: "Guests", value: guests, setValue: setGuests, max: 22 },
                    { label: "Bedrooms", value: bedrooms, setValue: setBedrooms, max: 11 },
                    { label: "Beds", value: beds, setValue: setBeds, max: 11 },
                    { label: "Bathrooms", value: bathrooms, setValue: setBathrooms, max: 11 }
                ].map((item, index) => (
                    <Form.Group as={Row} controlId={`form${item.label}`} key={index} className="mb-3">
                        <Form.Label column sm={6} className="text-capitalize">{item.label}</Form.Label>
                        <Col sm={6} className="d-flex align-items-center justify-content-between">
                            <button
                                type="button"
                                className="btn btn-decrease d-flex align-items-center justify-content-center"
                                onClick={() => handleDecrease(item.setValue, item.value)}
                                aria-label={`Decrease ${item.label.toLowerCase()} count`}
                                disabled={item.value <= 1} // Disable if value is 1
                            >
                                −
                            </button>
                            <span className="count-display mx-3">{item.value}</span>
                            <button
                                type="button"
                                className="btn btn-increase d-flex align-items-center justify-content-center"
                                onClick={() => handleIncrease(item.setValue, item.value, item.max)}
                                aria-label={`Increase ${item.label.toLowerCase()} count`}
                                disabled={item.value >= item.max} // Disable if value is at max
                            >
                                +
                            </button>
                        </Col>
                    </Form.Group>
                ))}
            </Form>
        </div>
    );
};

export default Step5;
