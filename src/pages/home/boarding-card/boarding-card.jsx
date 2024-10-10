import React, {useEffect, useState} from 'react';
import bording from '../../../assets/boarding-details/description.jpg';
import verifiedIcon from "../../../assets/boarding-details/verified.svg";
import FeatherIcon from "feather-icons-react";
import './boarding-card.css';
import {useNavigate} from "react-router-dom";
import Heart from "react-heart";
import {toggleLoader} from "../../../redux/action.js";
import axiosInstance from "../../../utils/axiosInstance.js";
import {useDispatch} from "react-redux";
import axios from "axios";

const BoardingCard = ({data}) => {

    const navigate = useNavigate();
    console.log(data);
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setActive(!active); //
    };

    return (
        <div>

        <div className="card bodimate-card " >
            <div className="position-relative">
                <img src={bording} alt="Listing" className="img-fluid w-100 h-auto"/>
                <div className="heart-icon">
                    <div
                        className="btn btn-heart ms-auto p-0"
                        style={{
                            width: "1.5rem",
                            border: "none",
                            outline: "none"
                        }}
                    >
                        <Heart
                            isActive={active}
                            onClick={handleClick}
                            style={{
                                border: "none",
                                outline: "none"
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="p-3 cursor-pointer" onClick={() => navigate("/boarding-details/"+data._id)}>
                <h6 className="review-rating p-0 m-0">
                    <FeatherIcon icon={"star"}/> 4.8<span> (233 reviews)</span>
                </h6>
                <h5 className="d-flex align-items-center fs-6 p-0 m-0">
                    {data.street},{data.district}

                    <img src={verifiedIcon} alt="Verified Icon" className="verified-icon"/>
                </h5>
                <p className="card-text p-0 m-0">{data.nearestUniversity}
                    <br/>
                </p>
                <p className="price">{data.pricePerMonth} <span className="per-night">(Monthly)</span></p>
            </div>
        </div>
        </div>


    );
};

export default BoardingCard;
