import React from 'react';
import bording from '../../../assets/boarding-details/description.jpg';
import verifiedIcon from "../../../assets/boarding-details/verified.svg";
import FeatherIcon from "feather-icons-react";
import './boarding-card.css';
import {useNavigate} from "react-router-dom";

const BoardingCard = () => {

    const navigate = useNavigate();

    return (
        <div className="card bodimate-card cursor-pointer" onClick={() => navigate("/nearby-university")}>
            <div className="position-relative">
                <img src={bording} alt="Listing" className="img-fluid w-100 h-auto"/>
                <div className="heart-icon">
                    <FeatherIcon className="" icon={"heart"}/>
                </div>
            </div>
            <div className="p-3">
                <h6 className="review-rating p-0 m-0">
                    <FeatherIcon icon={"star"}/> 4.8<span> (233 reviews)</span>
                </h6>
                <h5 className="d-flex justify-content-between align-items-center fs-6 p-0 m-0">
                    Nugegoda, Colombo
                    <img src={verifiedIcon} alt="Verified Icon" className="verified-icon"/>
                </h5>
                <p className="card-text p-0 m-0">
                    University of Sri Jayewardenepura <br/>
                </p>
                <p className="price">Rs. 98,670 <span className="per-night">(Monthly)</span></p>
            </div>
        </div>
    );
};

export default BoardingCard;
