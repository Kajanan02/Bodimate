import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    height: '400px',
    width: '100%',
};

export default function BoardingLocation({ location }) {

    // Log location to check passed props
    console.log(location);

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.VITE_REACT_APP_GOOGLE_MAP, // Use environment variable
        libraries: ['geometry', 'drawing', 'places'],
    });

    // Return null if location is not provided
    if (!location) return null;

    // Render the map once API is loaded
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: location.lat, lng: location.lng }}
            zoom={15}
        >
            {/* Place a marker at the specified location */}
            <Marker position={{ lat: location.lat, lng: location.lng }} />
        </GoogleMap>
    ) : (
        <div>Loading...</div>
    );
}
