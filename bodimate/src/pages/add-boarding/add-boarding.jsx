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
import addIcon from "../../assets/plus-circle.svg"
import {Form, Row, Col, FormControl, FormCheck, DropdownMenu, Dropdown, DropdownToggle,} from "react-bootstrap";

function AddBoarding() {

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
                <Form>
                    <div>
                        <h5 className={'mb-3 fw-semibold'}>Address</h5>
                        <Row className="text-box-Container mb-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="boardingName" className="">Boarding Name</label></h6>
                                <FormControl id="boardingName" className={"input-border-color"}
                                             placeholder="Enter Boarding Name"/>
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="boardingNo" className="">Boarding No</label></h6>
                                <FormControl id="boardingNo" className={"input-border-color"}
                                             placeholder="Enter Boarding No"/>
                            </Col>
                        </Row>

                        <Row className="text-box-Container mb-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="street" className="">Street</label></h6>
                                <FormControl id="street" className={"input-border-color"} placeholder="Enter Street"/>
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="city" className="">City/Town/Village</label></h6>
                                <FormControl id="city" className={"input-border-color"} placeholder="Enter City"/>
                            </Col>
                        </Row>

                        <Row className="text-box-Container mb-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="district" className="">District</label></h6>
                                <FormControl id="district" className={"input-border-color"}
                                             placeholder="Enter District"/>
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="province" className="">Province</label></h6>
                                <FormControl id="province" className={"input-border-color"}
                                             placeholder="Enter Province"/>
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
                                                    name="formHorizontalRadios"
                                                    label={<div className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div className={"boarding-type-home ps-3 fw-semibold"}>
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
                                                    name="formHorizontalRadios"
                                                    label={<div className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div className={"boarding-type-home ps-3 fw-semibold"}>
                                                            <div>
                                                                <div>A Room</div>
                                                                <div className={"radio-btn"}>Students have their own
                                                                    room.
                                                                    themselves.
                                                                </div>
                                                            </div>
                                                            <div className={"ps-5 pe-2"}><img src={roomIcon}
                                                                                              alt={"home"}/>
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
                                                    name="formHorizontalRadios"
                                                    id="formHorizontalRadios3"
                                                    label={<div
                                                        className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div className={"boarding-type-home ps-3 fw-semibold"}>
                                                            <div>
                                                                <div>A Shared Room.</div>
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
                                                    name="formHorizontalRadios"
                                                    label={<div className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div className={"boarding-type-home ps-3 fw-semibold"}>
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
                                                    name="formHorizontalRadios"
                                                    label={<div className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div className={"boarding-type-home ps-3 fw-semibold"}>
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
                                                    name="formHorizontalRadios"
                                                    id="formHorizontalRadios6"
                                                    label={<div
                                                        className={"boarding-type-home-container w-100 ps-3"}>
                                                        <div className={"boarding-type-home ps-3 fw-semibold"}>
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
                                                        className="input-border-color addboarding-dropdown-btn">
                                            <div className={"facility-dropdown"}>
                                                <div>
                                                    Select what are the Facilities available
                                                </div>
                                                <div className={"ps-5 pe-0"}><img src={dropdownArrow}
                                                                                  alt={"home"}/>
                                                </div>
                                            </div>

                                        </DropdownToggle>
                                        <DropdownMenu className={"w-100"}>
                                            <FormCheck label={<div className={"ps-3"}>WiFi</div>}
                                                       className="mx-3 my-1"/>
                                            <FormCheck label={<div className={"ps-3"}>Water Heater</div>}
                                                       className="mx-3 my-1"/>
                                            <FormCheck label={<div className={"ps-3"}>Study Hall</div>}
                                                       className="mx-3 my-1"/>
                                            <FormCheck label={<div className={"ps-3"}>Kitchen</div>}
                                                       className="mx-3 my-1"/>
                                            <FormCheck label={<div className={"ps-3"}>Fan</div>}
                                                       className="mx-3 my-1 "/>
                                            <FormCheck label={<div className={"ps-3"}>Cooker</div>}
                                                       className="mx-3 my-1"/>
                                            <FormCheck label={<div className={"ps-3"}>Other Facilities</div>}
                                                       className="mx-3 my-1"/>
                                            <div className={"w-100 ps-3 pe-3 pt-3"}>
                                                <FormControl id="boardingNo"
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
                                    <FormControl id="boardingName" className={"input-border-color"}
                                                 placeholder="Enter How Many Members Can Stay" type={"number"}/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <hr/>
                    <div>
                        <Row className="text-box-Container mb-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="rooms" className="">No.of Rooms</label></h6>
                                <FormControl id="rooms" className={"input-border-color"}
                                             placeholder="Enter No.of Rooms"/>
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>

                                <h6><label htmlFor="price" className="">Price per Month</label></h6>
                                <FormControl id="price" className={"input-border-color"} placeholder="Enter Price"/>
                            </Col>
                        </Row>

                        <Row className="text-box-Container mb-3">
                            <Col md={6} className={"ps-3 pe-lg-5"}>
                                <h6><label htmlFor="distance" className="">Distance</label></h6>
                                <FormControl id="distance" className={"input-border-color"}
                                             placeholder="Enter Distance from University"/>
                            </Col>
                            <Col md={6} className={"ps-3 ps-lg-5"}>
                                <h6><label htmlFor="university" className="">Nearest University Name</label></h6>
                                <FormControl id="university" className={"input-border-color"}
                                             placeholder="Enter Nearest University"/>
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <Row className="text-box-Container mb-3">
                            <Col md={6} className="ps-3 pe-lg-5">
                                <h6><label htmlFor="rooms" className="">Advance Payment</label></h6>
                                <FormControl id="rooms" className={"input-border-color"}
                                             placeholder="Enter Advance Payment"/>

                            </Col>
                        </Row>
                    </div>
                    <div className="container-fluid my-5 pt-3 mb-3">
                        <div className={""}>
                            <div className="fw-bold fs-5">Upload Boarding</div>
                            <div className={"fw-light fst-normal pt-2"}>Add 360 degree view Images of your Boarding
                            </div>
                        </div>
                        <div className={"row mt-4"}>
                            <div className={"col-md-6 px-0 pe-lg-3 pb-3 pb-lg-0 "}>
                                <FileUploader>
                                    <div className={"file-uploader-container-main"}>
                                        <img src={camera} alt={"camera"} width={"50px"}
                                             className={"img-upload"}/>
                                        <div className={"fw-semibold my-2"}>
                                        </div>
                                        {/*}*/}
                                    </div>
                                </FileUploader>
                            </div>
                            <div className={"col-md-6 pe-0 px-0"}>
                                <div className={"row m-0"}>
                                    <div className={"col-md-6 pe-0 pe-lg-3 pb-3 ps-0"}>
                                        <FileUploader>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"fw-semibold my-2"}>
                                                </div>
                                                {/*}*/}
                                            </div>
                                        </FileUploader>
                                    </div>
                                    <div className={"col-md-6 px-0 pb-3"}>
                                        <FileUploader>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"fw-semibold my-2"}>
                                                </div>
                                                {/*}*/}
                                            </div>
                                        </FileUploader>
                                    </div>
                                    <div className={"col-md-6 px-0 pe-lg-3 pb-3 pb-lg-0"}>
                                        <FileUploader>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"fw-semibold my-2"}>
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>
                                    <div className={"col-md-6 px-0"}>
                                        <FileUploader>
                                            <div className={"file-uploader-container-main"}>
                                                <img src={camera} alt={"camera"} width={"50px"}
                                                     className={"img-upload"}/>
                                                <div className={"fw-semibold my-2"}>
                                                </div>
                                            </div>
                                        </FileUploader>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="container-fluid my-0 pt-0 px-0 pb-3">
                        <div>
                            <FileUploader>
                                <div className={"file-uploader-container-main more-upload"}>
                                    <img src={addIcon} alt={"camera"} width={"50px"}
                                         className={"more-image-upload"}/>
                                    <div className={"fw-semibold my-2"}>Add More Images Here
                                    </div>
                                    <div className={"fw-semibold my-2"}>
                                    </div>
                                </div>
                            </FileUploader>
                        </div>
                    </div>
                    <div className="container-fluid my-5 pt-3 mb-3">
                        <div className={""}>
                            <div className="fw-bold fs-5">Boarding Location</div>
                            {/*<div className={"fw-light fst-normal pt-2"}>Add 360 degree view Images of your Boarding*/}
                            {/*</div>*/}
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
