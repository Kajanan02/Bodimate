import React from 'react';
import { Row, Col } from 'react-bootstrap';
import place from '../../../assets/place/place.jpg';
import './step1.css';

const Step6 = ({ nextStep, prevStep  }) => {
    return (
        <div className="unique-step1-container">
            <Row className="unique-align-items-center">
                {/* Left Side: Text Content */}
                <Col md={6} className="unique-text-right">
                    <h2>Step 2</h2>
                    <h3>Make your place stand out</h3>
                    <p>
                        In this step, you’ll add some of the amenities your place offers, plus 5 or more photos.
                        Then, you’ll create a title and description.
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

export default Step6;
