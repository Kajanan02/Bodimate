import React, {useEffect, useState} from 'react';
import {FormControl, Modal} from "react-bootstrap";
import FormHandler from "react-form-buddy";
import {validatePayments} from "../../../utils/validation";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import axiosInstance from "../../../utils/axiosInstance.js";
import {useDispatch} from "react-redux";
import {isEmpty} from "underscore";
import {toast} from "react-toastify";
import {FileUploader} from "react-drag-drop-files";
import uploadIcon from "../../../assets/admin-users/file-uploader.svg";

function PaymentsForm(props) {

    const [paymentsList, setPaymentsList] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [paymentReceipt, setPaymentReceipt] = useState(null);

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = FormHandler(statePayments, validatePayments);

    function statePayments() {
        setIsSubmit(true)
    }

    function resetForm() {
        initForm({});
    }

    useEffect(() => {
        dispatch(setLoading(true))
        axiosInstance.get(`/admin/payments`)
            .then((res) => {
                setPaymentsList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }, [])

    useEffect(() => {
        if (["View", "Edit", "State"].includes(props.type) && !isEmpty(props.selectedPayments)) {
            initForm(props.selectedPayments)
        }
    }, [props.type, props.selectedPayments])

    console.log(props.selectedPayments)

    useEffect(() => {
        if (!isSubmit || props.type !== "Edit") {
            return
        }
        dispatch(setLoading(true))

        //http://localhost:5000/api/payments/:id
        axiosInstance.put( `/admin/payments/${values.id}`, values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {
            toast.error("Something Went Wrong")
        }).finally(() => {
            // dispatch(setLoading(false))
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
        console.log(props.selectedPayments)
        console.log(props.selectedPayments._id)

        dispatch(setLoading(true))
        axiosInstance.put(`/admin/payments/${props.selectedPayments._id}`,values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {
            toast.error("Something Went Wrong")
        }).finally(() => {
            dispatch(setLoading(false))
            setIsSubmit(false);
            setIsSubmit(false)
            resetForm()
            props.onHide()
        })
    }

    const handleChangePaymentReceipt = (file) => {
        setPaymentReceipt(file);
        imageUpload(file, "paymentReceipt")
    };

    function imageUpload(file, key) {
        console.log("File")
        dispatch(setLoading(true))
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "xi7icexi")
        data.append("cloud_name", "dacrccjrm")
        axios.put("https://api.cloudinary.com/v1_1/dacrccjrm/image/upload", data)
            .then((res) => {
                console.log(res.data.url)
                setValue({[key]: res.data.url})
            }).finally(() => dispatch(setLoading(false)))
    }

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
                    {props.type === "View" && <div> View Payment Details</div>}
                    {props.type === "Edit" && <div> Edit Payment Details</div>}
                    {props.type === "State" && <div> Reply Payment Details</div>}
                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <div className={"row"}>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Payment
                                            No</label>
                                        <input name={"paymentNo"} placeholder={"Enter Payment No"}
                                               className={`form-control ${errors.paymentNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.paymentNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.paymentNo &&
                                            <p className={"admin-text-red"}>{errors.paymentNo}</p>}
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
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Payment
                                            Amount</label>
                                        <input name={"paymentAmount"} placeholder={"Enter Payment Amount"}
                                               className={`form-control ${errors.paymentAmount ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.paymentAmount || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.paymentAmount &&
                                            <p className={"admin-text-red"}>{errors.paymentAmount}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Payment
                                            Date</label>
                                        <input id="startDate"
                                               className={`form-control ${errors.paymentDate ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               name={"paymentDate"}
                                               value={values.paymentDate || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                               type="date"/>
                                        {errors.paymentDate && <p className={"admin-text-red"}>{errors.paymentDate}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Boarding
                                            Name</label>
                                        <input name={"boardingName"} placeholder={"Enter Boarding Name"}
                                               className={`form-control ${errors.boardingName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingName || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingName &&
                                            <p className={"admin-text-red"}>{errors.boardingName}</p>}
                                    </div>
                                </div>
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
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Account
                                            No</label>
                                        <input name={"accountNo"} placeholder={"Enter Account No"}
                                               className={`form-control ${errors.accountNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.accountNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.accountNo &&
                                            <p className={"admin-text-red"}>{errors.accountNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label d-block ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Payment
                                            Receipt
                                        </label>
                                        <FileUploader handleChange={handleChangePaymentReceipt}
                                                      value={values.paymentReceipt || ""} name={"paymentReceipt"}>
                                            <div className="col-12 file-uploader-container d-flex">
                                                {!values.paymentReceipt ? (
                                                    <div
                                                        className="col-4 d-flex justify-content-center align-items-center">
                                                        <img src={uploadIcon} width={"100%"} alt="Upload Icon"/>
                                                    </div>
                                                ) : null}
                                                {!values.paymentReceipt ? (
                                                    <div className="col-8 d-flex flex-column justify-content-center">
                                                        <div className="fw-semibold my-2">Drop or Select File</div>
                                                        <div className="my-2">Drop files here or Click <span
                                                            className="text-uploader text-decoration-underline">browse</span> through
                                                            your machine.
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {values.paymentReceipt && ["View", "Edit", "State"].includes(props.type) && (
                                                    <div className="col-md-12">
                                                        <img src={values.paymentReceipt} className='w-100'
                                                             alt="Payment Receipt"/>
                                                    </div>
                                                )}
                                            </div>
                                        </FileUploader>
                                        {errors.paymentReceipt &&
                                            <p className={"admin-text-red"}>{errors.paymentReceipt}</p>}
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
                        onClick={() => statusUpdate("PAID")}
                    >
                        Paid
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

export default PaymentsForm;