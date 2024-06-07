import React from 'react';
import Collection from '../../assets/neaby-university/collection.jpg';
import './explore-nearby-universities.css';

import {useNavigate} from "react-router-dom";

function ExploreNearbyUniversities() {

    const navigate = useNavigate();
    return (
        <div className="explore-container mt-5 padx-sm-3 padx-md-4 pad-lg-20 my-5">
            <div className="container">
                <div className="collection-subheading mt-5">Explore nearby universities</div>
                <div className="row">
                    {[...Array(12)].map((_, idx) => (
                        <div className=" nearby-container col-md-6 col-lg-6 " key={idx}>
                            <div className="nearbyin-container pb-md-0 ps-sm-0 pt-3 col-12 ">
                                <div className="position-relative text-center">
                                    <img src={Collection} alt="University" className="collection-image" />
                                    <div>
                                        <button className="btn btn-Collection custom-mt-5 mt-2 py-1 px-3 text-start rounded-pill university-overlay-btn">
                                            <b className="collecton-text"> Collection </b>
                                        </button>
                                        <div className="collection-overlay-text text-start custom-border-radius">
                                            Nearby University of Peradeniya
                                        </div>
                                        <button className="btn btn-light custom-mt-5 mt-3 p-2 text-start custom-border-radius py-1 px-2 collection-overlay-btn" onClick={() => navigate("/nearby-university")}>
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
