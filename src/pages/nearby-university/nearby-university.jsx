import React, { useState } from 'react';
import BoardingCard from "../home/boarding-card/boarding-card.jsx";
import './nearby-university.css';

function NearbyUniversity() {
    const places = [
        'All', 'Thurstan Road', 'Reid Avenue', 'Elvitigala Mawatha',
        'Wijerama Mawatha', 'Ward Place', 'Maitland Crescent',
        'Bauddhaloka ', 'Cumaratunga Munidasa Road'
    ];

    const [selectedPlace, setSelectedPlace] = useState('All');

    return (
        <div>
            <div className="container padx-sm-3 padx-md-4 pad-lg-20 ">
                <div className="subheading mt-5">Discover Nearby -University of Colombo</div>
                <div className="d-flex flex-wrap gap-2 p-2 m-2 place-buttons" role="group" aria-label="Place Suggestions">
                    {places.map((place, index) => (
                        <button
                            type="button"
                            className={`d-flex justify-content-center align-items-center p-2 btn ${selectedPlace === place ? 'btn-black' : 'btn-white'}`}
                            key={index}
                            onClick={() => setSelectedPlace(place)}
                        >
                            {place}
                        </button>
                    ))}
                </div>


                <div className="row mt-4">
                    {[...Array(12)].map((_, idx) => (
                        <div key={idx} className="col-12 col-md-6 col-lg-3 mb-4">
                            <BoardingCard/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NearbyUniversity;
