import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {toast} from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance.js";
import BookingsForm from "./bookingsForm.jsx";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {filter, pick, values} from "underscore";
import {toggleConfirmationDialog} from "../../../redux/features/confirmationDialogSlice.js";

function AdminBookings() {
    const [modalType, setModalType] = useState("view")
    const [modalShow, setModalShow] = useState(false);
    const [selectedBookings, setSelectedBookings] = useState(null)
    const [deletedId, setDeletedId] = useState(null);
    const [bookingsAllList, setBookingsAllList] = useState([])
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();
    const [bookingsList, setBookingsList] = useState([]);


    // const confirmationDialog = useSelector(state => {
    //     return state.setting.confirmationDialog
    // });
    const confirmationDialog = useSelector(state => state.confirmationDialog);


    function handleDelete(id) {
        dispatch(toggleConfirmationDialog({
            isVisible: true,
            confirmationHeading: 'ARE YOU SURE YOU WANT TO DELETE THIS STUDENT DATA',
            confirmationDescription: 'THE DELETE ACTION WILL REMOVE THIS STUDENT DATA',
            onSuccess: false // Ensure this is added to track success
        }));
        setDeletedId(id);
        console.log("Delete initiated for ID:", id);
    }

    // Debugging: log the current state of confirmation dialog and deletedId


    useEffect(() => {
        if (!confirmationDialog || !confirmationDialog.confirmationDialog.onSuccess || !deletedId) {
            console.log("Deletion conditions not met");
            return;
        }

        dispatch(setLoading(true)); // Optional: set loading state if needed

        // Axios delete request
        axiosInstance.delete(`/booking/deleteBooking/${deletedId}`)
            .then((res) => {
                console.log("Delete response:", res.data);
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

    function handleSearch(e) {
        let val = e.target.value;
        if (val !== "") {
            let res = filter(bookingsAllList, function (item) {
                return values(pick(item, 'studentName', 'boardingOwnerName', 'membersCount', 'moveInDate')).toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
            });
            setBookingsList(res);
            console.log(res)
        } else {
            setBookingsList(bookingsAllList);
        }
    }

    useEffect(() => {
        dispatch(setLoading(true));
        axiosInstance.get(`/booking/getAllBookings`)
            .then((res) => {
                setBookingsList(res.data)
                setBookingsAllList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    }, [update]);

    function colorChange(status) {
        switch (status) {
            case "Booked":
                return "booking-state"
            case "Pending":
                return "pending-state"
            case "Decline":
                return "decline-state"
            default:
                return ""
        }
    }

    return (
        <div className={"container mb-4 p-5"}>
            <div className={""}>
                <div className={"listings-container"}>
                    <div><h3 className={"content-heading"}>Bookings</h3></div>
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
                            <th scope="col">Student Name</th>
                            <th scope="col">Boarding Name</th>
                            <th scope="col">Check-in Date</th>
                            <th scope="col">Check-out Date</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Array.isArray(bookingsList) && bookingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                                <tr key={data.id || index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.studentName}</td>
                                    <td>{data.boardingName}</td>
                                    <td>{data.checkInDate?.slice(0, 10)}</td>
                                    <td>{data.checkOutDate?.slice(0, 10)}</td>
                                    <td>
                                        <div
                                            className={"booking-state " + colorChange(data.status)}
                                            onClick={() => {
                                                if (data.status === "BOOKING") {
                                                    return;
                                                }
                                                let temp = { ...data };
                                                temp.date = data.date?.slice(0, 10);
                                                setSelectedBookings(temp);
                                                setModalShow(true);
                                                setModalType("State");
                                            }}
                                        >
                                            {data.status}
                                        </div>
                                    </td>
                                    <td>
                                        <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                     onClick={() => {
                                                         setModalType("View");
                                                         setSelectedBookings(data);
                                                         setModalShow(true);
                                                     }}
                                        />
                                        <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                     onClick={() => {
                                                         setSelectedBookings(data);
                                                         setModalType("Edit");
                                                         setModalShow(true);
                                                     }}
                                        />
                                        <FeatherIcon className={"admin-action-icons text-red"} icon={"trash-2"}
                                                     onClick={() => handleDelete(data._id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        }


                        </tbody>
                    </table>
                    {bookingsList.length === 0 &&
                        <div className={"text-center py-5 fw-bold"}>No Bookings Data Found, Please Add</div>
                    }
                </div>
            </div>
            <BookingsForm
                show={modalShow}
                type={modalType}
                selectedBookings={selectedBookings}
                update={() => setUpdate(!update)}
                onHide={() => {
                    setModalShow(false);
                    setSelectedBookings(null)
                }}
            />
        </div>
    )
}

export default AdminBookings;
