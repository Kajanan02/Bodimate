import React, {useEffect, useState} from 'react';
import FeatherIcon from "feather-icons-react";
import {FileUploader} from "react-drag-drop-files";
import {Col, Dropdown, DropdownMenu, DropdownToggle, Form, FormCheck, FormControl, Modal, Row} from "react-bootstrap";
import FormHandler from "react-form-buddy";
import {validateListings} from "../../../utils/validation";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import {useDispatch} from "react-redux";
import {isEmpty} from "underscore";
import {toast} from "react-toastify";
import homeIcon from "../../../assets/admin-listings/homeIcon.svg";
import roomIcon from "../../../assets/admin-listings/roomIcon.svg";
import studentIcon from "../../../assets/admin-listings/studentIcon.svg";
import maleIcon from "../../../assets/male-student-5-svgrepo-com.svg";
import femaleIcon from "../../../assets/female-doctor-2-svgrepo-com.svg";
import personIcon from "../../../assets/person-svgrepo-com.svg";
import camera from "../../../assets/admin-listings/camera.svg";
import addIcon from "../../../assets/admin-listings/plus-circle.svg";
import axiosInstance from "../../../utils/axiosInstance.js";
import profileImage from "../../../assets/admin-setting/admin-profile.png";


function ListingsForm(props) {

    const [selectedBuyer, setSelectedBuyer] = useState([]);
    const [listingsList, setListingsList] = useState([]);
    const [singleSelections, setSingleSelections] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = FormHandler(stateListings, validateListings);

    function stateListings() {
        setIsSubmit(true)
    }

    function resetForm() {
        initForm({});
    }

    function multiSelectOnChangeBuyer(selected) {
        setSelectedBuyer(selected);
        setValue({previousBuyer: selected});
    }

    function multiSelectOnChangeSubjects(selected) {
        setSelectedBuyer(selected);
        setValue({nearestUniversity: selected});
    }

    const handleChangeSettingsProfileImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    console.log(selectedImage)

    useEffect(() => {
        dispatch(setLoading(true))
        axiosInstance.get("/boardings/getAllBoarding")
            .then((res) => {
                setListingsList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }, [])

    useEffect(() => {
        if (["View", "Edit"].includes(props.type) && !isEmpty(props.selectedListings)) {
            initForm(props.selectedListings)
        }
    }, [props.type, props.selectedListings])

    console.log(props.selectedListings)




    useEffect(() => {
        if (!isSubmit || props.type !== "Edit") {
            return
        }
        dispatch(setLoading(true))



            axiosInstance.put(`/boardings/editBoarding/${values._id}`, values)
            .then((res) => {
                console.log(res.data)
                toast.success(`Successfully Updated`)
                props.update()
            }).catch((err) => {
            toast.error("Something went wrong")
        }).finally(() => {
            // dispatch(setLoading(false))
            setIsSubmit(false)
            resetForm()
            props.onHide()
        })

    }, [isSubmit])



    console.log(props.type)
    console.log(errors)
    console.log(values)





    useEffect(() => {

        if (!isSubmit || props.type !== "Add") {
                    return
                }

        axiosInstance.post(`/boardings/createBoarding`, values)
            .then((res) => {
                console.log(res.data)
                props.update()
                props.onHide();
                toast.success(`Successfully Boarding is Added`)
            }).catch((err) => {
            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(setLoading(false))
            setIsSubmit(false);
            resetForm()

        })
    }, [isSubmit]);

    const districts = [
        "Ampara",
        "Anuradhapura",
        "Badulla",
        "Batticaloa",
        "Colombo",
        "Galle",
        "Gampaha",
        "Hambantota",
        "Jaffna",
        "Kalutara",
        "Kandy",
        "Kegalle",
        "Kilinochchi",
        "Kurunegala",
        "Mannar",
        "Matale",
        "Matara",
        "Monaragala",
        "Mullativu",
        "Nuwara Eliya",
        "Polonnaruwa",
        "Puttalam",
        "Ratnapura",
        "Trincomalee",
        "Vavuniya"
    ];

    const provinces = [
        "Central Province",
        "Eastern Province",
        "Northern Province",
        "North Central Province",
        "North Western Province",
        "Sabaragamuwa Province",
        "Southern Province",
        "Uva Province",
        "Western Province"
    ];

    const nearestUniversity = [
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
                    {props.type === "Add" && <div> Add Boarding Details</div>}
                    {props.type === "View" && <div> View Boarding Details</div>}
                    {props.type === "Edit" && <div> Edit Boarding Details</div>}
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
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Boarding
                                            Name</label>
                                        <input name={"boardingName"} placeholder={"Enter Boarding Name"}
                                               className={`form-control ${errors.boardingName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail1"
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
                                            Registration No</label>
                                        <input name={"boardingNo"} placeholder={"Enter Boarding Registration No"}
                                               className={`form-control ${errors.boardingNo ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.boardingNo || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.boardingNo &&
                                            <p className={"admin-text-red"}>{errors.boardingNo}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Boarding
                                            Owner Name</label>
                                        <input name={"ownerName"} placeholder={"Enter Boarding Owner Name"}
                                               className={`form-control ${errors.ownerName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.ownerName || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.ownerName &&
                                            <p className={"admin-text-red"}>{errors.ownerName}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Boarding
                                            Owner NIC No</label>
                                        <input name={"ownerNIC"} placeholder={"Enter Boarding Owner NIC No"}
                                               className={`form-control ${errors.ownerNIC ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.ownerNIC || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.ownerNIC &&
                                            <p className={"admin-text-red"}>{errors.ownerNIC}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Street
                                            Address</label>
                                        <input name={"street"} placeholder={"Enter Street Address"}
                                               className={`form-control ${errors.street ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.street || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.street &&
                                            <p className={"admin-text-red"}>{errors.street}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>City</label>
                                        <input name={"city"} placeholder={"Enter City"}
                                               className={`form-control ${errors.city ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                               id="exampleInputEmail5"
                                               onChange={handleChange}
                                               value={values.city || ""}
                                               disabled={["View", "State"].includes(props.type)}
                                        />
                                        {errors.city && <p className={"admin-text-red"}>{errors.city}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>District</label>
                                        <select
                                            className={`form-control ${errors.district ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.district || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"district"}
                                            aria-label="Default select example">
                                            <option hidden>Select District</option>
                                            {districts.map((district) => (
                                                <option key={district} value={district}>
                                                    {district}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.district && <p className={"admin-text-red"}>{errors.district}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-6"}>
                                    <div className="mb-3">

                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Province</label>
                                        <select
                                            className={`form-control ${errors.province ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.province || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"province"}
                                            aria-label="Default select example">
                                            <option hidden>Select Province</option>
                                            {provinces.map((province) => (
                                                <option key={province} value={province}>
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.province && <p className={"admin-text-red"}>{errors.province}</p>}
                                    </div>
                                </div>
                                <div className={"col-md-12"}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1"
                                               className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Near
                                            By University</label>
                                        <select
                                            className={`form-control ${errors.nearestUniversity ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.nearestUniversity || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"nearestUniversity"}
                                            aria-label="Default select example">
                                            <option hidden>Select Near By University</option>
                                            {nearestUniversity.map((nearestUniversity) => (
                                                <option key={nearestUniversity} value={nearestUniversity}>
                                                    {nearestUniversity}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.nearestUniversity &&
                                            <p className={"admin-text-red"}>{errors.nearestUniversity}</p>}
                                    </div>
                                </div>
                                <Col md={12} className={"ps-3"}>
                                    <fieldset>
                                        <Form.Group as={Row} className="mb-3">
                                            <h5 className={'mb-3 admin-form-head fw-semibold'}>Select Boarding Type</h5>
                                            <Col sm={12} className={"pe-1"}>
                                                <div className={"admin-boarding-type-home-button pb-2"}>
                                                    <Form.Check
                                                        type="radio"
                                                        name="boardingType"
                                                        onChange={handleChange}
                                                        label={
                                                            <div
                                                                className={`admin-boarding-type-home-container w-100 ps-3 `}>
                                                                <div
                                                                    className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                                    <div>
                                                                        <div className={"admin-form-radio-head"}>An
                                                                            Entire Home
                                                                        </div>
                                                                        <div
                                                                            className={"admin-radio-btn w-100 text-start"}>
                                                                            Students have whole place to themselves.
                                                                        </div>
                                                                    </div>
                                                                    <div className={"ps-5 pe-2"}>
                                                                        <img src={homeIcon} alt={"homeIcon"}/>
                                                                    </div>
                                                                </div>
                                                            </div>}
                                                        id="formHorizontalRadios1"
                                                        className={"radio-circle w-100 admin-radio-form-check-label"}
                                                    />
                                                </div>
                                                <div className={"admin-boarding-type-home-button pb-2"}>
                                                    <Form.Check
                                                        type="radio"
                                                        name="boardingType"
                                                        onChange={handleChange}
                                                        label={
                                                            <div
                                                                className={`admin-boarding-type-home-container w-100 ps-3 `}>
                                                                <div
                                                                    className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                                    <div>
                                                                        <div className={"admin-form-radio-head"}>A
                                                                            Room
                                                                        </div>
                                                                        <div className={"admin-radio-btn"}>
                                                                            Students have their own room themselves.
                                                                        </div>
                                                                    </div>
                                                                    <div className={`ps-5 pe-2`}>
                                                                        <img src={roomIcon} alt={"roomIcon"}/>
                                                                    </div>
                                                                </div>
                                                            </div>}
                                                        id="formHorizontalRadios2"
                                                        className={"radio-circle w-100 admin-radio-form-check-label"}
                                                    />
                                                </div>
                                                <div className={"admin-boarding-type-home-button pb-2"}>
                                                    <FormCheck
                                                        type="radio"
                                                        name="boardingType"
                                                        id="formHorizontalRadios3"
                                                        onChange={handleChange}
                                                        label={
                                                            <div
                                                                className={`admin-boarding-type-home-container w-100 ps-3 `}>
                                                                <div
                                                                    className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                                    <div>
                                                                        <div className={"admin-form-radio-head"}>A
                                                                            Shared Room
                                                                        </div>
                                                                        <div className={"admin-radio-btn"}>
                                                                            Room can share more than one student.
                                                                        </div>
                                                                    </div>
                                                                    <div className={"ps-5 pe-2"}>
                                                                        <img src={studentIcon} alt={"personIcon"}/>
                                                                    </div>
                                                                </div>
                                                            </div>}
                                                        className={"radio-circle w-100 admin-radio-form-check-label"}
                                                    />
                                                </div>
                                                {errors.boardingType &&
                                                    <p className={"admin-text-red"}>{errors.boardingType}</p>}
                                            </Col>
                                        </Form.Group>
                                    </fieldset>
                                </Col>


                                {/*<Col md={12} className={"ps-3"}>*/}
                                {/*    <fieldset>*/}
                                {/*        <Form.Group as={Row} className="mb-3">*/}
                                {/*            <h5 className={'mb-3 admin-form-head fw-semibold'}>Stay Preference</h5>*/}
                                {/*            <Col sm={12} className={"pe-1"}>*/}
                                {/*                <div className={"admin-boarding-type-home-button pb-2"}>*/}
                                {/*                    <Form.Check*/}
                                {/*                        type="radio"*/}
                                {/*                        name="stayPreference"*/}
                                {/*                        value="male"*/}
                                {/*                        onChange={handleChange}*/}
                                {/*                        label={*/}
                                {/*                            <div*/}
                                {/*                                className={`admin-boarding-type-home-container w-100 ps-3`}>*/}
                                {/*                                <div*/}
                                {/*                                    className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.stayPreference ? "border-danger" : ""}`}>*/}
                                {/*                                    <div>*/}
                                {/*                                        <div className={"admin-form-radio-head"}>Male*/}
                                {/*                                            Only*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className={"admin-radio-btn"}>Only Boys can*/}
                                {/*                                            stay.*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <div className={"ps-5 pe-2"}>*/}
                                {/*                                        <img src={maleIcon} alt={"maleIcon"}/>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        }*/}
                                {/*                        id="formHorizontalRadios4"*/}
                                {/*                    />*/}
                                {/*                </div>*/}
                                {/*                <div className={"admin-boarding-type-home-button pb-2"}>*/}
                                {/*                    <Form.Check*/}
                                {/*                        type="radio"*/}
                                {/*                        name="stayPreference"*/}
                                {/*                        value="female"*/}
                                {/*                        onChange={handleChange}*/}
                                {/*                        label={*/}
                                {/*                            <div*/}
                                {/*                                className={`admin-boarding-type-home-container w-100 ps-3`}>*/}
                                {/*                                <div*/}
                                {/*                                    className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.stayPreference ? "border-danger" : ""}`}>*/}
                                {/*                                    <div>*/}
                                {/*                                        <div className={"admin-form-radio-head"}>Female*/}
                                {/*                                            Only*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className={"admin-radio-btn"}>Only Girls*/}
                                {/*                                            can stay.*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <div className={"ps-5 pe-2"}>*/}
                                {/*                                        <img src={femaleIcon} alt={"femaleIcon"}/>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        }*/}
                                {/*                        id="formHorizontalRadios5"*/}
                                {/*                    />*/}
                                {/*                </div>*/}
                                {/*                <div className={"admin-boarding-type-home-button pb-2"}>*/}
                                {/*                    <Form.Check*/}
                                {/*                        type="radio"*/}
                                {/*                        name="stayPreference"*/}
                                {/*                        value="no_restriction"*/}
                                {/*                        onChange={handleChange}*/}
                                {/*                        label={*/}
                                {/*                            <div*/}
                                {/*                                className={`admin-boarding-type-home-container w-100 ps-3`}>*/}
                                {/*                                <div*/}
                                {/*                                    className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.stayPreference ? "border-danger" : ""}`}>*/}
                                {/*                                    <div>*/}
                                {/*                                        <div className={"admin-form-radio-head"}>No*/}
                                {/*                                            Gender Restriction*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className={"admin-radio-btn"}>Boys or Girls*/}
                                {/*                                            can stay.*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                    <div className={"ps-5 pe-2"}>*/}
                                {/*                                        <img src={personIcon} alt={"personIcon"}/>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        }*/}
                                {/*                        id="formHorizontalRadios6"*/}
                                {/*                    />*/}
                                {/*                </div>*/}
                                {/*                {errors.stayPreference &&*/}
                                {/*                    <p className={"admin-text-red"}>{errors.stayPreference}</p>}*/}
                                {/*            </Col>*/}
                                {/*        </Form.Group>*/}
                                {/*    </fieldset>*/}
                                {/*</Col>*/}

                                            <Col md={12} className={"ps-3"}>
                                                <fieldset>
                                                    <Form.Group as={Row} className="mb-3">
                                                        <h5 className={'mb-3 admin-form-head fw-semibold'}>Stay Preference</h5>
                                                        <Col sm={12} className={"pe-1"}>
                                                            <div className={"admin-boarding-type-home-button pb-2"}>
                                                                <Form.Check
                                                                    type="radio"
                                                                    name="stayPreference"
                                                                    onChange={handleChange}
                                                                    label={
                                                                        <div
                                                                            className={`admin-boarding-type-home-container w-100 ps-3 `}>
                                                                            <div
                                                                                className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                                                <div>
                                                                                    <div className={"admin-form-radio-head"}>Male
                                                                                        Only
                                                                                    </div>
                                                                                    <div className={"admin-radio-btn"}>
                                                                                        Only Boys can stay.
                                                                                    </div>
                                                                                </div>
                                                                                <div className={"ps-5 pe-2"}>
                                                                                    <img src={maleIcon} alt={"maleIcon"}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>}
                                                                    id="formHorizontalRadios4"
                                                                />
                                                            </div>
                                                            <div className={"admin-boarding-type-home-button pb-2"}>
                                                                <Form.Check
                                                                    type="radio"
                                                                    name="stayPreference"
                                                                    value="female"
                                                                    onChange={handleChange}
                                                                    label={
                                                                        <div
                                                                            className={`admin-boarding-type-home-container w-100 ps-3 `}>
                                                                            <div
                                                                                className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                                                <div>
                                                                                    <div className={"admin-form-radio-head"}>Female
                                                                                        Only
                                                                                    </div>
                                                                                    <div className={"admin-radio-btn"}>
                                                                                        Only Girls can stay.
                                                                                    </div>
                                                                                </div>
                                                                                <div className={"ps-5 pe-2"}>
                                                                                    <img src={femaleIcon} alt={"femaleIcon"}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>}
                                                                    id="formHorizontalRadios5"
                                                                />
                                                            </div>
                                                            <div className={"admin-boarding-type-home-button pb-2"}>
                                                                <Form.Check
                                                                    type="radio"
                                                                    name="stayPreference"
                                                                    onChange={handleChange}
                                                                    label={
                                                                        <div
                                                                            className={`admin-boarding-type-home-container w-100 ps-3 `}>
                                                                            <div
                                                                                className={`admin-boarding-type-home d-flex align-items-center justify-content-between text-start ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                                                <div>
                                                                                    <div className={"admin-form-radio-head"}>No
                                                                                        Gender Restriction
                                                                                    </div>
                                                                                    <div className={"admin-radio-btn"}>
                                                                                        Boys or Girls can stay.
                                                                                    </div>
                                                                                </div>

                                                                                <div className={"ps-5 pe-2"}>
                                                                                    <img src={personIcon} alt={"personIcon"}/>
                                                                                </div>
                                                                            </div>
                                                                        </div>}
                                                                    id="formHorizontalRadios6"
                                                                />
                                                            </div>
                                                            {errors.stayPreference &&
                                                                <p className={"admin-text-red"}>{errors.stayPreference}</p>}
                                                        </Col>
                                                    </Form.Group>
                                                </fieldset>
                                            </Col>
                                            <div className={"col-md-6"}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1"
                                                           className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Facilities
                                                        Listing</label>
                                                    <Dropdown>
                                                        <DropdownToggle variant="secondary" id="facilities-dropdown"
                                                                        onChange={handleChange}
                                                                        value={values.facilities}
                                                                        disabled={["View", "State"].includes(props.type)}
                                                                        className={`admin-input-border-color admin-form-dropdown-btn ${errors.facilities ? "border-danger" : ""}`}>
                                                            <div
                                                                className={"admin-form-facility-dropdown d-flex align-items-center justify-content-between"}>
                                                                <div className="flex-grow-1">
                                                                    Select what are the Facilities available
                                                                </div>
                                                                <div
                                                                    className={"admin-facility-dropdown-icon ps-5 pe-0"}>
                                                                    <FeatherIcon icon="chevron-down" color="#024950"/>
                                                                </div>
                                                            </div>
                                                        </DropdownToggle>
                                                        {errors.facilities &&
                                                            <p className={"admin-text-red"}>{errors.facilities}</p>}
                                                        <DropdownMenu className={"w-100"}>
                                                            <FormCheck name={"facilities"}
                                                                       label={<div className={"ps-3"}>WiFi</div>}
                                                                       className="mx-3 my-1"
                                                                       onChange={handleChange}
                                                            />
                                                            <FormCheck name={"facilities"}
                                                                       label={<div className={"ps-3"}>Water
                                                                           Heater</div>}
                                                                       className="mx-3 my-1"
                                                                       onChange={handleChange}
                                                            />
                                                            <FormCheck name={"facilities"}
                                                                       label={<div className={"ps-3"}>Study Hall</div>}
                                                                       className="mx-3 my-1"
                                                                       onChange={handleChange}
                                                            />
                                                            <FormCheck name={"facilities"}
                                                                       label={<div className={"ps-3"}>Kitchen</div>}
                                                                       className="mx-3 my-1"
                                                                       onChange={handleChange}
                                                            />
                                                            <FormCheck name={"facilities"}
                                                                       label={<div className={"ps-3"}>Fan</div>}
                                                                       className="mx-3 my-1 "
                                                                       onChange={handleChange}
                                                            />
                                                            <FormCheck name={"facilities"}
                                                                       label={<div className={"ps-3"}>Cooker</div>}
                                                                       className="mx-3 my-1"
                                                                       onChange={handleChange}
                                                            />
                                                            <FormCheck name={"facilities"}
                                                                       label={<div className={"ps-3"}>Other
                                                                           Facilities</div>}
                                                                       className="mx-3 my-1"
                                                                       onChange={handleChange}
                                                            />
                                                            <div className={"w-100 ps-3 pe-3 pt-3"}>
                                                                <FormControl name={"facilities"} id=""
                                                                             onChange={handleChange}
                                                                             className={"admin-input-border-color checkbox-input "}
                                                                             placeholder="If other facilities specify here"/>
                                                            </div>
                                                        </DropdownMenu>
                                                    </Dropdown>
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
                                                           className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Distance</label>
                                                    <input name={"distance"} placeholder={"Enter Distance"}
                                                           className={`form-control ${errors.distance ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                                           id="exampleInputEmail5"
                                                           onChange={handleChange}
                                                           value={values.distance || ""}
                                                           disabled={["View", "State"].includes(props.type)}
                                                    />
                                                    {errors.distance &&
                                                        <p className={"admin-text-red"}>{errors.distance}</p>}
                                                </div>
                                            </div>
                                            <div className={"col-md-6"}>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleInputEmail1"
                                                           className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Advance
                                                        Payment</label>
                                                    <input name={"advancedPayment"} placeholder={"Enter Advance Payment"}
                                                           className={`form-control ${errors.advancedPayment ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                                           id="exampleInputEmail5"
                                                           onChange={handleChange}
                                                           value={values.advancedPayment || ""}
                                                           disabled={["View", "State"].includes(props.type)}
                                                    />
                                                    {errors.advancedPayment &&
                                                        <p className={"admin-text-red"}>{errors.advancedPayment}</p>}
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
                                            <div className="col-md-12">
                                                <div className="admin-boarding-image-uploader mb-3">
                                                    <div>
                                                        <h5 className='admin-form-head fw-semibold'>Upload Boarding</h5>
                                                        <div className="admin-form-sub-head fw-light fs-normal">
                                                            Add 360 degree view Images of your Boarding
                                                        </div>
                                                    </div>
                                                    <div className="row mt-1 g-3">
                                                        <div className="col-md-6">
                                                            <FileUploader handleChange={handleChangeSettingsProfileImage}>
                                                                <div className="admin-file-uploader-container-main">

                                                                    {!selectedImage ? <img src={camera}
                                                                                           alt="camera" width="80px"
                                                                                           className="admin-img-upload m-auto" /> :
                                                                        <img src={selectedImage}
                                                                             alt="camera" width="80px"
                                                                             className="admin-img-upload m-auto"/>}
                                                                </div>
                                                            </FileUploader>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="row g-3">
                                                                <div className="col-6">
                                                                    <FileUploader>
                                                                        <div
                                                                            className="admin-file-uploader-container-main">
                                                                            <img src={camera} alt="camera" width="50px"
                                                                                 className="admin-img-upload m-auto"/>
                                                                        </div>
                                                                    </FileUploader>
                                                                </div>
                                                                <div className="col-6">
                                                                    <FileUploader>
                                                                        <div
                                                                            className="admin-file-uploader-container-main">
                                                                            <img src={camera} alt="camera" width="50px"
                                                                                 className="admin-img-upload m-auto"/>
                                                                        </div>
                                                                    </FileUploader>
                                                                </div>
                                                                <div className="col-6">
                                                                    <FileUploader>
                                                                        <div
                                                                            className="admin-file-uploader-container-main">
                                                                            <img src={camera} alt="camera" width="50px"
                                                                                 className="admin-img-upload m-auto"/>
                                                                        </div>
                                                                    </FileUploader>
                                                                </div>
                                                                <div className="col-6">
                                                                    <FileUploader>
                                                                        <div
                                                                            className="admin-file-uploader-container-main">
                                                                            <img src={camera} alt="camera" width="50px"
                                                                                 className="admin-img-upload m-auto"/>
                                                                        </div>
                                                                    </FileUploader>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="admin-boarding-image-uploader mb-3">
                                                    <div>
                                                        <FileUploader>
                                                            <div
                                                                className={"admin-file-uploader-container-main admin-form-more-upload d-flex justify-content-center align-items-center"}>
                                                                <img src={addIcon} alt={"camera"} width={"50px"}
                                                                     className={"more-image-upload"}/>
                                                                <div className={"admin-file-upload-text fw-semibold"}>
                                                                    Add More Images Here
                                                                </div>
                                                            </div>
                                                        </FileUploader>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div>
                                                    <h5 className='admin-form-head fw-semibold'>Location</h5>
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
                    type="submit"
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
            </Modal.Footer>
        </Modal>
);
}

export default ListingsForm;