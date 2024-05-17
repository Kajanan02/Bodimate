import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import FeatherIcon from "feather-icons-react";
import logo from '../../src/assets/logo.png';
import '../App.css'
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-light text-dark pt-4 shadow-sm p-3 mb-5 bg-body rounded">
            <Container>
                <Row className={"pb-3"}>
                    <Col md={3} className={"pb-4"}>
                        <div className="mb-3">
                            <div className={"row"}>
                                <div className={"col d-flex align-items-center pb-3"}>
                                    <img src={logo} alt="logo" className="footer-logo"/>
                                    <div className="footer-logo-text ms-3"><b>Bodimate</b></div>
                                </div>
                            </div>
                        </div>
                        <div className={"footer-sub-text fw-bold pb-2"}>About Us</div>
                        <p className={"footer-text"}>We provide the best boarding services for your convenience. Join us
                            for a seamless and
                            comfortable stay.</p>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-transparent footer-icon-button me-2">
                                <FeatherIcon className="" icon={"facebook"}/>
                            </button>
                            <button className="btn btn-transparent footer-icon-button me-2">
                                <FeatherIcon className="" icon={"mail"}/>
                            </button>
                            <button className="btn btn-transparent footer-icon-button me-2">
                                <FeatherIcon className="" icon={"twitter"}/>
                            </button>
                            <button className="btn btn-transparent footer-icon-button me-2">
                                <FeatherIcon className="" icon={"youtube"}/>
                            </button>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className={"footer-sub-head fw-medium"}><p>Quick Links</p></div>
                        <ul className="list-unstyled">
                            <li className={"pb-2"}><NavLink to={"/"}
                                                            className={"footer-link text-decoration-none fw-medium"}>Home</NavLink>
                            </li>
                            <li className={"pb-2"}><NavLink to={"/nearby-universities"}
                                                            className={"footer-link text-decoration-none fw-medium"}>Explore
                                nearby universities</NavLink>
                            </li>
                            <li className={"pb-2"}><NavLink to={"/contact-us"}
                                                            className={"footer-link text-decoration-none fw-medium"}>Contact
                                Us</NavLink>
                            </li>
                            <li className={"pb-2"}><NavLink to={"/boding-home"}
                                                            className={"footer-link text-decoration-none fw-medium"}>Bodimate
                                your home</NavLink>
                            </li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <div className={"footer-sub-head fw-medium"}><p>Reservation Information</p></div>
                        <ul className="list-unstyled">
                            <li className={"pb-2"}><NavLink to={"/registe"}
                                                            className={"footer-link text-decoration-none fw-medium"}>Register</NavLink>
                            </li>
                            <li className={"pb-2"}><NavLink to={"/log-in"}
                                                            className={"footer-link text-decoration-none fw-medium"}>Log
                                In</NavLink>
                            </li>
                            <li className={"pb-2"}><NavLink to={"/help-cente"}
                                                            className={"footer-link text-decoration-none fw-medium"}>Help
                                Center</NavLink></li>
                            <li className={"pb-2"}><NavLink to={"/faq"}
                                                            className={"footer-link text-decoration-none fw-medium"}>FAQ</NavLink>
                            </li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <div className={"footer-sub-head fw-medium"}><p>Contact Us</p></div>
                        <Row className={"pb-2"}>
                            <Col xs={2}><FeatherIcon className={"footer-icon"} icon={"mail"}/></Col>
                            <Col xs={10} className={"footer-text fw-medium"}>contact@bodimate.com</Col>
                        </Row>
                        <Row className={"pb-2"}>
                            <Col xs={2}><FeatherIcon className={"footer-icon"} icon={"phone"}/></Col>
                            <Col xs={10} className={"footer-text fw-medium"}>+94 77 123 4567</Col>
                        </Row>
                        <Row className={"pb-2"}>
                            <Col xs={2}><FeatherIcon className={"footer-icon"} icon={"map-pin"}/></Col>
                            <Col xs={10} className={"footer-text fw-medium"}>No. 123, Main St, Wellawatta, Colombo, Sri
                                Lanka.</Col>
                        </Row>
                    </Col>
                </Row>
                <hr className={"footer-hr"}/>
                <div className="text-center py-3 text-secondary">
                    &copy; 2024 Bodimate
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
