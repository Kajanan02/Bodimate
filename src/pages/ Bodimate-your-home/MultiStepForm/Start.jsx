import React from "react";
import "./start.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import place from '../../../assets/place/place.jpg'; // Adjust the path to your actual image

const BodimateStart = () => {
    return (
        <div className="container ">
            <div className="row align-items-center">
                {/* Left Side: Vertically Centered Heading */}
                <div className="col-md-6 header-unique">
                    <h1>It's easy to get started on Bodimate</h1>
                </div>

                {/* Right Side: Steps */}
                <div className="col-md-6 steps-container-unique">
                    <div className="step-unique row">
                        <div className="col-md-8">
                            <h2>1 Tell us about your place</h2>
                            <p>Share some basic info, like where it is and how many guests can stay.</p>
                        </div>
                        <div className="col-md-4">
                            <img
                                src={place}  // Replace with your image
                                alt="Tell us about your place"
                                className="img-fluid step-img-unique"
                            />
                        </div>
                    </div>

                    <div className="step-unique row">
                        <div className="col-md-8">
                            <h2>2 Make it stand out</h2>
                            <p>Add 5 or more photos plus a title and description we'll help you out.</p>
                        </div>
                        <div className="col-md-4">
                            <img
                                src={place}  // Replace with your image
                                alt="Make it stand out"
                                className="img-fluid step-img-unique"
                            />
                        </div>
                    </div>

                    <div className="step-unique row">
                        <div className="col-md-8">
                            <h2>3 Finish up and publish</h2>
                            <p>Choose a starting price, verify a few details, then publish your listing.</p>
                        </div>
                        <div className="col-md-4">
                            <img
                                src={place} // Replace with your image
                                alt="Finish up and publish"
                                className="img-fluid step-img-unique"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BodimateStart;
