import React, {useEffect, useState} from 'react';
import {filterDataByKey} from "../../../utils/utils.js";
import {filter, pick, pluck, uniq, values} from "underscore";
import FeatherIcon from "feather-icons-react";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import axiosInstance from "../../../utils/axiosInstance.js";

function Contact(props) {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedListings, setSelectedListings] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [listingsAllList, setListingsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [listingsList, setListingsList] = useState([]);

    useEffect(() => {
        dispatch(setLoading(true));
        console.log(import.meta.env.VITE_REACT_APP_HOST)

        axiosInstance.get(`/contactUs/getAllMessages`)
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

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(listingsAllList, function (item) {
                return values(pick(item, 'name', 'email', 'messageTopic', 'message')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setListingsList(res);
            console.log(res)
        } else {
            setListingsList(listingsAllList);
        }
    }

    return (
        <div className={"container mb-4 p-5"}>
            <div className={""}>
                <div className={"listings-container"}>
                    <div><h3 className={"content-heading"}>Contact Messages</h3></div>
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
                    </div>
                </div>
                <div className={"table-container admin-table"}>
                    <table className={"table table-hover table-striped"}>
                        <thead className={"top-0 position-sticky h-45"}>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact Number</th>
                            <th scope="col">Message Topic</th>
                            <th scope={"col"}>Message</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(listingsList) && listingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((data, index) => (
                                <tr key={index + "asd"}>
                                    <td scope="row">{index + 1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.phoneNo}</td>
                                    <td>{data.messageTopic}</td>
                                    <td>{data.message}</td>

                                    {/*{data.isVerified == true ?*/}
                                    {/*    <td><span className="badge text-bg-primary">messageTopic</span></td> :*/}
                                    {/*    <td><span className="badge text-bg-danger"*/}
                                    {/*              onClick={() => {*/}
                                    {/*                  setModalType("State");*/}
                                    {/*                  setSelectedListings(data);*/}
                                    {/*                  setModalShow(true)*/}
                                    {/*              }}*/}
                                    {/*    >Not Verified</span></td>}*/}
                                    <td>
                                        {/*<FeatherIcon className={"admin-action-icons"} icon={"eye"}*/}
                                        {/*             onClick={() => {*/}
                                        {/*                 setModalType("View");*/}
                                        {/*                 setSelectedListings(data);*/}
                                        {/*                 setModalShow(true);*/}
                                        {/*             }}/>*/}
                                        {/*<FeatherIcon className={"admin-action-icons"} icon={"edit"}*/}
                                        {/*             onClick={() => {*/}
                                        {/*                 setSelectedListings(data);*/}
                                        {/*                 setModalType("Edit");*/}
                                        {/*                 setModalShow(true);*/}
                                        {/*             }}/>*/}
                                        {/*<FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}*/}
                                        {/*             onClick={() => handleDelete(data._id)}/>*/}
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
        </div>
            );
            }

            export default Contact;