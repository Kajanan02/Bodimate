import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './step8.css'; // Import custom CSS for additional styling

const Step8 = ({ prevStep, nextStep, handleChange, values, handleSubmit }) => {
    const { houseTitle } = values;

    const onSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        handleSubmit(); // Call the handleSubmit function
        nextStep(); // Move to the next step after submission
    };

    return (
        <div className="step-container p-4">
            <h2 className="mb-3">Now, let's give your house a title</h2>
            <p className="text-muted">
                Short titles work best. Have fun with it—you can always change it later.
            </p>

            <Form onSubmit={onSubmit}>
                <Form.Group controlId="houseTitle" className="mb-3">
                    <Form.Label></Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={1} // Adjust rows as needed
                        name="houseTitle"
                        value={houseTitle}
                        onChange={handleChange}
                        placeholder="Enter a short title for your house"
                        maxLength={32} // Ensure maxLength is an integer
                        className="custom-input" // Added unique class
                    />


                    <Form.Text className="text-muted">
                        {houseTitle.length}/32
                    </Form.Text>
                </Form.Group>


            </Form>
        </div>
    );
};

export default Step8;
