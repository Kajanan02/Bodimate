import React from 'react';
import './styles.css';
import logo from '../../src/assets/logo.png';
import FeatherIcon from "feather-icons-react";


function NavBar() {
    return (

        <nav className="contai navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={logo} alt="logo" className="nav-logo"/>
                    <div className="nav-logo-text ms-3"><b>Bodimate</b></div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex" id="navbarScroll">
                    <ul className="navbar-nav me-auto gap-10 m-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <a className="nav-link home active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link explore nav-link-text" href="#">Explore nearby universities</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link contact nav-link-text" href="#">Contact Us</a>
                        </li>
                    </ul>

                </div>
                <div className={"d-flex"}>
                    <ul className="nav-owner my-lg-0 navbar-nav-scroll m-0">
                        <div className="nav-item m-0">
                            <a className="nav-link-owner bodimate-home nav-link-text text-decoration-none" href="#">Bodimate
                                your home</a>
                        </div>
                    </ul>
                    <div>
                        <ul className="navbar-nav navbar-nav-icon ml-auto m-0">
                            <li className="nav-item dropdown m-0">
                                <a className="nav-link user-btn-icon dropdown-toggle" href="#" id="navbarDropdown"
                                   role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    <FeatherIcon className="" icon={"menu"}/>
                                    <span className="ms-1">
                                    <FeatherIcon className="" icon={"user"}/>
                                </span>
                                </a>
                                <ul className="dropdown-menu m-0" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Sign Up</a></li>
                                    <li><a className="dropdown-item" href="#">Log In</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Bodimate Home</a></li>
                                    <li><a className="dropdown-item" href="#">Help Center</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
