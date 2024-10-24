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
// import {CheckoutParams, CurrencyType, Customer, PayhereCheckout} from "@payhere-js-sdk/client";
import {setLoading} from "../../redux/features/loaderSlice.js";
import {DirectionsRenderer, LoadScript,GoogleMap} from "@react-google-maps/api";

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
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState('');

    const userDetail = useSelector(state => state.userData.userDetails);
    const [value,setValue] = useState({})
    const UWU = {lat: 6.983186099999999, lng: 81.0793705}
    const [universityList, setUniversityList] = useState([])

    const calculateDistance = (originLatLng, destinationLatLng) => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: originLatLng,
                destination: destinationLatLng,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirections(result);
                    const distanceText = result.routes[0].legs[0].distance.text;
                    setDistance(distanceText);
                } else {
                    console.error(`Error fetching directions: ${result}`);
                }
            }
        );
    };

    // useEffect(() => {
    //     const originLatLng = { lat: 40.7128, lng: -74.0060 }; // New York City
    //     const destinationLatLng = { lat: 34.0522, lng: -118.2437 }; // Los Angeles
    //
    //     const calculateDistance = (originLatLng, destinationLatLng) => {
    //         const directionsService = new window.google.maps.DirectionsService();
    //         directionsService.route(
    //             {
    //                 origin: originLatLng,
    //                 destination: destinationLatLng,
    //                 travelMode: window.google.maps.TravelMode.DRIVING,
    //             },
    //             (result, status) => {
    //                 if (status === window.google.maps.DirectionsStatus.OK) {
    //                     setDirections(result);
    //                     const distanceText = result.routes[0].legs[0].distance.text;
    //                     setDistance(distanceText);
    //                 } else {
    //                     console.error(`Error fetching directions: ${status}`);
    //                 }
    //             }
    //         );
    //     };
    //
    //     // Automatically calculate distance on mount
    //     calculateDistance(originLatLng, destinationLatLng);
    // }, []);



    function handleChange(event) {
        setValue(value => ({...value, [event.target.name]: event.target.value}));
    }

    console.log(value)

    function onPayhereCheckoutError(errorMsg) {
        alert(errorMsg);
    }

    async function checkout(hash, amount, orderId) {
        // using async await
        // try {
        //     const customerAttributes = {
        //         first_name: userDetail?.firstName,
        //         last_name: userDetail?.lastName,
        //         phone: userDetail?.contactNo,
        //         email: userDetail?.email,
        //         address: userDetail?.address,
        //         city: userDetail?.address,
        //         country: 'Sri Lanka',
        //     };
        //     const customer = new Customer(customerAttributes);
        //
        //
        //     const checkoutData = new CheckoutParams({
        //         returnUrl: window.location.hostname === "localhost"? 'http://localhost:3000/payment-complete':`${window.location.protocol}//${window.location.hostname}/payment-complete`,
        //         cancelUrl: window.location.hostname === "localhost"? 'http://localhost:3000/payment-complete':`${window.location.protocol}//${window.location.hostname}/payment-complete`,
        //         notifyUrl: window.location.hostname === "localhost"? 'http://localhost:3000/payment-complete':`${window.location.protocol}//${window.location.hostname}/payment-complete`,
        //         order_id: orderId,
        //         itemTitle: 'Boarding Fees',
        //         currency: CurrencyType.LKR,
        //         amount: amount,
        //         hash: hash,
        //     });
        //
        //
        //     const checkout = new PayhereCheckout(customer, checkoutData, onPayhereCheckoutError);
        //     checkout.start();
        // } catch (err) {
        //     console.log(err);
        // }
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
        if(guestCount +1 >List.availableSlots){
            setErr("Maximum members count is "+ List.availableSlots)
            return
        }
        setGuestCount((prevCount) => Math.min(prevCount + 1, 20));
    };

    const decrementGuestCount = () => {
        console.log(List.membersCount)
        console.log(guestCount)
        if(List.availableSlots > guestCount){
            return
        }
        setGuestCount((prevCount) => Math.max(prevCount - 1, 0));
    };



    useEffect(() => {
        dispatch(setLoading(true));

        axiosInstance.get(`/boardings/getOneBoarding/${id}`)
            .then((res) => {
                setList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching boarding details:", err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, []);


    useEffect(() => {
        dispatch(setLoading(true));
        axiosInstance.get(`/university/getAllUniversity`)
            .then((res) => {
                setUniversityList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [update]);

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

    useEffect(() => {
        if (List && universityList.length > 0) {
            const university = universityList.find((uni) => uni.universityName === List.nearestUniversity);
            console.log("University", university);
            if (university) {
                calculateDistance(university.location,List.location);
            }
        }

    }, [List,universityList]);


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
                            {List.boardingPic && List.boardingPic.length > 0 ? (
                                <img src={List.boardingPic[0]} alt="Boarding Image"
                                     className="img-fluid col6-des-img rounded-20"/>
                            ) : (
                                <p>No image available</p>
                                )}
                        </div>

                        <div className="col-lg-6 col-md-11">
                            <div className="row g-3 position-relative">
                                <div className="col-6">
                                    {List.boardingPic && List.boardingPic.length > 1 ? (
                                        <img src={List.boardingPic[1]} alt="Boarding Image"
                                             className="img-fluid rounded-20"/>
                                    ) : (
                                        <p>No image
                                            available</p>
                                    )}
                                </div>
                                <div className="col-6">
                                    {List.boardingPic && List.boardingPic.length > 1 ? (
                                        <img src={List.boardingPic[2]} alt="Boarding Image"
                                             className="img-fluid rounded-20"/>
                                    ) : (
                                        <p>No image
                                            available</p>
                                    )}
                                </div>
                                <div className="col-6">
                                    {List.boardingPic && List.boardingPic.length > 1 ? (
                                        <img src={List.boardingPic[3]} alt="Boarding Image"
                                             className="img-fluid rounded-20"/>
                                    ) : (
                                        <p>No image
                                            available</p>
                                    )}
                                </div>
                                <div className="col-6 position-relative">
                                    {List.boardingPic && List.boardingPic.length > 1 ? (
                                        <img src={List.boardingPic[4]} alt="Boarding Image"
                                             className="img-fluid rounded-20"/>
                                    ) : (
                                        <p>No image
                                            available</p>
                                    )}
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
                                    private bathroom . Available slots {List.availableSlots}</p>
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
                                just {distance} from the {List.nearestUniversity},
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
            <div className="row mb-5">
                <h3 className="review-heading pb-3">Location</h3>

                {import.meta.env.VITE_REACT_APP_GOOGLE_MAP ? <LoadScript googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAP}>
                    <GoogleMap mapContainerStyle={{
                        width: '100%',
                        height: '400px',
                    }} center={{lat: 6.927079, lng: 79.861244}} zoom={10}>
                        {directions && (
                            <DirectionsRenderer directions={directions}/>
                        )}
                    </GoogleMap>
                    {distance && <div className={"fs-6 mt-2 text-dark fw-semibold"}>Distance: {distance}</div>}
                </LoadScript>: null}


            </div>

        </div>
    );
}

export default BoardingDetails;
