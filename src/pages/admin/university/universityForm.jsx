import React, {useEffect, useState} from 'react';
import {FormControl, Modal} from "react-bootstrap";
import {validateUniversity} from "../../../utils/validation";
import {setLoading} from "../../../redux/features/loaderSlice.js";
import axiosInstance from "../../../utils/axiosInstance.js";
import {useDispatch} from "react-redux";
import {isEmpty} from "underscore";
import {toast} from "react-toastify";
import FormHandler from "react-form-buddy";
// import AdminUniversity from "./university.jsx";
import {FileUploader} from "react-drag-drop-files";
import camera from "../../../assets/admin-listings/camera.svg";
import axios from "axios";
import BoardingLocation from "../listings/boardingLocation.jsx";


function UniversityForm(props) {

    const [universityList, setUniversityList] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);

    const {
        handleChange,
        handleSubmit,
        setValue,
        initForm,
        values,
        errors,
    } = FormHandler(stateUniversity, validateUniversity);

    function stateUniversity() {
        setIsSubmit(true)
    }

    function resetForm() {
        initForm({});
        setSelectedImage(null)

    }

    useEffect(() => {
        dispatch(setLoading(true))
        axiosInstance.get(`/university/getAllUniversity`)
            .then((res) => {
                setUniversityList(res.data)
            }).catch((err) => {
            console.log(err)
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }, [])

    useEffect(() => {
        if (["View", "Edit", "State"].includes(props.type) && !isEmpty(props.selectedUniversity)) {
            initForm(props.selectedUniversity)
        }
    }, [props.type, props.selectedUniversity])

    console.log(props.selectedUniversity)

    useEffect(() => {
        if (!isSubmit || props.type !== "Add") {
            return
        }


        axiosInstance.post(`/university/createUniversity`, values)
            .then((res) => {
                console.log(res.data)
                props.update()
                props.onHide();
                toast.success(`Successfully University Created`)
            }).catch((err) => {
            toast.error("Something Went Wrong")
        }).finally(() => {
            dispatch(setLoading(false))
            setIsSubmit(false);
            setSelectedImage(null)
            resetForm()
        })
    }, [isSubmit]);

    useEffect(() => {
        if (!isSubmit || props.type !== "Edit") {
            return
        }
        dispatch(setLoading(true))


        axiosInstance.put(`/university/editUniversity/${values.id}`, values)
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
        console.log(props.selectedUniversity)
        console.log(props.selectedUniversity._id)

        dispatch(setLoading(true))
        axiosInstance.put(`/university/editUniversity/${props.selectedUniversity._id}`, values)
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
    const universityName = [
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
    const handleChangeSettingsProfileImage = (file) => {
        if (file) {
            imageUpload(file,"universityImg")
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);

        }
    }

    function boardingGeoLocation(position) {

        let data = {}
        data.gpscoordinates = position
        setValue({location: position});
    }

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
    console.log(selectedImage)


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
                    {props.type === "Add" && <div> Add University Details</div>}
                    {props.type === "View" && <div> View University Details</div>}
                    {props.type === "Edit" && <div> Edit University Details</div>}

                </Modal.Title>}
            </Modal.Header>
            <Modal.Body scrollable>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={"pop-up-form-container"}>
                            <h5 className={'mb-3 admin-form-head fw-semibold'}>Student</h5>
                            <div className={"row"}>


                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="universityName"
                                            className={`form-label ${["View", "State"].includes(props.type) ? "label-view-text" : "form-label"}`}
                                        >
                                            University Name
                                        </label>
                                        <select
                                            className={`form-control ${errors.universityName ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                            onChange={handleChange}
                                            value={values.universityName || ""}
                                            disabled={["View", "State"].includes(props.type)}
                                            name={"universityName"}
                                            aria-label="Default select example">
                                            <option hidden>Select Near By University</option>
                                            {universityName.map((universityName) => (
                                                <option key={universityName} value={universityName}>
                                                    {universityName}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.universityName &&
                                            <p className="admin-text-red">{errors.universityName}</p>}
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

                                {/*<div className="col-md-6">*/}
                                {/*    <div className="mb-3">*/}
                                {/*        <label*/}
                                {/*            htmlFor="universityImg"*/}
                                {/*            className={`form-label ${["View", "State"].includes(props.type) ? "label-view-text" : "form-label"}`}*/}
                                {/*        >*/}
                                {/*            University Logo*/}
                                {/*        </label>*/}
                                {/*        <input*/}
                                {/*            type="file"*/}
                                {/*            name="universityImg"*/}
                                {/*            className={`form-control ${errors.universityImg ? "border-red" : ""} ${["View", "State"].includes(props.type) ? "form-control:disabled" : ""}`}*/}
                                {/*            id="universityImg"*/}
                                {/*            onChange={handleChange}*/}
                                {/*            disabled={["View", "State"].includes(props.type)}*/}
                                {/*        />*/}

                                {/*    </div>*/}

                                {/*</div>*/}
                                <div className="col-md-12">
                                    <div className="admin-boarding-image-uploader mb-3">
                                        <div>
                                            <h5 className='admin-form-head fw-semibold'>University Logo</h5>
                                            <div className="admin-form-sub-head fw-light fs-normal">
                                                Add University Logo
                                            </div>
                                        </div>
                                        <div className="row mt-1 g-3">
                                            <div className="col-md-6">
                                                {["View", "State"].includes(props.type) ? <img src={props?.selectedUniversity?.universityImg}/>:<FileUploader handleChange={handleChangeSettingsProfileImage}
                                                               types={["JPG", "PNG", "GIF", "JPEG"]}>
                                                    <div className="admin-file-uploader-container-main">

                                                        {!selectedImage ? <img src={camera}
                                                                               alt="camera" width="80px"
                                                                               className="admin-img-upload m-auto"/> :
                                                            <img src={selectedImage}
                                                                 alt="camera" width="80px"
                                                                 className="admin-img-upload m-auto"/>}
                                                    </div>
                                                </FileUploader>}
                                            </div>

                                        </div>
                                        <div>
                                            <h5 className='admin-form-head fw-semibold mt-3'>Location</h5>
                                            <BoardingLocation type={"View"} onChange={boardingGeoLocation} location={values.location}/>

                                        </div>
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

            </Modal.Footer>
        </Modal>
    );
}

export default UniversityForm;