import React, {useEffect, useState} from 'react';
import Collection1 from '../../assets/neaby-university/room1.jpg';
import Collection2 from '../../assets/neaby-university/room2.jpg';
import Collection3 from '../../assets/neaby-university/room3.jpg';
import Collection4 from '../../assets/neaby-university/room4.jpg';
import './explore-nearby-universities.css';

import {useNavigate} from "react-router-dom";
import BoardingCard from "../home/boarding-card/boarding-card.jsx";
import {useDispatch} from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import {setLoading} from "../../redux/features/loaderSlice.js";

function ExploreNearbyUniversities() {

    const navigate = useNavigate();
    const [selectedPlace, setSelectedPlace] = useState('All');
    const [listingsAllList, setListingsAllList] = useState([]);
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [listingsList, setListingsList] = useState([]);


    let images = [Collection1,Collection2,Collection3,Collection4]

    useEffect(() => {
        dispatch(setLoading(true));

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
                dispatch(setLoading(false));
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
    const [universityList, setUniversityList] = useState([]);
    const [universityAllList, setUniversityAllList] = useState([]);
    const uniqueUniversitiesMap = new Map();

    listingsList.forEach(data => {
        if (nearestUniversitySet.has(data.nearestUniversity) && !uniqueUniversitiesMap.has(data.nearestUniversity)) {
            uniqueUniversitiesMap.set(data.nearestUniversity, data);
        }
    });

    useEffect(() => {
        dispatch(setLoading(true));

        axiosInstance.get("/university/getAllUniversity")
            .then((res) => {
                console.log(res.data);
                setUniversityList(res.data);
                setUniversityAllList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [update]);

    const uniqueUniversitiesList = Array.from(uniqueUniversitiesMap.values());
    return (
        <div className="explore-container mt-5 padx-sm-3 padx-md-4 pad-lg-20 my-5">
            <div className="container">
                <div className="collection-subheading mt-5">Explore nearby universities</div>
                <div className="row">
                    {universityList
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt date
                        .map((data, index) => (
                            <div className="nearby-container col-md-6 col-lg-6" key={index + "asd"}>
                                <div className="nearbyin-container pb-md-0 ps-sm-0 pt-3 col-12">
                                    <div className="position-relative text-center">
                                        <img src={images[index]} alt="University" className="collection-image"/>
                                        <div className="university-info">
                                            <img src={data.universityImg} alt="University" className="university-image"/>
                                            <span className="university-name">{data.universityName}</span>
                                        </div>
                                        <button
                                            className="btn btn-light custom-mt-5 mt-3 p-2 text-start custom-border-radius py-1 px-2 collection-overlay-btn"
                                            onClick={() => navigate("/nearby-university/" + data.universityName)}>
                                            <b>Show all</b>
                                        </button>
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
