import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs,} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>

    <GoogleMap
        defaultZoom={15}
        defaultCenter={{lat: props.location.lat, lng: props.location.lng}}
    >
        <Marker
            position={{lat: props.location.lat, lng: props.location.lng}}
        />
    </GoogleMap>
));

export default function BoardingLocation({location}) {

    console.log(location)

    return (location ?
        <div>
            <MapWithAMarker
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAP}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `400px`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
                location={location}
            />
        </div> : null
    );
}
