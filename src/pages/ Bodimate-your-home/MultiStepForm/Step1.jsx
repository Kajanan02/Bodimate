import React from 'react';
import { Row, Col } from 'react-bootstrap';
import place from '../../../assets/place/place.jpg';
import './step1.css';

const Step1 = ({ nextStep }) => {
    return (
        <div className="unique-step1-container">
            <Row className="unique-align-items-center">
                {/* Left Side: Text Content */}
                <Col md={6} className="unique-text-right">
                    <h2>Step 1</h2>
                    <h3>Tell us about your place</h3>
                    <p>
                        In this step, we'll ask you which type of property you have and if guests will book
                        the entire place or just a room. Then let us know the location and how many guests
                        can stay.
                    </p>
                </Col>

                {/* Right Side: Image */}
                <Col md={6} className="unique-image-container">
                    <img src={place} alt="Boarding" className="full-image" />
                </Col>
            </Row>
        </div>
    );
};

export default Step1;
