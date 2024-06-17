import React, {useEffect, useRef, useState} from 'react';
import descriptionImg from "../../assets/boarding-details/description.jpg";
import FeatherIcon from 'feather-icons-react';
import verifiedIcon from "../../assets/boarding-details/verified.svg"
import ownerProfile from "../../assets/boarding-details/OwnerProfile.jpg"
import DegreeView from "./degreeView.jsx";

function BoardingDetails() {

    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const reviewRef = useRef(null);

    useEffect(() => {
        if (reviewRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(reviewRef.current).lineHeight);
            const maxHeight = 3 * lineHeight;
            if (reviewRef.current.clientHeight > maxHeight) {
                setShowButton(true);
            }
        }
    }, []);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const [modalShow, setModalShow] = useState(false);
    const imageSrc = "https://via.placeholder.com/800x400";
    const [guestCount, setGuestCount] = useState(0);

    const incrementGuestCount = () => {
        setGuestCount((prevCount) => Math.min(prevCount + 1, 20));
    };

    const decrementGuestCount = () => {
        setGuestCount((prevCount) => Math.max(prevCount - 1, 0));
    };

    return (
        <div className="container padx-sm-3 padx-md-4 pad-lg-20">
            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <h2 className="mt-4 mb-3 des-text pe-3 fw-bold">Nugegoda, Colombo</h2>
                    <img src={verifiedIcon} alt="Verified Icon" className="verified-icon mt-4 mb-3"/>
                    <button type="button" className="btn btn-heart ms-auto p-0">
                        <FeatherIcon className="action-icons-color mt-4 mb-3" icon="heart"/>
                    </button>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <p className="fw-bold des-sub-text">University of Sri Jayewardenepura</p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12 des-img">
                    <div className="row g-3">
                        <div className="col-lg-6 col-md-11">
                            <img src={descriptionImg} alt="Boarding Image"
                                 className="img-fluid col6-des-img rounded-20"/>
                        </div>
                        <div className="col-lg-6 col-md-11">
                            <div className="row g-3 position-relative">
                                <div className="col-6">
                                    <img src={descriptionImg} alt="Boarding Image" className="img-fluid rounded-20"/>
                                </div>
                                <div className="col-6">
                                    <img src={descriptionImg} alt="Boarding Image" className="img-fluid rounded-20"/>
                                </div>
                                <div className="col-6">
                                    <img src={descriptionImg} alt="Boarding Image" className="img-fluid rounded-20"/>
                                </div>
                                <div className="col-6 position-relative">
                                    <img src={descriptionImg} alt="Boarding Image" className="img-fluid rounded-20"/>
                                    <div>
                                        <button
                                            type="button"
                                            className="btn btn-360-view position-absolute d-flex align-items-center"
                                            onClick={() => setModalShow(true)}
                                        >
                                            <FeatherIcon className="deg-icons me-2" icon="mail"/>
                                            Show 360-Degree View
                                        </button>

                                        <DegreeView
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                            imageSrc={imageSrc}
                                            title="360-Degree View"
                                            alt="360-Degree Image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-lg-8">
                    <div className="col d-flex align-items-center justify-content-between">
                        <div>
                            <div className="owner-text fw-bolder">
                                <p>Boarding hosted by Deva</p>
                            </div>
                            <div className="owner-text-des">
                                <p>6 guests · 6 bedroom · 3 bed · 1 private bathroom</p>
                            </div>
                        </div>
                        <div>
                            <img src={ownerProfile} alt="Profile Picture" className="owner-profile"/>
                        </div>
                    </div>
                    <hr className="my-4"/>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="home"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Accommodation Name</h4>
                            <p className="detail-description">Deva Residence</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="map-pin"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Location</h4>
                            <p className="detail-description">No. 123, XYZ Lane, Nugegoda, Colombo, Sri Lanka.</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="map"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Distance to University</h4>
                            <p className="detail-description">Deva is conveniently located within walking distance of
                                the University of Colombo, making it
                                an ideal choice for students seeking proximity to campus.</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="home"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Room Types</h4>
                            <p className="detail-description">Deva offers a variety of room types to suit your needs,
                                including spacious single rooms and
                                cozy shared rooms. Each room is furnished with a comfortable bed, study desk, chair, and
                                ample storage space.</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="wifi"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Amenities</h4>
                            <div className="detail-description">
                                <div className="des-point">
                                    <span className="bullet">&#8226;</span> High-speed Wi-Fi internet access throughout
                                    the building
                                </div>
                                <div className="des-point">
                                    <span className="des-bullet">&#8226;</span> Shared kitchen facilities equipped with
                                    stoves, refrigerators, and microwaves
                                </div>
                                <div className="des-point">
                                    <span className="des-bullet">&#8226;</span> On-site laundry facilities for added
                                    convenience
                                </div>
                                <div className="des-point">
                                    <span className="des-bullet">&#8226;</span> Secure parking available for residents
                                    with
                                    vehicles
                                </div>
                                <div className="des-point">
                                    <span className="des-bullet">&#8226;</span> 24/7 security surveillance to ensure
                                    your
                                    safety and peace of mind
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="home"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Price</h4>
                            <p className="detail-description">Advance: Rs. 5,000 & Rent: Rs. 4,000 per month for a
                                person.</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="home"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Transportation Options</h4>
                            <p className="detail-description">Public transportation options, including buses and trains,
                                are easily accessible from Deva.
                                Additionally, bicycle rental services are available nearby for students who prefer
                                eco-friendly
                                commuting options.</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="shield"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Security</h4>
                            <p className="detail-description">Our boarding features 24-hour security surveillance and
                                controlled access entry to ensure
                                the safety and well-being of our residents.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 d-flex justify-content-end">
                    <div className="card price-card border p-4">
                        <p className="detail-heading">Rs. 4000 (per month)</p>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="checkInDate" className="form-label price-card-text">Check-in
                                    Date</label>
                                <input type="date" className="form-control" id="checkInDate"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="checkOutDate" className="form-label price-card-text">Check-out
                                    Date</label>
                                <input type="date" className="form-control" id="checkOutDate"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="guestsSelect" className="form-label price-card-text">Number of
                                    Guests</label>
                                <div className="details-input-group d-flex">
                                    <div className="input-group-prepend pe-2">
                                        <button
                                            type="button"
                                            className="btn btn-decrease d-flex align-items-center justify-content-center"
                                            onClick={decrementGuestCount}
                                        >-
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control text-center rounded"
                                        placeholder="Add guests"
                                        value={guestCount === 0 ? '' : `${guestCount} Guest${guestCount > 1 ? 's' : ''}`}
                                        readOnly
                                    />
                                    <div className="input-group-append ps-2">
                                        <button
                                            type="button"
                                            className="btn btn-increase d-flex align-items-center justify-content-center"
                                            onClick={incrementGuestCount}
                                        >+
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col p-2">
                            <button type={"button"} className="btn login-btn w-100 fw-semibold p-2">Reserve
                            </button>
                        </div>
                        <p className="text-muted mb-3 text-center">You will not be charged yet</p>
                        <div className="d-flex justify-content-between mb-3 price-card-text">
                            <span className={"fw-bold"}>Price Reason:</span>
                            <span>Price: Rs. 4000 (per month)</span>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between mb-3 price-card-text">
                            <span className={"fw-bold"}>Total Price:</span>
                            <span>Rs. 4000</span>
                        </div>
                    </div>
                </div>
                <hr className="my-4"/>
            </div>
            <div className="row">
                <h3 className="review-heading pb-3">Reviews</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-11 mb-4">
                                <div className="row d-flex align-items-center align-middle">
                                    <div className="col-md-3 review-category">
                                        <p className={"para-margin"}>Check-in</p>
                                    </div>
                                    <div className="col-10 col-lg-8">
                                        <div className="review-rate-bar">
                                            <div className="review-rate-fill" style={{width: '90%'}}></div>
                                        </div>
                                    </div>
                                    <div className="col-2 col-lg-1">
                                        <p className="review-rate-text">4.5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-11 mb-4">
                                <div className="row d-flex align-items-center align-middle">
                                    <div className="col-md-3 review-category">
                                        <p className={"para-margin"}>Value</p>
                                    </div>
                                    <div className="col-10 col-lg-8">
                                        <div className="review-rate-bar">
                                            <div className="review-rate-fill" style={{width: '90%'}}></div>
                                        </div>
                                    </div>
                                    <div className="col-1 col-lg-1">
                                        <p className="review-rate-text">4.5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-11 mb-4">
                                <div className="row d-flex align-items-center align-middle">
                                    <div className="col-md-3 review-category">
                                        <p className={"para-margin"}>Accuracy</p>
                                    </div>
                                    <div className="col-10 col-lg-8">
                                        <div className="review-rate-bar">
                                            <div className="review-rate-fill" style={{width: '90%'}}></div>
                                        </div>
                                    </div>
                                    <div className="col-1 col-lg-1">
                                        <p className="review-rate-text">4.5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-11 mb-4">
                                <div className="row d-flex align-items-center align-middle">
                                    <div className="col-md-3 review-category">
                                        <p className={"para-margin"}>Location</p>
                                    </div>
                                    <div className="col-10 col-lg-8">
                                        <div className="review-rate-bar">
                                            <div className="review-rate-fill" style={{width: '60%'}}></div>
                                        </div>
                                    </div>
                                    <div className="col-1 col-lg-1">
                                        <p className="review-rate-text">3.5</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-4"/>
            <div className="row pb-5">
                <div className="col-md-6 col-12">
                    <div className="row pb-5">
                        <div className="col-md-2 col-3">
                            <img src={ownerProfile} alt="Profile Picture" className="reviewer-profile"/>
                        </div>
                        <div className="col-md-9 col-9">
                            <p className="reviewer-name para-margin">John Doe</p>
                            <p className="review-date para-margin pb-3">January 1, 2024</p>
                            <div>
                                <p ref={reviewRef} className="reviewer-review" style={{
                                    maxHeight: expanded ? 'none' : '3.6em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.2em',
                                    marginBottom: '0',
                                    fontSize: '16px',
                                    fontFamily: 'Inter',
                                    color: 'var(--secondary-text-color)'
                                }}>
                                    This boarding booking system has been a lifesaver! Before, managing reservations was
                                    a nightmare of phone calls and emails. Now, everything is online and streamlined.
                                    Customers can easily book appointments, see availability, and even upload pet
                                    documents. It is saved me tons of time and reduced confusion.
                                </p>
                                {showButton && (
                                    <button className="btn btn-link text-dark"
                                            onClick={toggleExpanded}>{expanded ? 'Show less' : 'Show more'}</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row pb-5">
                        <div className="col-md-2 col-3">
                            <img src={ownerProfile} alt="Profile Picture" className="reviewer-profile"/>
                        </div>
                        <div className="col-md-9 col-9">
                            <p className="reviewer-name para-margin">Jane Smith</p>
                            <p className="review-date para-margin pb-3">January 1, 2024</p>
                            <div>
                                <p ref={reviewRef} className="reviewer-review" style={{
                                    maxHeight: expanded ? 'none' : '3.6em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.2em',
                                    marginBottom: '0',
                                    fontSize: '16px',
                                    fontFamily: 'Inter',
                                    color: 'var(--secondary-text-color)'
                                }}>
                                    This boarding booking system has been a lifesaver! Before, managing reservations was
                                    a nightmare of phone calls and emails. Now, everything is online and streamlined.
                                    Customers can easily book appointments, see availability, and even upload pet
                                    documents. It is saved me tons of time and reduced confusion.
                                </p>
                                {showButton && (
                                    <button className="btn btn-link text-dark"
                                            onClick={toggleExpanded}>{expanded ? 'Show less' : 'Show more'}</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row pb-5">
                        <div className="col-md-2 col-3">
                            <img src={ownerProfile} alt="Profile Picture" className="reviewer-profile"/>
                        </div>
                        <div className="col-md-9 col-9">
                            <p className="reviewer-name para-margin">Jane Smith</p>
                            <p className="review-date para-margin pb-3">January 1, 2024</p>
                            <div>
                                <p ref={reviewRef} className="reviewer-review" style={{
                                    maxHeight: expanded ? 'none' : '3.6em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.2em',
                                    marginBottom: '0',
                                    fontSize: '16px',
                                    fontFamily: 'Inter',
                                    color: 'var(--secondary-text-color)'
                                }}>
                                    This boarding booking system has been a lifesaver! Before, managing reservations was
                                    a nightmare of phone calls and emails. Now, everything is online and streamlined.
                                    Customers can easily book appointments, see availability, and even upload pet
                                    documents. It is saved me tons of time and reduced confusion.
                                </p>
                                {showButton && (
                                    <button className="btn btn-link text-dark"
                                            onClick={toggleExpanded}>{expanded ? 'Show less' : 'Show more'}</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row pb-5">
                        <div className="col-md-2 col-3">
                            <img src={ownerProfile} alt="Profile Picture" className="reviewer-profile"/>
                        </div>
                        <div className="col-md-9 col-9">
                            <p className="reviewer-name para-margin">Jane Smith</p>
                            <p className="review-date para-margin pb-3">January 1, 2024</p>
                            <div>
                                <p ref={reviewRef} className="reviewer-review" style={{
                                    maxHeight: expanded ? 'none' : '3.6em',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '1.2em',
                                    marginBottom: '0',
                                    fontSize: '16px',
                                    fontFamily: 'Inter',
                                    color: 'var(--secondary-text-color)'
                                }}>
                                    This boarding booking system has been a lifesaver! Before, managing reservations was
                                    a nightmare of phone calls and emails. Now, everything is online and streamlined.
                                    Customers can easily book appointments, see availability, and even upload pet
                                    documents. It is saved me tons of time and reduced confusion.
                                </p>
                                {showButton && (
                                    <button className="btn btn-link text-dark"
                                            onClick={toggleExpanded}>{expanded ? 'Show less' : 'Show more'}</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BoardingDetails;
