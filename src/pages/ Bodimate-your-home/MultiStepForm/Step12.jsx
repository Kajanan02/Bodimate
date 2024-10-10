import React from 'react';
import './step12.css'; // External CSS for styling
import previewImage from '../../../assets/boarding-details/description.jpg';
import { Button } from "react-bootstrap"; // Bootstrap buttons

const ListingReview = ({ nextStep, prevStep }) => {
    return (
        <div className="listing-review-container">
            <div className="header">
                <h1>Review your listing</h1>
                <p>Here's what we'll show to guests. Make sure everything looks good.</p>
            </div>

            <div className="content-wrapper">
                <div className="listing-preview">
                    <div className="preview-image-container">
                        <button className="preview-btn">Show preview</button>
                        <img src={previewImage} alt="Preview" className="preview-image" />
                        <p className="listing-title">sss</p>
                    </div>
                    <div className="preview-info">
                        <div className="price-new-container">
                            <p className="listing-price">
                                <del>Rs122,600</del>
                                <span>Rs98,080 night</span>
                            </p>
                            <p className="listing-new">New ★</p>
                        </div>
                    </div>
                </div>

                <div className="next-steps">
                    <h3>What's next?</h3>
                    <ul>
                        <li>
                            <i className="icon icon-details"></i>
                            Confirm a few details and publish
                        </li>
                        <li>
                            <i className="icon icon-calendar"></i>
                            Set up your calendar
                        </li>
                        <li>
                            <i className="icon icon-settings"></i>
                            Adjust your settings
                        </li>
                    </ul>
                </div>
            </div>

            <div className="button-container">
                <Button variant="secondary" className="btt-back" onClick={prevStep}>Back</Button>
                <Button variant="primary" className="btt-next" onClick={nextStep}>Next</Button>
            </div>
        </div>
    );
};

export default ListingReview;
