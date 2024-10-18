import React, {useEffect, useState, useRef} from 'react';
import {GoogleMap, Marker, useJsApiLoader, StandaloneSearchBox} from '@react-google-maps/api';

const containerStyle = {
    height: '332px',
    width: '100%'
};

export default function BoardingLocation(props) {
    const [position, setPosition] = useState({lat: 6.927079, lng: 79.861244});
    const [searchBox, setSearchBox] = useState(null);
    const mapRef = useRef(null);

    // Load the Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAP,
        libraries: ['places', 'geometry', 'drawing'],
    });

    useEffect(() => {
        if (props.location) {
            setPosition(props.location);
        }
    }, [props.location]);

    const onMarkerDragEnd = (coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setPosition({ lat, lng });
        props.onChange({ lat, lng });
    };

    const onPlacesChanged = () => {
        const places = searchBox.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();

        places.forEach((place) => {
            if (place.geometry.location) {
                const { lat, lng } = place.geometry.location;
                setPosition({ lat: lat(), lng: lng() });
                props.onChange({ lat: lat(), lng: lng() });
                bounds.extend(place.geometry.location);
            }
        });

        if (mapRef.current) {
            mapRef.current.fitBounds(bounds);
        }
    };

    const onSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };

    return isLoaded ? (
        <div className="position-relative">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={position}
                zoom={8}
                onLoad={(map) => mapRef.current = map}
            >
                <Marker
                    position={position}
                    draggable={true}
                    onDragEnd={onMarkerDragEnd}
                />

                <StandaloneSearchBox
                    onPlacesChanged={onPlacesChanged}
                    onLoad={onSearchBoxLoad}
                >
                    <input
                        type="text"
                        placeholder="Search place"
                        style={{
                            boxSizing: 'border-box',
                            border: `1px solid transparent`,
                            width: `270px`,
                            height: `40px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.1)`,
                            fontSize: `14px`,
                            outline: `none`,
                            zIndex: 3,
                            textOverflow: `ellipses`,
                            position: 'absolute',
                            bottom: '285px',
                            marginLeft: '40%',
                        }}
                    />
                </StandaloneSearchBox>
            </GoogleMap>
        </div>
    ) : (
        <div>Loading...</div>
    );
}
