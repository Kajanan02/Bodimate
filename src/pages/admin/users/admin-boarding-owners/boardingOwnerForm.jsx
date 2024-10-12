import React, {useEffect, useState} from 'react';
import {Modal} from "react-bootstrap";
import {FileUploader} from "react-drag-drop-files";
import {validateBoardingOwners} from "../../../../utils/validation.js";
import {setLoading} from "../../../../redux/features/loaderSlice.js";
import axiosInstance from "../../../../utils/axiosInstance.js";
import {useDispatch} from "react-redux";
import {isEmpty} from "underscore";
import {toast} from "react-toastify";
import uploadIcon from "../../../../assets/admin-users/file-uploader.svg"
import FormHandler from "react-form-buddy";

function BoardingOwnerForm(props) {

    const [boardingOwnersList, setBoardingOwnersList] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [nicFront, setNicFront] = useState(null);
    const [nicBack, setNicBack] = useState(null);

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = FormHandler(stateBoardingOwners, validateBoardingOwners);

    function stateBoardingOwners() {
        setIsSubmit(true)
    }

    function resetForm() {
        initForm({});
    }

    // useEffect(() => {
    //     dispatch(setLoading(true))
    //     axiosInstance.get(`/admin/users-boarding-owner`)
    //         .then((res) => {
    //             setBoardingOwnersList(res.data)
    //         }).catch((err) => {
    //         console.log(err)
    //     }).finally(() => {
    //         dispatch(setLoading(false))
    //     })
    // }, [])

    useEffect(() => {
        if (["View", "Edit"].includes(props.type) && !isEmpty(props.selectedBoardingOwners)) {
            initForm(props.selectedBoardingOwners)
        }
    }, [props.type, props.selectedBoardingOwners])

    console.log(props.selectedBoardingOwners)

    useEffect(() => {
        if (!isSubmit || props.type !== "Edit") {
            return
        }
        dispatch(setLoading(true))

        axiosInstance.put(`/admin/users-boarding-owner/${values.id}`,values)
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
        console.log(props.selectedBoardingOwners)
        console.log(props.selectedBoardingOwners._id)

        dispatch(setLoading(true))
        axiosInstance.put(`/admin/users-boarding-owner/${props.selectedBoardingOwners._id}`, values)
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

    const handleChangeBoardingOwnerNicFront = (file) => {
        setNicFront(file);
        imageUpload(file, "nicFront")
    };

    const handleChangeBoardingOwnerNicBack = (file) => {
        setNicBack(file);
        imageUpload(file, "nicBack")
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
                    {props.type === "View" && <div> View Boarding Owners Details</div>}
                    {props.type === "Edit" && <div> Edit Boarding Owners Details</div>}
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
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Registration
                                            No</label>
                                        <input name={"boardingOwnerRegNo"}
                                               placeholder={"Enter Registration No"}
                                               className={`form-control ${errors.boardingOwnerRegNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail1"
                                               onChange={handleChange}
                                               value={values.boardingOwnerRegNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerRegNo &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerRegNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>First
                                            Name</label>
                                        <input name={"boardingOwnerFirstName"} placeholder={"Enter First Name"}
                                               className={`form-control ${errors.boardingOwnerFirstName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingOwnerFirstName || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerFirstName &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerFirstName}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Last
                                            Name</label>
                                        <input name={"boardingOwnerLastName"} placeholder={"Enter Last Name"}
                                               className={`form-control ${errors.boardingOwnerLastName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingOwnerLastName || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerLastName &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerLastName}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>User
                                            Name</label>
                                        <input name={"boardingOwnerUserName"} placeholder={"Enter User Name"}
                                               className={`form-control ${errors.boardingOwnerUserName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingOwnerUserName || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerUserName &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerUserName}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Address</label>
                                        <input name={"boardingOwnerAddress"} placeholder={"Enter Address"}
                                               className={`form-control ${errors.boardingOwnerAddress ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingOwnerAddress || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerAddress &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerAddress}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Gender</label>
                                        <select
                                            className={`form-control ${errors.boardingOwnerGender ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.boardingOwnerGender || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"boardingOwnerGender"}
                                            aria-label="Default select example">
                                            <option hidden>Select Gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                        </select>
                                        {errors.boardingOwnerGender &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerGender}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className={"mb-3"}>
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Email</label>
                                        <input type="email" name={"boardingOwnerEmail"} id="exampleInputEmail"
                                               placeholder={"Enter Email"}
                                               className={`form-control ${errors.boardingOwnerEmail ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               value={values.studeboardingOwnerEmailntEmail || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerEmail &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerEmail}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Contact
                                            No</label>
                                        <input name={"boardingOwnerContactNo"} placeholder={"Enter Contact No"}
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
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>NIC
                                            No</label>
                                        <input name={"boardingOwnerNicNo"} placeholder={"Enter NIC No"}
                                               className={`form-control ${errors.boardingOwnerNicNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingOwnerNicNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingOwnerNicNo &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerNicNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Date
                                            of Birth</label>
                                        <input id="boardingOwnerDob"
                                               className={`form-control ${errors.boardingOwnerDob ? "border-red" : ""}`}
                                               onChange={handleChange}
                                               name={"boardingOwnerDob"}
                                               value={values.boardingOwnerDob || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                               type="date"/>
                                        {errors.boardingOwnerDob &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerDob}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Gender</label>
                                        <select
                                            className={`form-control ${errors.boardingOwnerMarriedStatus ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.boardingOwnerMarriedStatus || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"boardingOwnerMarriedStatus"}
                                            aria-label="Default select example">
                                            <option hidden>Select Married Status</option>
                                            <option value="SINGLE">Single</option>
                                            <option value="MARRIED">Married</option>
                                        </select>
                                        {errors.boardingOwnerMarriedStatus &&
                                            <p className={"admin-text-red"}>{errors.boardingOwnerMarriedStatus}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label d-block ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>
                                            NIC Front
                                        </label>
                                        <FileUploader handleChange={handleChangeBoardingOwnerNicFront}
                                                      value={values.nicFront || ""} name={"nicFront"}>
                                            <div className="col-12 file-uploader-container d-flex">
                                                {!values.nicFront ? (
                                                    <div
                                                        className="col-4 d-flex justify-content-center align-items-center">
                                                        <img src={uploadIcon} width={"100%"} alt="Upload Icon"/>
                                                    </div>
                                                ) : null}
                                                {!values.nicFront ? (
                                                    <div className="col-8 d-flex flex-column justify-content-center">
                                                        <div className="fw-semibold my-2">Drop or Select File</div>
                                                        <div className="my-2">Drop files here or Click <span
                                                            className="text-uploader text-decoration-underline">browse</span> through
                                                            your machine.
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {values.nicFront && ["View", "Edit"].includes(props.type) && (
                                                    <div className="col-md-12">
                                                        <img src={values.nicFront} className='w-100' alt="NIC Front"/>
                                                    </div>
                                                )}
                                            </div>
                                        </FileUploader>
                                        {errors.nicFront && <p className={"admin-text-red"}>{errors.nicFront}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label d-block ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>
                                            NIC Back
                                        </label>
                                        <FileUploader handleChange={handleChangeBoardingOwnerNicBack}
                                                      value={values.nicBack || ""} name={"nicBack"}>
                                            <div className="col-12 file-uploader-container d-flex">
                                                {!values.nicBack ? (
                                                    <div
                                                        className="col-4 d-flex justify-content-center align-items-center">
                                                        <img src={uploadIcon} width={"100%"} alt="Upload Icon"/>
                                                    </div>
                                                ) : null}
                                                {!values.nicBack ? (
                                                    <div className="col-8 d-flex flex-column justify-content-center">
                                                        <div className="fw-semibold my-2">Drop or Select File</div>
                                                        <div className="my-2">Drop files here or Click <span
                                                            className="text-uploader text-decoration-underline">browse</span> through
                                                            your machine.
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {values.nicBack && ["View", "Edit"].includes(props.type) && (
                                                    <div className="col-md-12">
                                                        <img src={values.nicBack} className='w-100' alt="NIC Back"/>
                                                    </div>
                                                )}
                                            </div>
                                        </FileUploader>
                                        {errors.nicBack && <p className={"admin-text-red"}>{errors.nicBack}</p>}
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
            </Modal.Footer>
        </Modal>
    );
}

export default BoardingOwnerForm;