import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import ListingsForm from "./listingsForm.jsx";
import {toggleConfirmationDialog} from "../../../redux/features/confirmationDialogSlice.js";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, pluck, uniq, values} from "underscore";
import {filterDataByKey} from '../../../utils/utils.js';
import axiosInstance from "../../../utils/axiosInstance.js";


function AdminListings() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedListings, setSelectedListings] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [listingsAllList, setListingsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [listingsList, setListingsList] = useState([]);



    const confirmationDialog = useSelector(state => state.confirmationDialog);

    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: 'ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA',
            confirmationDescription: 'THE DELETE ACTION WILL REMOVE THIS STUDENT DATA',
            onSuccess: false // Ensure this is added to track success
        }));
        setDeletedId(id);
    }

    // Debugging: log the current state of confirmation dialog and deletedId




    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(listingsAllList, function (item) {
                return values(pick(item, 'boardingNo', 'boardingName', 'nearestUniversity', 'pricePerMonth')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setListingsList(res);
            console.log(res)
        } else {
            setListingsList(listingsAllList);
        }
    }


    useEffect(() => {
        dispatch(setLoading(true));
        console.log(import.meta.env.VITE_REACT_APP_HOST)

        axiosInstance.get(`/boardings/getAllBoarding`)
            .then((res) => {
                console.log(res.data);
                setListingsList(res.data);
                setListingsAllList(res.data);
            })
            .catch((err) => {
                // console.error("Error fetching boardings:", err);
                console.log(err)
            })
            .finally(() => {
                dispatch(setLoading(false));
                // setDeletedId(null)
            });
    }, [update]);

    useEffect(() => {
        if (!confirmationDialog || !confirmationDialog.confirmationDialog.onSuccess || !deletedId) {
            console.log("Deletion conditions not met");
            return;
        }

        dispatch(setLoading(true)); // Optional: set loading state if needed

        // Axios delete request
        axiosInstance.delete(`/boardings/deleteBoarding/${deletedId}`)
            .then((res) => {
                setUpdate(!update); // Trigger re-render of updated listings
                toast.success('Successfully Deleted'); // Optional: Toast notification
            })
            .catch((err) => {
                console.log("Delete error:", err);
            })
            .finally(() => {
                dispatch(setLoading(false)); // Optional: remove loading state
                setDeletedId(null); // Reset after deletion
            });
    }, [confirmationDialog, deletedId]);

    return (
        <div className={"container mb-4 p-5"}>
            <div className={""}>
                <div className={"listings-container"}>
                    <div><h3 className={"content-heading"}>Listings</h3></div>
                    <div className={"table-btn-container d-flex justify-content-end pb-3"}>
                        <div className={"appointment-search"}>
                            <div className="">
                                <form className="d-flex" role="search">
                                    <input className="form-control"
                                           onChange={handleSearch}
                                           type="search"
                                           placeholder="Search"
                                           aria-label="Search"/>
                                </form>
                            </div>
                        </div>
                        <div className={"admin-dropdown"}>
                            <button className={"btn dropdown-toggle listings-dropdown-btn border-0 text-white"}
                                    type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                Near By University
                            </button>
                            <ul className={"dropdown-menu dropdown-menu-dark"}>
                                <li>
                                    <a className={"dropdown-item cursor-pointer"}
                                       onClick={() => setListingsList(filterDataByKey(listingsAllList, "All"))}
                                    >
                                        All
                                    </a>
                                </li>
                                {uniq(pluck(listingsAllList, "nearestUniversity"))
                                    .filter(item => item) // Filter out undefined or null values
                                    .map((item, index) => (
                                        <li key={index + item}>
                                            <a
                                                className={"dropdown-item cursor-pointer"}
                                                onClick={() => setListingsList(filterDataByKey(listingsAllList, item))}
                                            >
                                                {item?.replace("_", " ") || "Unknown University"} {/* Safely handle undefined item */}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        {/*<button type="button" className={"btn text-white students-dropdown-btn admin-dropdown"}*/}
                        {/*        onClick={() => {*/}
                        {/*            setModalType("Add");*/}
                        {/*            setModalShow(true)*/}
                        {/*        }}>*/}
                        {/*    <FeatherIcon className={"admin-action-icons text-white me-1"} icon={"plus"}/>*/}
                        {/*    Add*/}
                        {/*</button>*/}
                    </div>
                </div>
                <div className={"table-container admin-table"}>
                    <table className={"table table-hover table-striped"}>
                        <thead className={"top-0 position-sticky h-45"}>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Boarding Name</th>
                            <th scope="col">Near By University</th>
                            <th scope="col">Price Per Month</th>
                            <th scope={"col"}>Verified</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(listingsList) && listingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((data, index) => (
                                <tr key={index + "asd"}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{data.boardingName}</td>
                                    <td>{data.nearestUniversity}</td>
                                    <td>{data.pricePerMonth}</td>
                                    {data.isVerified == true ?
                                        <td><span className="badge text-bg-primary">Verified</span></td> :
                                        <td><span className="badge text-bg-danger"
                                                  onClick={() =>{
                                                      setModalType("State");
                                                      setSelectedListings(data);
                                                      setModalShow(true)}}
                                        >Not Verified</span></td>}
                                    <td>
                                    <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                     onClick={() => {
                                                         setModalType("View");
                                                         setSelectedListings(data);
                                                         setModalShow(true);
                                                     }} />
                                        <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                     onClick={() => {
                                                         setSelectedListings(data);
                                                         setModalType("Edit");
                                                         setModalShow(true);
                                                     }} />
                                        <FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}
                                                     onClick={() => handleDelete(data._id)} />
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {listingsList.length === 0 &&
                        <div className={"text-center py-5 fw-bold"}>No Listings Data Found, Please Add</div>
                    }
                </div>
            </div>
            <ListingsForm
                show={modalShow}
                type={modalType}
                selectedListings={selectedListings}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedListings(null)
                }}
            />
        </div>
    )
}

export default AdminListings;
