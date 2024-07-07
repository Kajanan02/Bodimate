import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axios from 'axios';
import ListingsForm from "./listingsForm.jsx";
import {toggleConfirmationDialog, toggleLoader} from "../../../redux/action.js";
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
    const [listingsList, setListingsList] = useState([

    ]);



    const confirmationDialog = useSelector(state => {
        return state.setting?.confirmationDialog
    });

    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA'),
            confirmationDescription: ('THE DELETE ACTION WILL REMOVE THE THIS STUDENT DATA')
        }));
        setDeletedId(id)
        console.log("ads")
    }



    console.log(confirmationDialog)
    console.log(deletedId)




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
        dispatch(toggleLoader(true));

        axiosInstance.get("/boardings/getAllBoarding")
            .then((res) => {
                console.log(res.data);
                setListingsList(res.data);
                setListingsAllList(res.data);
            })
            .catch((err) => {
                console.error("Error fetching boardings:", err);
            })
            .finally(() => {
                dispatch(toggleLoader(false));
            });
    }, [update]);

    useEffect(() => {
        if (!confirmationDialog || !confirmationDialog.onSuccess || !deletedId) {
            console.log("asdf")
            return;
        }
        console.log("asdasd")
        dispatch(toggleLoader(true))

        axios.delete(`http://localhost:5000/api/boardings/deleteBoarding/${deletedId}`)
            .then((res) => {
                setUpdate(!update)
                toast.success(`Successfully Deleted`)

            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
            setDeletedId(null)
        })
    }, [confirmationDialog])

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
                                <li><a className={"dropdown-item cursor-pointer"}
                                       onClick={() => setListingsList(filterDataByKey(listingsAllList, "All"))}
                                >
                                    All
                                </a>
                                </li>
                                {uniq(pluck(listingsAllList, "nearestUniversity")).map((item, index) => (
                                    <li key={index + item}>
                                        <a
                                            className={"dropdown-item cursor-pointer"}
                                            onClick={() => setListingsList(filterDataByKey(listingsAllList, item))}
                                        >
                                            {/*{item.replace("_", " ")}*/}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type="button" className={"btn text-white students-dropdown-btn admin-dropdown"}
                                onClick={() => {
                                    setModalType("Add");
                                    setModalShow(true)
                                }}>
                            <FeatherIcon className={"admin-action-icons text-white me-1"} icon={"plus"}/>
                            Add
                        </button>
                    </div>
                </div>
                <div className={"table-container admin-table"}>
                    <table className={"table table-hover table-striped"}>
                        <thead className={"top-0 position-sticky h-45"}>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Boarding Reg.No</th>
                            <th scope="col">Boarding Name</th>
                            <th scope="col">Near By University</th>
                            <th scope="col">Price Per Month</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {listingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                            <tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.boardingNo}</td>
                                <td>{data.boardingName}</td>
                                <td>{data.nearestUniversity}</td>
                                <td>{data.pricePerMonth}</td>
                                <td>
                                    <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                 onClick={() => {
                                                     setModalType("View");
                                                     setSelectedListings(data)
                                                     setModalShow(true)
                                                 }}/>
                                    <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                 onClick={() => {
                                                     setSelectedListings(data)
                                                     setModalType("Edit");
                                                     setModalShow(true)
                                                 }}/>

                                    <FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}
                                                 onClick={() => handleDelete(data._id)}


                                    />

                                </td>
                            </tr>))}
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
