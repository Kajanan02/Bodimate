import React, {useEffect, useState} from 'react';
import verifiedIcon from "../../../assets/boarding-details/verified.svg";
import heartIcon from "../../../assets/home/heart.svg";
import heartFilledIcon from "../../../assets/home/heart1.svg";
import FeatherIcon from "feather-icons-react";
import './boarding-card.css';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance.js";
import {toast} from "react-toastify";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {pluck} from "underscore";

const BoardingCard = ({ data, from = "", ...props }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [values, setValues] = useState({});

    const userDetail = useSelector(state => state.userData.userDetails);


    const handleClick = () => {
        setActive(!active);
        // Prepare the values object with necessary data
        const favouriteData = {
            boardingId: data._id,
            isFavourite: !active,
        };
        setValues(favouriteData);
        setIsSubmit(true);
        dispatch(setLoading(true)); // Start loading
    };


    function favourite() {
        let dataa={
            userId:userDetail._id,
            boardingId: data._id
        }
        axiosInstance.post(`/favourite/createFavourite`, dataa)
            .then((res) => {
                console.log(res.data);
                props?.update();
                toast.success(`Successfully Favourite Created`);
            })
            .catch((err) => {
                toast.error("Something Went Wrong");
            })
            .finally(() => {
                dispatch(setLoading(false)); // Stop loading
                setIsSubmit(false);
            });
    }

    function unFavourite(id) {
        let dataa={
            userId:userDetail._id,
            boardingId: data._id
        }
        axiosInstance.delete(`/favourite/deleteFavourite/${id}`, dataa)
            .then((res) => {
                console.log(res.data);
                props?.update();
                toast.success(`Successfully Un Favourite`);
            })
            .catch((err) => {
                toast.error("Something Went Wrong");
            })
            .finally(() => {
                dispatch(setLoading(false)); // Stop loading
                setIsSubmit(false);
            });
    }

    useEffect(() => {
        if (!isSubmit) {
            return;
        }
        axiosInstance.post(`/favourite/createFavourite`, values)
            .then((res) => {
                console.log(res.data);
                props.update();
                toast.success(`Successfully Favourite Created`);
            })
            .catch((err) => {
                toast.error("Something Went Wrong");
            })
            .finally(() => {
                dispatch(setLoading(false)); // Stop loading
                setIsSubmit(false);
            });
    }, [isSubmit, values, props]);

    console.log(props.favourite);


    return (
        <div>
            <div className="card bodimate-card">
                <div className="position-relative">
                    <div className={"position-absolute d-flex end-0 gap-2 bg-default"}>
                        {from === "boardingOwner" && (
                            <>
                                <div className={"end-0 bg-default p-1"}>
                                    <FeatherIcon
                                        icon={"edit"}
                                        className={"edit-icon cursor-pointer"}
                                        onClick={() => props.editItem()}
                                    />
                                </div>
                                <div className={"end-0 bg-default p-1"}>
                                    <FeatherIcon
                                        icon={"trash-2"}
                                        className={"text-danger edit-icon cursor-pointer"}
                                        onClick={() => props.deleteItem()}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <img src={data.boardingPic[0]} alt="Listing" className="img-fluid w-100 h-auto" />
                    {from !== "boardingOwner" ?<div className="heart-icon">
                        <button
                            className="btn btn-heart ms-auto p-0"
                            onClick={() => {
                                if (pluck(props.favourite, "boardingId").includes(data._id)) {
                                    console.log(props.favourite);
                                    console.log(data._id);
                                    let id = props?.favourite?.find((data) => data.boardingId === data._id)?._id
                                    console.log(id)
                                    let dasd = props?.favourite?.find((daa) => daa.boardingId === data._id)
                                    console.log(dasd)
                                    console.log(dasd._id)
                                    unFavourite(dasd._id)
                                    // let id =props?.favourite?.find((data)=> data.boardingId === data._id)?.id
                                    // unFavourite()
                                } else {
                                    favourite()
                                }

                            }}
                            style={{width: "1.5rem", border: "none", outline: "none", background: "transparent"}}
                        >
                            <img
                                src={pluck(props.favourite, "boardingId").includes(data._id) ? heartFilledIcon : heartIcon}
                                alt="Heart Icon"
                                className="heart-image"
                            />
                        </button>
                    </div>:null}
                </div>
                <div className="p-3 cursor-pointer" onClick={() => navigate("/boarding-details/" + data._id)}>
                    <h6 className="review-rating p-0 m-0">
                        <FeatherIcon icon={"star"} /> 4.8<span> (233 reviews)</span>
                    </h6>
                    <h5 className="d-flex align-items-center fs-6 p-0 m-0">
                        {data.street}, {data.district}
                        {data.isVerified && <img src={verifiedIcon} alt="Verified Icon" className="verified-icon" />}
                    </h5>
                    <p className="card-text p-0 m-0">
                        {data.nearestUniversity}
                        <br />
                    </p>
                    <p className="price">
                        {data.pricePerMonth} <span className="per-night">(Monthly)</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BoardingCard;
