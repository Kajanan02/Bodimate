import React, {useEffect, useState} from 'react';
import Collection from '../../assets/neaby-university/collection.jpg';
import './explore-nearby-universities.css';

import {useNavigate} from "react-router-dom";
import BoardingCard from "../home/boarding-card/boarding-card.jsx";
import {useDispatch} from "react-redux";
import {toggleLoader} from "../../redux/action.js";
import axiosInstance from "../../utils/axiosInstance.js";

function ExploreNearbyUniversities() {

    const navigate = useNavigate();
    const [selectedPlace, setSelectedPlace] = useState('All');
    const [listingsAllList, setListingsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [listingsList, setListingsList] = useState([]);

    useEffect(() => {
        dispatch(toggleLoader(true));

        axiosInstance.get("/boardings/getAllBoarding")
            .then((res) => {
                console.log(res.data);
                setListingsList(res.data);
                setListingsAllList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(toggleLoader(false));
            });
    }, [update]);

    const nearestUniversity = [
        "Eastern University, Sri Lanka (EUSL)",
        "Open University of Sri Lanka, The (OUSL)",
        "Rajarata University of Sri Lanka (RUSL)",
        "Sabaragamuwa University of Sri Lanka (SUSL)",
        "South Eastern University of Sri Lanka (SEUSL)",
        "University of Colombo (CBO)",
        "University of Jaffna (UJA)",
        "University of Kelaniya (KLN)",
        "University of Moratuwa (MRT)",
        "University of Peradeniya (PDN)",
        "University of Ruhuna (RUH)",
        "University of Sri Jayewardenepura (SJP)",
        "University of the Visual and Performing Arts (UVPA)",
        "Uva Wellassa University of Sri Lanka (UWU)",
        "Wayamba University of Sri Lanka (WUSL)"
    ];
    const nearestUniversitySet = new Set(nearestUniversity);
    const uniqueUniversitiesMap = new Map();

    listingsList.forEach(data => {
        if (nearestUniversitySet.has(data.nearestUniversity) && !uniqueUniversitiesMap.has(data.nearestUniversity)) {
            uniqueUniversitiesMap.set(data.nearestUniversity, data);
        }
    });

    const uniqueUniversitiesList = Array.from(uniqueUniversitiesMap.values());
    return (
        <div className="explore-container mt-5 padx-sm-3 padx-md-4 pad-lg-20 my-5">
            <div className="container">
                <div className="collection-subheading mt-5">Explore nearby universities</div>
                <div className="row">
                    {uniqueUniversitiesList
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt date
                        .map((data, index) => (
                            <div className="nearby-container col-md-6 col-lg-6" key={index + "asd"}>
                                <div className="nearbyin-container pb-md-0 ps-sm-0 pt-3 col-12">
                                    <div className="position-relative text-center">
                                        <img src={Collection} alt="University" className="collection-image"/>
                                        <div>
                                            <button
                                                className="btn btn-Collection custom-mt-5 mt-2 py-1 px-3 text-start rounded-pill university-overlay-btn">
                                                <b className="collection-text">Collection</b>
                                            </button>
                                            <div
                                                className="collection-overlay-text text-start custom-border-radius">
                                                {data.nearestUniversity}
                                            </div>
                                            <button
                                                className="btn btn-light custom-mt-5 mt-3 p-2 text-start custom-border-radius py-1 px-2 collection-overlay-btn"
                                                onClick={() => navigate("/nearby-university/"+data.nearestUniversity)}>

                                                <b>Show all</b>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                </div>
            </div>
        </div>
    );
}

export default ExploreNearbyUniversities;
