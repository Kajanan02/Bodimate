import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './step9.css'; // Assuming the same CSS file is used

const Step9 = ({ prevStep, nextStep, handleChange, values, handleSubmit }) => {
    const description = values.description || ''; // Safeguard for undefined description
    const maxChars = 500; // Character limit for the description

    const onSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        handleSubmit(); // Call the handleSubmit function passed as props
        nextStep(); // Move to the next step after submission
    };

    return (
        <div className="step-container p-4">
            <h2 className="mb-3">Create your description</h2>
            <p className="text-muted">
                Share what makes your place special.
            </p>

            <Form onSubmit={onSubmit}>
                <Form.Group controlId="description" className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3} // Adjust rows as needed
                        name="description"
                        value={description} // Binds the value to the `description` prop
                        onChange={handleChange} // Trigger the parent handleChange function
                        placeholder="Discover the gorgeous landscape that surrounds this place to stay."
                        maxLength={maxChars} // Enforce max character limit
                        className="custom-input" // Custom class for styling
                    />
                    <Form.Text className="text-muted">
                        {description.length}/{maxChars}
                    </Form.Text>
                </Form.Group>

                <div className="button-container">
                    <div className="button-container">
                        <Button variant="secondary" className="btt-back" onClick={prevStep}>Back</Button>
                        <Button variant="primary" className="btt_next" onClick={nextStep}>Next</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default Step9;
