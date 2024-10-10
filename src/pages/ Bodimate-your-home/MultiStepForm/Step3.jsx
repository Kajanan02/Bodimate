import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './step3.css'; // Import custom CSS

const Step3 = ({ nextStep, prevStep }) => {
    const [location, setLocation] = useState('');
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapError, setMapError] = useState(null);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const onMapLoad = () => {
        setMapLoaded(true);
    };

    const onMapError = (error) => {
        setMapError(error);
    };

    return (
        <div className="step-container">
            <h2>Where's your place located?</h2>
            <p>Your address is only shared with guests after they’ve made a reservation.</p>
            <Form>
                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your place location"
                        value={location}
                        onChange={handleLocationChange}
                    />
                </Form.Group>
                <LoadScript
                    googleMapsApiKey="AIzaSyC3s4uWmL-x9q4DszYFjvnGZwJvVdU8CqM" // Replace with your actual API key here
                    onLoad={onMapLoad}
                    onError={onMapError}
                >
                    <GoogleMap
                        mapContainerStyle={{ height: "400px", width: "100%" }}
                        zoom={10}
                        center={{ lat: -3.745, lng: -38.523 }} // Change to your desired coordinates
                        onLoad={onMapLoad}
                        onError={onMapError}
                    >
                        {mapError && <div>Error loading map: {mapError.message}</div>}
                    </GoogleMap>
                </LoadScript>
            </Form>

        </div>
    );
};

export default Step3;
