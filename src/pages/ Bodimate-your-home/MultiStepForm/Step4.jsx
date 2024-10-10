import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './step4.css'; // Import custom CSS for additional styling

const Step4 = ({ nextStep, prevStep }) => {
    const [showLocation, setShowLocation] = useState(false);
    const [address, setAddress] = useState({
        street: '123 Main St',
        apt: 'Apt 4B',
        city: 'New York',
        province: 'New York State',
        postalCode: '10001'
    });
    const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC

    const handleToggle = () => {
        setShowLocation(!showLocation);
        if (!showLocation) {
            // Update map center based on the address (you might want to use a geocoding service here)
            setMapCenter({ lat: 40.7128, lng: -74.0060 }); // Example coordinates
        }
    };

    return (
        <div className="step-container p-4">
            <h2 className="mb-3">Confirm your address</h2>
            <p className="text-muted">
                Your address is only shared with guests after they’ve made a reservation.
            </p>

            <Form>
                <Form.Group as={Row} controlId="formStreetAddress" className="mb-3">
                    <Form.Label column sm={3}>Street address</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder={address.street} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formAptFloorBldg" className="mb-3">
                    <Form.Label column sm={3}>Apt, floor, bldg (if applicable)</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder={address.apt} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formCity" className="mb-3">
                    <Form.Label column sm={3}>City / town / village</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder={address.city} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formProvince" className="mb-3">
                    <Form.Label column sm={3}>Province / state / territory (if applicable)</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder={address.province} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPostalCode" className="mb-3">
                    <Form.Label column sm={3}>Postal code (if applicable)</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" placeholder={address.postalCode} readOnly/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={12}>
                        <Form.Check
                            type="switch"
                            id="showLocationSwitch"
                            label="Show your specific location"
                            checked={showLocation}
                            onChange={handleToggle}
                        />
                        <Form.Text className="text-muted">
                            {showLocation
                                ? "We'll share your specific location."
                                : "We'll share your approximate location."
                            }
                        </Form.Text>
                    </Col>
                </Form.Group>
            </Form>

            {showLocation && (
                <div className="map-container">
                    <LoadScript
                        googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your Google Maps API Key
                    >
                        <GoogleMap
                            mapContainerStyle={{height: "400px", width: "100%"}}
                            center={mapCenter}
                            zoom={15}
                        >
                            <Marker position={mapCenter}/>
                        </GoogleMap>
                    </LoadScript>
                </div>
            )}



            <div className="spacer"></div>
        </div>
    );
};

export default Step4;
