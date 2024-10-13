import React, {useEffect, useRef, useState} from 'react';
import descriptionImg from "../../assets/boarding-details/description.jpg";
import FeatherIcon from 'feather-icons-react';
import verifiedIcon from "../../assets/boarding-details/verified.svg"
import ownerProfile from "../../assets/boarding-details/OwnerProfile.jpg"
import DegreeView from "./degreeView.jsx";
import {useDispatch, useSelector} from "react-redux";
import axiosInstance from "../../utils/axiosInstance.js";
import {useParams} from "react-router-dom";
// import Heart from "react-heart";
import axios from "axios";
import {CheckoutParams, CurrencyType, Customer, PayhereCheckout} from "@payhere-js-sdk/client";
import {setLoading} from "../../redux/features/loaderSlice.js";

function BoardingDetails() {

    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const reviewRef = useRef(null);
    const [active, setActive] = useState(false)
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [List, setList] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const imageSrc = "https://via.placeholder.com/800x400";
    const [guestCount, setGuestCount] = useState(0);
    const {id} = useParams()
    const extractNumericValue = (currencyString) => {
        if (typeof currencyString === 'string') {
            return parseInt(currencyString.replace(/[^\d]/g, ''), 10);
        }
        return 0;
    };
    const [err,setErr] = useState(null)

    const userDetail = useSelector(state => state.userData.userDetails);
    const [value,setValue] = useState({})



    function handleChange(event) {
        setValue(value => ({...value, [event.target.name]: event.target.value}));
    }

    console.log(value)

    function onPayhereCheckoutError(errorMsg) {
        alert(errorMsg);
    }

    async function checkout(hash, amount, orderId) {
        // using async await
        try {
            const customerAttributes = {
                first_name: userDetail?.firstName,
                last_name: userDetail?.lastName,
                phone: userDetail?.contactNo,
                email: userDetail?.email,
                address: userDetail?.address,
                city: userDetail?.address,
                country: 'Sri Lanka',
            };
            const customer = new Customer(customerAttributes);


            const checkoutData = new CheckoutParams({
                returnUrl: window.location.hostname === "localhost"? 'http://localhost:3000/payment-complete':`${window.location.protocol}//${window.location.hostname}/payment-complete`,
                cancelUrl: window.location.hostname === "localhost"? 'http://localhost:3000/payment-complete':`${window.location.protocol}//${window.location.hostname}/payment-complete`,
                notifyUrl: window.location.hostname === "localhost"? 'http://localhost:3000/payment-complete':`${window.location.protocol}//${window.location.hostname}/payment-complete`,
                order_id: orderId,
                itemTitle: 'Boarding Fees',
                currency: CurrencyType.LKR,
                amount: amount,
                hash: hash,
            });


            const checkout = new PayhereCheckout(customer, checkoutData, onPayhereCheckoutError);
            checkout.start();
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        if (!formSubmitted) {
            return
        }
        dispatch(setLoading(true))
        let data = {}
        data.amount = totalPrice
        data.checkInDate= value.checkInDate
        data.checkOutDate = value.checkOutDate
        data.boardingId = List._id
        data.ownerId = List.boardingOwner
        data.studentId = userDetail._id
        data.memberCount= guestCount
        data.orderId = parseInt(Math.random() * 10000000000000000)
        console.log(data)
        axiosInstance.post(`/payment/payment-hash`, data)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                if (res.data) {
                    console.log(data.amount)
                    console.log(res.data.booking._id)
                     checkout(res.data.hash, data.amount, res.data.booking._id)
                }
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setFormSubmitted(false)
            dispatch(setLoading(false))

        })
    }, [formSubmitted]);

    const advancedPayment = extractNumericValue(List.advancedPayment) || 500;
    const totalPrice = advancedPayment * guestCount;


    useEffect(() => {
        if (reviewRef.current) {
            const lineHeight = parseInt(window.getComputedStyle(reviewRef.current).lineHeight);
            const maxHeight = 3 * lineHeight;
            if (reviewRef.current.clientHeight > maxHeight) {
                setShowButton(true);
            }
        }
    }, []);

    function reserve() {
        setFormSubmitted(true)
    }

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };



    const incrementGuestCount = () => {
        if(guestCount +1 >List.membersCount){
            setErr("Maximum members count is "+ List.membersCount)
            return
        }
        setGuestCount((prevCount) => Math.min(prevCount + 1, 20));
    };

    const decrementGuestCount = () => {
        console.log(List.membersCount)
        console.log(guestCount)
        if(List.membersCount > guestCount){
            return
        }
        setGuestCount((prevCount) => Math.max(prevCount - 1, 0));
    };



    useEffect(() => {
        dispatch(setLoading(true));

        axiosInstance.get(`/boardings/getOneBoarding/${id}`)
            .then((res) => {
                console.log(res.data);
                setList(res.data);

            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, []);

    useEffect(() => {
        if (update) {
            dispatch(setLoading(true));

            axios.put(`http://localhost:5000/api/saveboarding/user/${values._id}/boarding/${values._id}`, values)
                .then((res) => {
                    console.log(res.data);
                    setActive(res.data.isActive); // Adjust based on API response structure
                })
                .catch((err) => {
                    console.error("Error updating boarding state:", err);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        }
    }, [update]);


    return (
        <div className="container padx-sm-3 padx-md-4 pad-lg-20">

            <div className="row">
                <div className="col-12 d-flex align-items-center">
                    <h2 className="mt-4 mb-3 des-text pe-3 fw-bold">{List.street}, {List.district}</h2>
                    <img src={verifiedIcon} alt="Verified Icon" className="verified-icon mt-4 mb-3"/>

                        <div
                            className="btn btn-heart ms-auto p-0"
                            style={{
                                width: "1.5rem",
                                border: "none",
                                outline: "none"
                            }}
                        >
                            {/*<Heart*/}
                            {/*    isActive={active}*/}
                            {/*    onClick={() => setActive(!active)}*/}
                            {/*    style={{*/}
                            {/*        border: "none",*/}
                            {/*        outline: "none"*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </div>
                    </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <p className="fw-bold des-sub-text">{List.nearestUniversity}</p>
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
                                <p>Boarding hosted by {List.ownerName}</p>
                            </div>
                            <div className="owner-text-des">
                                <p>{List.membersCount} guests · {List.noOfRooms} bedroom · {List.membersCount} bed · 1
                                    private bathroom</p>
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
                            <p className="detail-description">{List.boardingName}</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="map-pin"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Location</h4>
                            <p className="detail-description">{List.street}, {List.city}, {List.district}, Sri
                                Lanka.</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="map"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Distance to University</h4>
                            <p className="detail-description">{List.boardingName} is conveniently located
                                just {List.distance} from the {List.nearestUniversity},
                                making it an ideal choice for students seeking proximity to campus.</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-lg-2 col-2 d-flex justify-content-center align-items-start">
                            <FeatherIcon className="des-icons" icon="home"/>
                        </div>
                        <div className="col-lg-10 col-10">
                            <h4 className="detail-heading">Room Types</h4>
                            <p className="detail-description">{List.boardingName} offers a variety of room types to suit
                                your needs,
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
                            <p className="detail-description">Advance:{List.advancedPayment} &
                                Rent: {List.pricePerMonth} per month for a
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
                                are easily accessible from {List.boardingName}.
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
                        <p className="detail-heading">RS.{advancedPayment.toLocaleString()} (per month)</p>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="checkInDate" className="form-label price-card-text">Check-in
                                    Date</label>
                                <input type="date" className="form-control" id="checkInDate" name={"checkInDate"} onChange={handleChange}/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="checkOutDate" className="form-label price-card-text">Check-out
                                    Date</label>
                                <input type="date" className="form-control" id="checkOutDate" name={"checkOutDate"} onChange={handleChange}/>
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
                                        >
                                            -
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
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            </div>
                            {err ? <div className={"text-danger"}>{err}</div>:null}
                        </div>
                        <div className="col p-2">
                            <button type="button" onClick={reserve} className="btn login-btn w-100 fw-semibold p-2">Reserve</button>
                        </div>
                        <p className="text-muted mb-3 text-center">You will not be charged yet</p>
                        <div className="d-flex justify-content-between mb-3 price-card-text">
                            <span className="fw-bold">Price Reason:</span>
                            <span>RS.{advancedPayment.toLocaleString()} (Advanced Payment)</span>
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-between mb-3 price-card-text">
                            <span className="fw-bold">Total Price:</span>
                            <span>RS {totalPrice.toLocaleString()}</span>
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
