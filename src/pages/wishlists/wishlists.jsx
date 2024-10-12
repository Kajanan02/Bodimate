import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardingCard from "../home/boarding-card/boarding-card.jsx";
import './nearby-university.css';
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import {setLoading} from "../../redux/features/loaderSlice.js";

function NearbyUniversity() {
    const { universityName } = useParams();
    const [selectedPlace, setSelectedPlace] = useState('All');
    const [listingsAllList, setListingsAllList] = useState([]);
    const [listingsList, setListingsList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));

        axiosInstance.get("/boardings/getAllBoarding")
            .then((res) => {
                setListingsList(res.data);
                setListingsAllList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [dispatch]);

    const filteredListings = listingsList
        .filter(data => data.nearestUniversity === universityName)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt date

    const cities = filteredListings.map(listing => listing.street);
    const uniqueCities = [...new Set(cities)];
    const filteredByCity = selectedPlace === 'All'
        ? filteredListings
        : filteredListings.filter(data => data.street === selectedPlace);

    return (
        <div>
            <div className="container padx-sm-3 padx-md-4 pad-lg-20">
                <div className="subheading mt-5">Discover Nearby - {universityName}</div>
                <div className="d-flex flex-wrap gap-2 p-2 m-2 place-buttons" role="group" aria-label="Place Suggestions">
                    {['All', ...uniqueCities].map((city, index) => (
                        <button
                            type="button"
                            className={`d-flex justify-content-center align-items-center p-2 btn ${selectedPlace === city ? 'btn-black' : 'btn-white'}`}
                            key={index}
                            onClick={() => setSelectedPlace(city)}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                <div className="row mt-4">
                    {filteredByCity.length > 0 ? (
                        filteredByCity.map((data, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
                                <BoardingCard data={data} />
                            </div>
                        ))
                    ) : (
                        <p>No listings available for {universityName}.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default NearbyUniversity;
