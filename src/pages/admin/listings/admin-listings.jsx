import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axios from 'axios';
import ListingsForm from "./listingsForm.jsx";
import {toggleConfirmationDialog, toggleLoader} from "../../../redux/action.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, pluck, uniq, values} from "underscore";
import {filterDataByKey} from '../../../utils/utils.js';

function AdminListings() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedListings, setSelectedListings] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [listingsAllList, setListingsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [listingsList, setListingsList] = useState([
        {
            no: 0o1,
            boardingRegNo: "BOR/BAD/UWU/001",
            boardingOwnerName: "Kavindu Rathnayake",
            nearByUniversity: "Uva Wellassa University of Sri Lanka (UWU)",
            pricePerMonth: 4000
        },
        {
            no: 0o2,
            boardingRegNo: "BOR/COL/CBO/002",
            boardingOwnerName: "Dhanusha Madurawela",
            nearByUniversity: "University of Colombo (CBO)",
            pricePerMonth: 4500
        },
        {
            no: 0o3,
            boardingRegNo: "BOR/KAN/PDN/003",
            boardingOwnerName: "Chandika Perera",
            nearByUniversity: "University of Peradeniya (PDN)",
            pricePerMonth: 5000
        },
        {
            no: 0o4,
            boardingRegNo: "BOR/GAM/SJP/004",
            boardingOwnerName: "Nirmala Kumari",
            nearByUniversity: "University of Sri Jayewardenepura (SJP)",
            pricePerMonth: 5500
        },
        {
            no: 0o5,
            boardingRegNo: "BOR/KLN/KLN/005",
            boardingOwnerName: "Chathura Bandara",
            nearByUniversity: "University of Kelaniya (KLN)",
            pricePerMonth: 6000
        },
        {
            no: 0o6,
            boardingRegNo: "BOR/RAT/MRT/006",
            boardingOwnerName: "Supun Mendis",
            nearByUniversity: "University of Moratuwa (MRT)",
            pricePerMonth: 6500
        },
        {
            no: 0o7,
            boardingRegNo: "BOR/JAF/UJA/007",
            boardingOwnerName: "Priyadarshana Jayasinghe",
            nearByUniversity: "University of Jaffna (UJA)",
            pricePerMonth: 7000
        },
        {
            no: 0o10,
            boardingRegNo: "BOR/BAT/EUSL/010",
            boardingOwnerName: "Nirmali Fernando",
            nearByUniversity: "Eastern University, Sri Lanka (EUSL)",
            pricePerMonth: 5000
        },
        {
            no: 0o11,
            boardingRegNo: "BOR/ANU/RUSL/011",
            boardingOwnerName: "Dhanuka Kumara",
            nearByUniversity: "Rajarata University of Sri Lanka (RUSL)",
            pricePerMonth: 5500
        },
        {
            no: 0o12,
            boardingRegNo: "BOR/RAT/SUSL/012",
            boardingOwnerName: "Manjula Priyadarshana",
            nearByUniversity: "Sabaragamuwa University of Sri Lanka (SUSL)",
            pricePerMonth: 6000
        },
        {
            no: 0o13,
            boardingRegNo: "BOR/TRI/SEUSL/013",
            boardingOwnerName: "Kanchana Mendis",
            nearByUniversity: "South Eastern University of Sri Lanka (SEUSL)",
            pricePerMonth: 6500
        },
        {
            no: 0o14,
            boardingRegNo: "BOR/KUR/WUSL/014",
            boardingOwnerName: "Rashmi de Silva",
            nearByUniversity: "Wayamba University of Sri Lanka (WUSL)",
            pricePerMonth: 7000
        },
        {
            no: 0o15,
            boardingRegNo: "BOR/GAL/UVPA/015",
            boardingOwnerName: "Sachithra Fernando",
            nearByUniversity: "University of the Visual and Performing Arts (UVPA)",
            pricePerMonth: 7500
        }
    ]);


    // const confirmationDialog = useSelector(state => {
    //     return state.setting.confirmationDialog
    // });
    const confirmationDialog = useSelector(state => state.setting?.confirmationDialog);


    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: ('Are you sure you want to delete this listing data'),
            confirmationDescription: ('The delete action will remove the this listing data')
        }));
        setDeletedId(id)
        console.log("ads")
    }


    console.log(confirmationDialog)
    console.log(deletedId)

    useEffect(() => {
        if (!confirmationDialog || !confirmationDialog.onSuccess || !deletedId) {
            console.log("deleted")
            return;
        }
        console.log("deleted")
        dispatch(toggleLoader(true))

        axios.delete(`http://localhost:3000/admin/listings/${deletedId}`)
            .then((res) => {
                setUpdate(!update)
                toast.success(`Successfully Deleted`)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
            setDeletedId(null)
        })
    }, [confirmationDialog, deletedId, dispatch])

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(listingsAllList, function (item) {
                return values(pick(item, 'boardingRegNo', 'boardingOwnerName', 'nearByUniversity', 'pricePerMonth')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setListingsList(res);
            console.log(res)
        } else {
            setListingsList(listingsAllList);
        }
    }

    // useEffect(() => {
    //     dispatch(toggleLoader(true));
    //     axios.get(`http://localhost:3000/getAllListings`)
    //         .then((res) => {
    //             setListingsList(res.data)
    //             setListingsAllList(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //         .finally(() => {
    //             dispatch(toggleLoader(false));
    //         });
    // }, [update]);

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
                                {uniq(pluck(listingsAllList, "nearByUniversity")).map((item, index) => (
                                    <li key={index + item}>
                                        <a
                                            className={"dropdown-item cursor-pointer"}
                                            onClick={() => setListingsList(filterDataByKey(listingsAllList, item))}
                                        >
                                            {item.replace("_", " ")}
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
                            <th scope="col">Boarding Owner Name</th>
                            <th scope="col">Near By University</th>
                            <th scope="col">Price Per Month</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {listingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                            <tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.boardingRegNo}</td>
                                <td>{data.boardingOwnerName}</td>
                                <td>{data.nearByUniversity}</td>
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
                                                 onClick={() => handleDelete(data.id)}
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
