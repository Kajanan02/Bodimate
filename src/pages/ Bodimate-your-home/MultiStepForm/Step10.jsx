import React from 'react';
import { Row, Col } from 'react-bootstrap';
import place from '../../../assets/place/place.jpg';
import './step1.css';

const Step10 = ({ nextStep, prevStep  }) => {
    return (
        <div className="unique-step1-container">
            <Row className="unique-align-items-center">
                {/* Left Side: Text Content */}
                <Col md={6} className="unique-text-right">
                    <h2>Step 3</h2>
                    <h3>Finish up and publish</h3>
                    <p>
                        Finally, you'll choose if you'd like to start with an experienced guest,
                        then you'll set your nightly price. Answer a few quick questions and
                        publish when you're ready.
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

export default Step10;
