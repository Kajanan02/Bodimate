import React, { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import './step11.css';

const Step11 = ({ nextStep, prevStep }) => {
    const [price, setPrice] = useState(12260); // Initial price
    const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
    const guestPrice = price + 1731; // Calculated guest price including taxes

    const handlePriceChange = (event) => {
        setPrice(Number(event.target.value));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };
    return (
        // <div className="set-price-container">
        //     <Row className="align-items-center">
        //         <Col md={12} className="text-center">
        //             <h3>Now, set your price</h3>
        //             <p className="sub-text">You can change it anytime.</p>
        //             <div className="price-display">
        //                 <span className="price-value">LKR{price.toLocaleString()}</span>
        //                 <span className="edit-icon">&#9998;</span>
        //             </div>
        //             <p className="guest-price">Guest price before taxes Rs{guestPrice.toLocaleString()}</p>
        //             <Form.Group controlId="formBasicPrice">
        //                 <Form.Control
        //                     type="number"
        //                     value={price}
        //                     onChange={handlePriceChange}
        //                     className="price-input"
        //                 />
        //             </Form.Group>
        //         </Col>
        //     </Row>
            <div className="set-price-container">
                <Row className="align-items-center">
                    <Col md={12} className="text-center">
                        <h3>Now, set your price</h3>
                        <p className="sub-text">You can change it anytime.</p>

                        <div className="price-display">
                            {/* Conditionally render the input field or price text */}
                            {isEditing ? (
                                <Form.Group controlId="formBasicPrice">
                                    <Form.Control
                                        type="number"
                                        value={price}
                                        onChange={handlePriceChange}
                                        className="price-input"
                                        onBlur={toggleEditMode} // Exit edit mode when input loses focus
                                        autoFocus // Automatically focus the input
                                    />
                                </Form.Group>
                            ) : (
                                <span className="price-value">
                                LKR{price.toLocaleString()}
                            </span>
                            )}
                            {/* Edit icon toggles the edit mode */}
                            <span
                                className="edit-icon"
                                onClick={toggleEditMode}
                                style={{ cursor: 'pointer' }}
                            >
                            &#9998;
                        </span>
                        </div>

                        <p className="guest-price">
                            Guest price before taxes Rs{guestPrice.toLocaleString()}
                        </p>
                    </Col>
                </Row>

            {/*<Row className="text-center similar-listings">*/}
            {/*    /!*<Col>*!/*/}
            {/*    /!*    <span>Similar listings Rs13,627 – Rs20,441</span>*!/*/}
            {/*    /!*    <br/>*!/*/}
            {/*    /!*    <a href="#" className="learn-pricing-link">Learn more about pricing</a>*!/*/}
            {/*    /!*</Col>*!/*/}
            {/*</Row>*/}

            <div className="button-container">
                <Button variant="secondary" className="btt-back" onClick={prevStep}>Back</Button>
                <Button variant="primary" className="btt_next" onClick={nextStep}>Next</Button>
            </div>
        </div>
    );
};

export default Step11;
