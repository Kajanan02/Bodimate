import React, {useEffect, useState} from 'react';
import BoardingCard from "./boarding-card/boarding-card.jsx";
import bording from '../../assets/home/Big Card.png';
import homeContact from "../../assets/neaby-university/contact us.png";
import uva from '../../assets/neaby-university/uwu.jpg'

import './home.css';
import axiosInstance from "../../utils/axiosInstance.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {setLoading} from "../../redux/features/loaderSlice.js";
import BoardingOwnerHome from "../admin/home/boarding-owner-home.jsx";

function Home() {

    const [listingsAllList, setListingsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [listingsList, setListingsList] = useState([]);
    const navigate = useNavigate();
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
    const userDetail = useSelector(state => state.userData.userDetails);


    const uniqueUniversitiesMap = new Map();

    listingsList.forEach(data => {
        if (nearestUniversitySet.has(data.nearestUniversity) && !uniqueUniversitiesMap.has(data.nearestUniversity)) {
            uniqueUniversitiesMap.set(data.nearestUniversity, data);
        }
    });

    const uniqueUniversitiesList = Array.from(uniqueUniversitiesMap.values());


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



    return (

        <div>
            <div className="container padx-sm-3 padx-md-4 pad-lg-20 home-container">
                <div className="main-image-container">
                    <img src={bording} alt="Main" className="main-image"/>
                    <div className="overlay-text">
                        <h1>Not sure where to go? Perfect.</h1>
                        <button className="btn btn-flexible mt-3"> I'm flexible</button>
                    </div>
                </div>

                <div className="subheading mt-5">Discover Boarding</div>

                <div className="row mt-4">
                    {listingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (

                        <div key={index + "asd"} className="col-12 col-md-6 col-lg-3 mb-4">
                            <BoardingCard data={data} />
                        </div>

                ))}
                {listingsList.length === 0 &&
                    <div className={"text-center py-5 fw-bold"}>No Listings Data Found, Please Add</div>
                }

                    <div className="text-center mt-4">
                        <button className="btn btn-secondary">Show more</button>
                    </div>
                </div>
            </div>
            <div className="explore-container mt-5 padx-sm-3 padx-md-4 pad-lg-20 my-5 py-5">
                <div className={"container"}>
                    <div className="subheading mt-5">Explore nearby universities</div>
                    <div className="row">
                        <div className="row">
                            {uniqueUniversitiesList
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                .slice(0, 4)
                                .map((data, index) => (
                                    <div className="col-12 col-md-6 col-lg-3 mb-4 cursor-pointer" key={index + "asd"} onClick={() => navigate("/nearby-university/" + data.nearestUniversity)}>
                                        <div className="university-card d-flex align-items-center">
                                            <img src={uva} alt={data.nearestUniversity} className="university-image"/>
                                            <div className="ms-2">
                                                <h5 className="university-name">{data.nearestUniversity}</h5>
                                                <p className="university-drive">15 minute drive</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"container pb-5 pt-3"}>
                <div className="Contact-image-container   pad-lg-20 my-5">
                    <img src={homeContact} alt="Main" className="Contact-image"/>
                    <div className="">
                        <h1 className="home-overlay-text">Questions <br/>about <br/>hosting?</h1>
                        <button className="btn btn-light mt-3 p-2 home-overlay-btn px-4" onClick={() => navigate("/contact-us")}>Contact us</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;