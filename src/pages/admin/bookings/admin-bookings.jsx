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
    const [bookingsList, setBookingsList] = useState([
        {
            id: '0o1',
            studentName: 'Kamal Perera',
            boardingOwnerName: 'Nimal Silva',
            membersCount: '4',
            moveInDate: '2024-06-20',
            status: 'Booked'
        },
        {
            id: '0o2',
            studentName: 'Nuwan Jayasinghe',
            boardingOwnerName: 'Sunil Fernando',
            membersCount: '5',
            moveInDate: '2024-06-21',
            status: 'Pending'
        },
        {
            id: '0o3',
            studentName: 'Sajith Bandara',
            boardingOwnerName: 'Asoka Kumar',
            membersCount: '10',
            moveInDate: '2024-06-22',
            status: 'Booked'
        },
        {
            id: '0o4',
            studentName: 'Chathura Wickramasinghe',
            boardingOwnerName: 'Ranjith Perera',
            membersCount: '15',
            moveInDate: '2024-06-23',
            status: 'Pending'
        },
        {
            id: '0o5',
            studentName: 'Isuru Weerasinghe',
            boardingOwnerName: 'Sarath Gunawardena',
            membersCount: '3',
            moveInDate: '2024-06-24',
            status: 'Decline'
        },
        {
            id: '0o6',
            studentName: 'Amila Rathnayake',
            boardingOwnerName: 'Mohan de Silva',
            membersCount: '10',
            moveInDate: '2024-06-25',
            status: 'Pending'
        },
        {
            id: '0o7',
            studentName: 'Nishantha Abeysekara',
            boardingOwnerName: 'Lakshman Jayawardena',
            membersCount: '7',
            moveInDate: '2024-06-26',
            status: 'Booked'
        },
        {
            id: '0o8',
            studentName: 'Tharindu Perera',
            boardingOwnerName: 'Gamini Fonseka',
            membersCount: '6',
            moveInDate: '2024-06-27',
            status: 'Pending'
        },
        {
            id: '0o9',
            studentName: 'Kasun Samarasinghe',
            boardingOwnerName: 'Anura Senanayake',
            membersCount: '8',
            moveInDate: '2024-06-28',
            status: 'Booked'
        },
        {
            id: '0o10',
            studentName: 'Saman Ekanayake',
            boardingOwnerName: 'Jayantha Silva',
            membersCount: '5',
            moveInDate: '2024-06-29',
            status: 'Decline'
        },
        {
            id: '0o11',
            studentName: 'Dilan Karunaratne',
            boardingOwnerName: 'Rohan Perera',
            membersCount: '9',
            moveInDate: '2024-06-30',
            status: 'Booked'
        },
        {
            id: '0o12',
            studentName: 'Udara Gunasekara',
            boardingOwnerName: 'Hemantha Ranatunga',
            membersCount: '12',
            moveInDate: '2024-07-01',
            status: 'Decline'
        },
        {
            id: '0o13',
            studentName: 'Ravindu Madushanka',
            boardingOwnerName: 'Upali Wijesinghe',
            membersCount: '2',
            moveInDate: '2024-07-02',
            status: 'Decline'
        },
        {
            id: '0o14',
            studentName: 'Charith Fernando',
            boardingOwnerName: 'Kithsiri Jayalath',
            membersCount: '13',
            moveInDate: '2024-07-03',
            status: 'Pending'
        },
        {
            id: '0o15',
            studentName: 'Pasindu Jayawardena',
            boardingOwnerName: 'Mahinda Silva',
            membersCount: '11',
            moveInDate: '2024-07-04',
            status: 'Booked'
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
        dispatch(setLoading(true))

        axiosInstance.delete(`/admin/bookings/${deletedId}`)
            .then((res) => {
                setUpdate(!update)
                toast.success(`Successfully Deleted`)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(setLoading(false))
            setDeletedId(null)
        })
    }, [confirmationDialog, deletedId, dispatch])

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
        axiosInstance.get(`/getAllBookings`)
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
                            <th scope="col">Student Name</th>
                            <th scope="col">Boarding Owner Name</th>
                            <th scope="col">Members</th>
                            <th scope="col">Move-In</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookingsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((data, index) => (
                            <tr key={index + "asd"}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.studentName}</td>
                                <td>{data.boardingOwnerName}</td>
                                <td>{data.membersCount}</td>
                                <td>{data.moveInDate}</td>
                                <td>
                                    <div
                                        className={"booking-state " + colorChange(data.status)}
                                        onClick={() => {
                                            if (data.status === "BOOKING") {
                                                return
                                            }
                                            let temp = {...data}
                                            temp.date = data.date?.slice(0, 10)
                                            setSelectedBookings(temp)
                                            setModalShow(true)
                                            setModalType("State");
                                        }
                                        }>{data.status}
                                    </div>
                                </td>
                                <td>
                                    <FeatherIcon className={"admin-action-icons"} icon={"eye"}
                                                 onClick={() => {
                                                     setModalType("View");
                                                     setSelectedBookings(data)
                                                     setModalShow(true)
                                                 }}/>
                                    <FeatherIcon className={"admin-action-icons"} icon={"edit"}
                                                 onClick={() => {
                                                     setSelectedBookings(data)
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
