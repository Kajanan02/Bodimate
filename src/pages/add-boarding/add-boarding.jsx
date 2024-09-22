import home from '../../assets/home.svg';
import camera from "../../assets/camera.svg";
import roomIcon from "../../assets/room-svgrepo-com.svg"
import studentIcon from "../../assets/users-people-team-svgrepo-com.svg"
import {FileUploader} from "react-drag-drop-files";
import dropdownArrow from "../../assets/chevron-down.svg"
import personIcon from "../../assets/person-svgrepo-com.svg"
import maleIcon from "../../assets/male-student-5-svgrepo-com.svg"
import femaleIcon from "../../assets/female-doctor-2-svgrepo-com.svg"
import "./add-boarding.css"
import {validateAddBoarding} from "../../utils/validation.js";
import addIcon from "../../assets/plus-circle.svg"
import {Col, Dropdown, DropdownMenu, DropdownToggle, Form, FormCheck, FormControl, Row,} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {toggleLoader} from "../../redux/action.js";
import {useDispatch} from "react-redux";
import FormHandler from "react-form-buddy";

"../../utils/validation.js"

function AddBoarding(props) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [moreBoardingImages, setMoreBoardingImages] = useState([]);
    const dispatch = useDispatch();
    const [selectedBoardingImages, setSelectedBoardingImages] = useState(null);
    const {
        handleSubmit,
        handleChange,
        values,
        errors,
    } = FormHandler(submitAddBoarding, validateAddBoarding)

    function submitAddBoarding() {
        setFormSubmitted(true)
    }

    useEffect(() => {
        if (!formSubmitted) {
            return
        }

        //router.route('/:instituteId/broadcast').post(createBroadcast);
        axios.post(`http://localhost:5002/api/boardings/createBoarding`, values)
            .then((res) => {
                console.log(res.data)
                //props.update()
                //props.onHide();
                toast.success(`Successfully Boarding is Added`)
            }).catch((err) => {
            toast.error("Something went wrong")
        }).finally(() => {
            dispatch(toggleLoader(false))
            setFormSubmitted(false);
            // resetForm()
            // if (parentSubmit) {
            //     setStudentId(null);
            //     props.onHide()

            // }
        })
    }, [formSubmitted]);


    const handleChangeMoreBoardingImages = (files) => {
        const fileArray = Array.from(files);

        Promise.all(fileArray.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        })).then(newImages => {
            setMoreBoardingImages(prevImages => [...prevImages, ...newImages]);
        }).catch(error => {
            console.error("Error reading files: ", error);
        });
    };
    console.log(moreBoardingImages)

    // const handleChangeBoardingImage = (files) => {
    //     console.log('Files received in handleChangeBoardingImage:', files);
    //     if (!Array.isArray(files)) {
    //         console.error('Received files is not an array:', files);
    //         return;
    //     }
    //     const updatedImages = files.map(file => URL.createObjectURL(file));
    //     setBoardingImages(prevImages => [...prevImages, ...updatedImages]);
    // };

    const handleChangeBoardingImage = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedBoardingImages(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // imageUpload(file, "nicFront")
    };
    console.log(selectedBoardingImages)


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
        <div className={'addBoarding-Container'}>
            <div>
                <h3 className={'mb-5 main-title'}>Add Boarding</h3>
            </div>
            <div className={'details-title-container mb-2'}>
                <img src={home} alt="Home Icon"/>
                <div className={'title ms-1 fw-bold'}>Boarding Details</div>
            </div>
            <div className={'add-details-form-container'}>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <h5 className={'mb-3 fw-semibold'}>Address</h5>
                        <Row className="text-box-Container mb-lg-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="boardingName" className="">Boarding Name</label></h6>
                                <FormControl id="boardingName"
                                             className={`input-border-color ${errors.boardingName ? "border-danger" : ""}`}
                                             onChange={handleChange}
                                             value={values.boardingName || ""}
                                             placeholder="Enter Boarding Name" name={"boardingName"}
                                />
                                {errors.boardingName &&
                                    <p className={"error-message text-danger"}>{errors.boardingName}</p>}
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="boardingNo" className="">Boarding No</label></h6>
                                <FormControl id="boardingNo" name={"boardingNo"}
                                             className={`input-border-color ${errors.boardingNo ? "border-danger" : ""}`}
                                             placeholder="Enter Boarding No"
                                             onChange={handleChange}
                                             value={values.boardingNo || ""}
                                />
                                {errors.boardingNo &&
                                    <p className={"error-message text-danger"}>{errors.boardingNo}</p>}
                            </Col>
                        </Row>

                        <Row className="text-box-Container mb-lg-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="street" className="">Street</label></h6>
                                <FormControl id="street" name={"street"}
                                             className={`input-border-color ${errors.street ? "border-danger" : ""}`}
                                             onChange={handleChange}
                                             value={values.street}
                                             placeholder="Enter Street"
                                />
                                {errors.street && <p className={"error-message text-danger"}>{errors.street}</p>}
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="city" className="">City/Town/Village</label></h6>
                                <FormControl id="city" name={"city"}
                                             className={`input-border-color ${errors.city ? "border-danger" : ""}`}
                                             onChange={handleChange}
                                             value={values.city || ""}
                                             placeholder="Enter City"
                                />
                                {errors.city && <p className={"error-message text-danger"}>{errors.city}</p>}
                            </Col>
                        </Row>

                        <Row className="text-box-Container mb-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="district" className="">District</label></h6>
                                {/*<FormControl id="district" name={"district"}*/}
                                {/*             className={`input-border-color ${errors.district ? "border-danger" : ""}`}*/}
                                {/*             onChange={handleChange}*/}
                                {/*             value={values.district || ""}*/}
                                {/*             placeholder="Enter District"*/}
                                {/*/>*/}
                                <select
                                    className={`form-control input-border-color ${errors.district ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                    onChange={handleChange}
                                    value={values.district || ""}
                                    name={"district"}
                                    aria-label="Default select example">
                                    <option hidden>Select District</option>
                                    {districts.map((district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && <p className={"error-message text-danger"}>{errors.district}</p>}
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="province" className="">Province</label></h6>
                                {/*<FormControl id="province" name={"province"}*/}
                                {/*             className={`input-border-color ${errors.province ? "border-danger" : ""}`}*/}
                                {/*             placeholder="Enter Province"*/}
                                {/*             onChange={handleChange}*/}
                                {/*             value={values.province || ""}*/}
                                {/*/>*/}
                                {/*<label htmlFor="exampleInputEmail1"*/}
                                {/*       className={`form-label ${["View", "State"].includes(props.type) ? " label-view-text " : "form-label"}`}>Province</label>*/}
                                <select
                                    className={`form-control input-border-color ${errors.province ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                    onChange={handleChange}
                                    value={values.province || ""}
                                    name={"province"}
                                    aria-label="Default select example">
                                    <option hidden>Select Province</option>
                                    {provinces.map((province) => (
                                        <option key={province} value={province}>
                                            {province}
                                        </option>
                                    ))}
                                </select>
                                {errors.province && <p className={"error-message text-danger"}>{errors.province}</p>}
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <div>
                        <Row className="text-box-Container mb-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                {/*<h6><label htmlFor="district" className="">District</label></h6>*/}
                                <fieldset>
                                    <Form.Group as={Row} className="mb-3">
                                        <h5 className={'mb-3 fw-semibold'}>Select Boarding Type</h5>
                                        <Col sm={12} className={"pe-1"}>
                                            <div className={"boarding-type-home-button pb-2"}>
                                                <Form.Check
                                                    type="radio"
                                                    name="boardingType"
                                                    // value={values.boardingType}
                                                    onChange={handleChange}
                                                    label={<div className={`boarding-type-home-container w-100 ps-3 `}>
                                                        <div
                                                            className={`boarding-type-home ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                            <div>
                                                                <div> An Entire Home</div>
                                                                <div className={"radio-btn"}>Students have whole place
                                                                    to
                                                                    themselves.
                                                                </div>
                                                            </div>

                                                            <div className={"ps-5 pe-2"}><img src={home} alt={"home"}/>
                                                            </div>
                                                        </div>

                                                    </div>}
                                                    id="formHorizontalRadios1"
                                                />
                                            </div>

                                            <div className={"boarding-type-home-button pb-2"} style={{width: "100%"}}>
                                                <Form.Check
                                                    type="radio"
                                                    name="boardingType"
                                                    // value={values.boardingType}
                                                    onChange={handleChange}
                                                    label={<div className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div
                                                            className={`boarding-type-home ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                            <div>
                                                                <div>A Room</div>
                                                                <div className={"radio-btn"}>Students have their own
                                                                    room themselves.
                                                                </div>
                                                            </div>
                                                            <div className={`ps-5 pe-2`}>
                                                                <img src={roomIcon} alt={"home"}/>
                                                            </div>
                                                        </div>

                                                    </div>}
                                                    id="formHorizontalRadios2"
                                                    className={"w-100 radio-form-check-label"}
                                                />
                                            </div>
                                            <div className={"boarding-type-home-button"}>
                                                <FormCheck
                                                    type="radio"
                                                    name="boardingType"
                                                    id="formHorizontalRadios3"
                                                    // value={values.boardingType || ""}
                                                    onChange={handleChange}
                                                    label={<div
                                                        className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div
                                                            className={`boarding-type-home ps-3 fw-semibold ${errors.boardingType ? "border-danger" : ""}`}>
                                                            <div>
                                                                <div>A Shared Room</div>
                                                                <div className={"radio-btn"}>Room can share more
                                                                    than one
                                                                    student.
                                                                </div>
                                                            </div>
                                                            <div className={"ps-5 pe-2"}><img src={studentIcon}
                                                                                              alt={"home"}/>
                                                            </div>

                                                        </div>
                                                    </div>}
                                                    className={"radio-circle"}
                                                />
                                            </div>
                                            {errors.boardingType &&
                                                <p className={"error-message text-danger"}>{errors.boardingType}</p>}
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <fieldset>
                                    <Form.Group as={Row} className="mb-3">
                                        <h5 className={'mb-3 fw-semibold'}>Stay Preference</h5>
                                        <Col sm={12} className={"pe-1"}>
                                            <div className={"boarding-type-home-button pb-2"}>
                                                <Form.Check
                                                    type="radio"
                                                    name="stayPreference"
                                                    onChange={handleChange}
                                                    label={<div className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div
                                                            className={`boarding-type-home ps-3 fw-semibold ${errors.stayPreference ? "border-danger" : ""}`}>
                                                            <div>
                                                                <div>Male Only</div>
                                                                <div className={"radio-btn"}>Only Boys can stay
                                                                </div>
                                                            </div>

                                                            <div className={"ps-5 pe-2"}><img src={maleIcon}
                                                                                              alt={"home"}/>
                                                            </div>
                                                        </div>

                                                    </div>}
                                                    id="formHorizontalRadios4"
                                                />
                                            </div>

                                            <div className={"boarding-type-home-button pb-2"} style={{width: "100%"}}>
                                                <Form.Check
                                                    type="radio"
                                                    name="stayPreference"
                                                    onChange={handleChange}
                                                    label={<div className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div
                                                            className={`boarding-type-home ps-3 fw-semibold ${errors.stayPreference ? "border-danger" : ""}`}>
                                                            <div>
                                                                <div>Female Only</div>
                                                                <div className={"radio-btn"}>Only Girls can stay
                                                                </div>
                                                            </div>
                                                            <div className={"ps-5 pe-2"}><img src={femaleIcon}
                                                                                              alt={"home"}/>
                                                            </div>
                                                        </div>

                                                    </div>}
                                                    id="formHorizontalRadios5"
                                                    className={"w-100"}
                                                />
                                            </div>
                                            <div className={"boarding-type-home-button"}>
                                                <FormCheck
                                                    type="radio"
                                                    name="stayPreference"
                                                    id="formHorizontalRadios6"
                                                    onChange={handleChange}
                                                    label={<div
                                                        className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div
                                                            className={`boarding-type-home ps-3 fw-semibold ${errors.stayPreference ? "border-danger" : ""}`}>
                                                            <div>
                                                                <div>No Gender Restriction</div>
                                                                <div className={"radio-btn"}>Boys or Girls can stay
                                                                </div>
                                                            </div>
                                                            <div className={"ps-5 pe-2"}><img src={personIcon}
                                                                                              alt={"home"}/>
                                                            </div>

                                                        </div>
                                                    </div>}
                                                    className={"radio-circle"}
                                                />
                                            </div>
                                            {errors.stayPreference &&
                                                <p className={"error-message text-danger"}>{errors.stayPreference}</p>}
                                        </Col>
                                    </Form.Group>
                                </fieldset>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row className="boarding-text-box-Container">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <div className={"pb-1"}>
                                    <h5 className={'mb-3 fw-semibold'}>Facilities Listing</h5>

                                    <Dropdown>
                                        <DropdownToggle variant="secondary" id="facilities-dropdown"
                                                        onChange={handleChange}
                                                        value={values.facilities || ""}
                                                        className={`input-border-color addboarding-dropdown-btn ${errors.facilities ? "border-danger" : ""}`}>
                                            <div className={"facility-dropdown"}>
                                                <div>
                                                    Select what are the Facilities available
                                                </div>
                                                <div className={"ps-5 pe-0"}><img src={dropdownArrow}
                                                                                  alt={"home"}/>
                                                </div>
                                            </div>

                                        </DropdownToggle>
                                        {errors.facilities &&
                                            <p className={"error-message text-danger"}>{errors.facilities}</p>}

                                        <DropdownMenu className={"w-100"}>
                                            <FormCheck name={"facilities"} label={<div className={"ps-3"}>WiFi</div>}
                                                       className="mx-3 my-1"
                                                       onChange={handleChange}
                                            />
                                            <FormCheck name={"facilities"}
                                                       label={<div className={"ps-3"}>Water Heater</div>}
                                                       className="mx-3 my-1"
                                                       onChange={handleChange}
                                            />
                                            <FormCheck name={"facilities"}
                                                       label={<div className={"ps-3"}>Study Hall</div>}
                                                       className="mx-3 my-1"
                                                       onChange={handleChange}
                                            />
                                            <FormCheck name={"facilities"} label={<div className={"ps-3"}>Kitchen</div>}
                                                       className="mx-3 my-1"
                                                       onChange={handleChange}
                                            />
                                            <FormCheck name={"facilities"} label={<div className={"ps-3"}>Fan</div>}
                                                       className="mx-3 my-1 "
                                                       onChange={handleChange}
                                            />
                                            <FormCheck name={"facilities"} label={<div className={"ps-3"}>Cooker</div>}
                                                       className="mx-3 my-1"
                                                       onChange={handleChange}
                                            />
                                            <FormCheck name={"facilities"}
                                                       label={<div className={"ps-3"}>Other Facilities</div>}
                                                       className="mx-3 my-1"
                                                       onChange={handleChange}
                                            />
                                            <div className={"w-100 ps-3 pe-3 pt-3"}>
                                                <FormControl name={"facilities"} id=""
                                                             onChange={handleChange}
                                                             className={"input-border-color checkbox-input "}
                                                             placeholder="If other facilities specify here"/>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>

                                <div>
                                    <h5 className={'mb-3 fw-semibold'}>Members Count</h5>
                                    <FormControl id="boardingName" name={"membersCount"}
                                                 className={`input-border-color ${errors.membersCount ? "border-danger" : ""}`}
                                                 onChange={handleChange}
                                                 value={values.membersCount || ""}
                                                 placeholder="Enter How Many Members Can Stay" type={"number"}
                                    />
                                    {errors.membersCount &&
                                        <p className={"error-message text-danger"}>{errors.membersCount}</p>}
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <div>
                        <Row className="text-box-Container mb-lg-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="rooms" className="">No.of Rooms</label></h6>
                                <FormControl id="rooms"
                                             name={"noOfRooms"}
                                             className={`input-border-color ${errors.noOfRooms ? "border-danger" : ""}`}
                                             onChange={handleChange}
                                             value={values.noOfRooms || ""}
                                             placeholder="Enter No.of Rooms"
                                />
                                {errors.noOfRooms && <p className={"error-message text-danger"}>{errors.noOfRooms}</p>}
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>

                                <h6><label htmlFor="price" className="">Price per Month</label></h6>
                                <FormControl id="price" name={"pricePerMonth"}
                                             className={`input-border-color ${errors.pricePerMonth ? "border-danger" : ""}`}
                                             onChange={handleChange}
                                             value={values.pricePerMonth || ""}
                                             placeholder="Enter Price"
                                />
                                {errors.pricePerMonth &&
                                    <p className={"error-message text-danger"}>{errors.pricePerMonth}</p>}
                            </Col>
                        </Row>

                        <Row className="text-box-Container mb-lg-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="distance" className="">Distance</label></h6>
                                <FormControl id="distance" name={"distance"}
                                             className={`input-border-color ${errors.distance ? "border-danger" : ""}`}
                                             onChange={handleChange}
                                             value={values.distance || ""}
                                             placeholder="Enter Distance from University"
                                />
                                {errors.distance && <p className={"error-message text-danger"}>{errors.distance}</p>}
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="university" className="">Nearest University Name</label></h6>
                                {/*<FormControl id="university" name={"nearestUniversity"}*/}
                                {/*             className={`input-border-color ${errors.nearestUniversity ? "border-danger" : ""}`}*/}
                                {/*             onChange={handleChange}*/}
                                {/*             value={values.nearestUniversity || ""}*/}
                                {/*             placeholder="Enter Nearest University"*/}
                                {/*/>*/}
                                <select
                                    className={`form-control input-border-color ${errors.nearestUniversity ? "border-red" : ""} ${["View", "State"].includes(props.type) ? " form-control:disabled " : ""} `}
                                    onChange={handleChange}
                                    value={values.nearestUniversity || ""}
                                    name={"nearestUniversity"}
                                    aria-label="Default select example">
                                    <option hidden>Select Nearest University</option>
                                    {nearByUniversities.map((nearestUniversity) => (
                                        <option key={nearestUniversity} value={nearestUniversity}>
                                            {nearestUniversity}
                                        </option>
                                    ))}
                                </select>
                                {errors.nearestUniversity &&
                                    <p className={"error-message text-danger"}>{errors.nearestUniversity}</p>}
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row className="text-box-Container mb-3">
                            <Col md={6} className="ps-3 pe-lg-5">
                                <h6><label htmlFor="rooms" className="">Advance Payment</label></h6>
                                <FormControl id="rooms" name={"advancedPayment"}
                                             className={`input-border-color ${errors.advancedPayment ? "border-danger" : ""}`}
                                             onChange={handleChange}
                                             value={values.advancedPayment || ""}
                                             placeholder="Enter Advance Payment"
                                />
                                {errors.advancedPayment &&
                                    <p className={"error-message text-danger"}>{errors.advancedPayment}</p>}
                            </Col>
                        </Row>
                    </div>
                    <div className="container-fluid boading-image-uploader my-5 pt-3 mb-3">
                        <div className={""}>
                            <div className="fw-bold fs-5">Upload Boarding</div>
                            <div className={"fw-light fst-normal pt-2"}>Add 360 degree view Images of your Boarding
                            </div>
                        </div>
                        <div className={"row mt-4"}>
                            <div className={"col-md-6 px-0 pe-lg-3 pb-3 pb-lg-0 "}>
                                <FileUploader handleChange={handleChangeBoardingImage} name={"boardingImage"}
                                              // value={values.boardingImage || ""}
                                              className={`input-border-color ${errors.boardingImage ? "border-danger" : ""}`}>
                                    <div className={"file-uploader-container-main"}>
                                        {!selectedBoardingImages ? <img src={camera} alt={"camera"} width={"50px"}
                                                                className={"img-upload"}/>: <img src={selectedBoardingImages} alt={"camera"} width={""}
                                                                                                 className={"img-upload selected-img-upload"}/>}
                                        <div className={"my-2"}>
                                            {/*{errors.boardingImage &&*/}
                                            {/*    <p className={"error-message text-danger"}>{errors.boardingImage}</p>}*/}
                                        </div>
                                    </div>
                                </FileUploader>

                            </div>
                            <div className={"col-md-6 pe-0 px-0"}>
                                <div className={"row m-0"}>
                                    <div className={"col-md-6 pe-0 pe-lg-3 pb-3 ps-0"}>
                                        <FileUploader name={"boardingImage2"}
                                                      // value={values.boardingImage || ""}
                                                      className={`input-border-color ${errors.boardingImage ? "border-danger" : ""}`}>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"my-2"}>
                                                    {/*{errors.boardingImage &&*/}
                                                    {/*    <p className={"error-message text-danger"}>{errors.boardingImage}</p>}*/}
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                    <div className={"col-md-6 px-0 pb-3"}>
                                        <FileUploader name={"boardingImage3"}
                                                      // value={values.boardingImage || ""}
                                                      className={`input-border-color ${errors.boardingImage ? "border-danger" : ""}`}>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"my-2"}>
                                                    {/*{errors.boardingImage &&*/}
                                                    {/*    <p className={"error-message text-danger"}>{errors.boardingImage}</p>}*/}
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                    <div className={"col-md-6 px-0 pe-lg-3 pb-3 pb-lg-0"}>
                                        <FileUploader name={"boardingImage4"}
                                                      // value={values.boardingImage || ""}
                                                      className={`input-border-color ${errors.boardingImage ? "border-danger" : ""}`}>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"my-2"}>
                                                    {/*{errors.boardingImage &&*/}
                                                    {/*    <p className={"error-message text-danger"}>{errors.boardingImage}</p>}*/}
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                    <div className={"col-md-6 px-0"}>
                                        <FileUploader name={"boardingImage5"}
                                                      value={values.boardingImage || ""}
                                                      className={`input-border-color ${errors.boardingImage ? "border-danger" : ""}`}>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"my-2"}>
                                                    {/*{errors.boardingImage &&*/}
                                                    {/*    <p className={"error-message text-danger"}>{errors.boardingImage}</p>}*/}
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid boading-image-uploader my-0 pt-0 px-0 pb-3">
                        <div>
                            <FileUploader handleChange={handleChangeMoreBoardingImages} multiple>
                                <div className="file-uploader-container-main more-upload">
                                    {moreBoardingImages.length === 0 ? (
                                        <img src={addIcon} alt="" width="50px" className="more-image-upload"/>
                                    ) : (moreBoardingImages.map((image, index) => (
                                            <img key={index} src={image} alt="" width="50px"
                                                 className="after-more-image-upload"/>
                                        ))
                                    )}
                                    <div className="fw-semibold my-2">Add More Images Here</div>
                                </div>
                            </FileUploader>
                        </div>
                    </div>
                    <div className="container-fluid my-5 pt-3 mb-3">
                        <div className={""}>
                            <div className="fw-bold fs-5">Boarding Location</div>
                        </div>
                    </div>
                    <div className={"modal-footer student-settings-btn"}>
                        <button type="submit" className={"btn btn-secondary students-dropdown-btn "}
                            // onClick={handleSubmit}
                        >Submit
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default AddBoarding;
