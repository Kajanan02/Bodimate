import React, {useEffect, useState} from 'react';
import {FormControl, Modal} from "react-bootstrap";
import {validateBookings} from "../../../utils/validation";
import {toggleLoader} from "../../../redux/action.js";
import axios from "axios";
import {useDispatch} from "react-redux";
import {isEmpty} from "underscore";
import {toast} from "react-toastify";
import FormHandler from "react-form-buddy";

function BookingsForm(props) {

    const [bookingsList, setBookingsList] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = FormHandler(stateBookings, validateBookings);

    function stateBookings() {
        setIsSubmit(true)
    }

    function resetForm() {
        initForm({});
    }

    useEffect(() => {
        dispatch(toggleLoader(true))
        axios.get(`http://localhost:3000/admin/bookings`)
            .then((res) => {
                setBookingsList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(toggleLoader(false))
        })
    }, [])

    useEffect(() => {
        if (["View", "Edit", "State"].includes(props.type) && !isEmpty(props.selectedBookings)) {
            initForm(props.selectedBookings)
        }
    }, [props.type, props.selectedBookings])

    console.log(props.selectedBookings)

    useEffect(() => {
        if (!isSubmit || props.type !== "Add") {
            return
        }

        //http://localhost:5000/api/bookings
        axios.post(`http://localhost:3000/admin/bookings`, values)
            .then((res) => {
                console.log(res.data)
                props.update()
                props.onHide();
                toast.success(`Successfully Bookings Created`)
            }).catch((err) => {
            toast.error("Something Went Wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setIsSubmit(false);
            resetForm()
        })
    }, [isSubmit]);

    useEffect(() => {
        if (!isSubmit || props.type !== "Edit") {
            return
        }
        dispatch(toggleLoader(true))

        //http://localhost:5000/api/bookings/:id
        axios.put(`http://localhost:3000/admin/bookings/${values.id}`, values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {
            toast.error("Something Went Wrong")
        }).finally(() => {
            // dispatch(toggleLoader(false))
            setIsSubmit(false)
            resetForm()
            props.onHide()
        })

    }, [isSubmit])

    const dispatch = useDispatch();

    console.log(props.type)
    console.log(errors)
    console.log(values)

    function statusUpdate(status) {
        values.status = status
        console.log(props.selectedBookings)
        console.log(props.selectedBookings._id)

        dispatch(toggleLoader(true))
        axios.put(`http://localhost:3000/admin/bookings/${props.selectedBookings._id}`, values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {
            toast.error("Something Went Wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setIsSubmit(false);
            setIsSubmit(false)
            resetForm()
            props.onHide()
        })
    }

    const nearByUniversities = [
        "Eastern University, Sri Lanka (EUSL)",
        "Open University of Sri Lanka, The (OUSL)",
        "Rajarata University of Sri Lanka (RUSL)",
        "Sabaragamuwa University of Sri Lanka (SUSL)",
        "South Eastern University of Sri Lanka (SEUSL)",
        "University of Colombo (CBO)",
        "University of Jaffna (UJA)",
        "University of Kelaniya (KLN)",
        "University of Moratuwa (MRT)",
        "University of Peradeniya (PDN)",
        "University of Ruhuna (RUH)",
        "University of Sri Jayewardenepura (SJP)",
        "University of the Visual and Performing Arts (UVPA)",
        "Uva Wellassa University of Sri Lanka (UWU)",
        "Wayamba University of Sri Lanka (WUSL)"
    ];

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            scrollable={true}
        >
            <Modal.Header closeButton onHide={() => {
                if (!formSubmitted) {
                    initForm({});
                }
            }}>
                {<Modal.Title id="contained-modal-title-vcenter">
                    {props.type === "Add" && <div> Add Booking Details</div>}
                    {props.type === "View" && <div> View Booking Details</div>}
                    {props.type === "Edit" && <div> Edit Booking Details</div>}
                    {props.type === "State" && <div> Reply Booking Details</div>}
                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <h5 className={'mb-3 admin-form-head fw-semibold'}>Student</h5>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Student
                                            Registration
                                            No</label>
                                        <input name={"studentRegNo"} placeholder={"Enter Student Registration No"}
                                               className={`form-control ${errors.studentRegNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.studentRegNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentRegNo &&
                                            <p className={"admin-text-red"}>{errors.studentRegNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Student
                                            Name</label>
                                        <input name={"studentName"} placeholder={"Enter Student Name"}
                                               className={`form-control ${errors.studentName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentName || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentName &&
                                            <p className={"admin-text-red"}>{errors.studentName}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Student
                                            Address</label>
                                        <input name={"studentAddress"} placeholder={"Enter Student Address"}
                                               className={`form-control ${errors.studentAddress ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentAddress || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentAddress &&
                                            <p className={"admin-text-red"}>{errors.studentAddress}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Student
                                            Gender</label>
                                        <select
                                            className={`form-control ${errors.studentGender ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.studentGender || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"studentGender"}
                                            aria-label="Default select example">
                                            <option hidden>Select Student Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                        {errors.studentGender &&
                                            <p className={"admin-text-red"}>{errors.studentGender}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"mb-3"}>
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Student
                                            Email</label>
                                        <input type="email" name={"studentEmail"} id="exampleInputEmail"
                                               placeholder={"Enter Student Email"}
                                               className={`form-control ${errors.studentEmail ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               value={values.studentEmail || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentEmail &&
                                            <p className={"admin-text-red"}>{errors.studentEmail}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Student
                                            Contact
                                            No</label>
                                        <input name={"studentContactNo"} placeholder={"Enter Student Contact No"}
                                               className={`form-control ${errors.studentContactNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentContactNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentContactNo &&
                                            <p className={"admin-text-red"}>{errors.studentContactNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Near
                                            By University</label>
                                        <select
                                            className={`form-control ${errors.nearByUniversity ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.nearByUniversity || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"nearByUniversity"}
                                            aria-label="Default select example">
                                            <option hidden>Select Student Near By University</option>
                                            {nearByUniversities.map((nearByUniversity) => (
                                                <option key={nearByUniversity} value={nearByUniversity}>
                                                    {nearByUniversity}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nearByUniversity &&
                                            <p className={"admin-text-red"}>{errors.nearByUniversity}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Student
                                            NIC No</label>
                                        <input name={"studentNicNo"} placeholder={"Enter Student NIC No"}
                                               className={`form-control ${errors.studentNicNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.studentNicNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.studentNicNo &&
                                            <p className={"admin-text-red"}>{errors.studentNicNo}</p>}
                                    </div>
                                </div>
                                <h5 className={'mb-3 admin-form-head fw-semibold'}>Boarding Owner</h5>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Boarding
                                            Owner Name</label>
                                        <input name={"boardingOwnerName"} placeholder={"Enter Boarding Owner Name"}
                                               className={`form-control ${errors.boardingOwnerName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingOwnerName || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerName &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerName}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Boarding
                                            Owner Contact No</label>
                                        <input name={"boardingOwnerContactNo"} placeholder={"Enter Boarding Owner Name"}
                                               className={`form-control ${errors.boardingOwnerContactNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingOwnerContactNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerContactNo &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerContactNo}</p>}
                                    </div>
                                </div>
                                <hr/>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Boarding
                                            Registration No</label>
                                        <input name={"boardingRegNo"} placeholder={"Enter Boarding Registration No"}
                                               className={`form-control ${errors.boardingRegNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingRegNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingRegNo &&
                                            <p className={"admin-text-red"}>{errors.boardingRegNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>No
                                            of Rooms</label>
                                        <input name={"noOfRooms"} placeholder={"Enter No of Rooms"}
                                               className={`form-control ${errors.noOfRooms ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.noOfRooms || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.noOfRooms &&
                                            <p className={"admin-text-red"}>{errors.noOfRooms}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Members
                                            Count</label>
                                        <FormControl id="membersCount" name={"membersCount"}
                                                     className={`admin-input-border-color ${errors.membersCount ? "border-danger" : ""}`}
                                                     onChange={handleChange}
                                                     value={values.membersCount || ""}
                                                     disabled={["View", "State"].includes(props.type)}
                                                     placeholder="Enter How Many Members Can Stay"
                                                     type={"number"}
                                                     min="1"
                                                     max="50"
                                        />
                                        {errors.membersCount &&
                                            <p className={"admin-text-red"}>{errors.membersCount}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Price
                                            Per Month</label>
                                        <input name={"pricePerMonth"} placeholder={"Enter Price Per Month"}
                                               className={`form-control ${errors.pricePerMonth ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.pricePerMonth || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.pricePerMonth &&
                                            <p className={"admin-text-red"}>{errors.pricePerMonth}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Move-In
                                            Date</label>
                                        <input id="startDate"
                                               className={`form-control ${errors.moveInDate ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               name={"moveInDate"}
                                               value={values.moveInDate || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                               type="date"/>
                                        {errors.moveInDate && <p className={"admin-text-red"}>{errors.moveInDate}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Move-Out
                                            Date</label>
                                        <input id="endDate"
                                               className={`form-control ${errors.moveOutDate ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               name={"moveOutDate"}
                                               value={values.moveOutDate || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                               type="date"/>
                                        {errors.moveOutDate && <p className={"admin-text-red"}>{errors.moveOutDate}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className={"btn btn-secondary"}
                    onClick={() => {
                        if (!formSubmitted) {
                            props.onHide();
                            initForm({});
                        }
                    }}
                >
                    Cancel
                </button>
                {props.type === "Add" && <button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    Add
                </button>}
                {props.type === "Edit" && <button
                    type="button"
                    className={"btn btn-secondary students-dropdown-btn"}
                    onClick={handleSubmit}
                >
                    Update
                </button>}
                {props.type === "State" && <div className='d-flex gap-2'>
                    <button
                        type="button"
                        className={"btn booking-state-btn"}
                        onClick={() => statusUpdate("BOOKING")}
                    >
                        Booked
                    </button>
                    <button
                        type="button"
                        className={"btn pending-state-btn"}
                        onClick={() => statusUpdate("PENDING")}
                    >
                        Pending
                    </button>
                    <button
                        type="button"
                        className={"btn decline-state-btn"}
                        onClick={() => statusUpdate("DECLINE")}
                    >
                        Decline
                    </button>
                </div>}
            </Modal.Footer>
        </Modal>
    );
}

export default BookingsForm;