import React from 'react';
import './styles.css';
import logo from '../../src/assets/logo.png';
import FeatherIcon from "feather-icons-react";
import {NavLink} from "react-router-dom";


function Header() {


    const [username, setUsername] = React.useState(localStorage.getItem('NAME'));

    return (

        <nav className="contai navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-body rounded ">
            <div className="container ">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={logo} alt="logo" className="nav-logo"/>
                    <div className="nav-logo-text ms-3"><b>Bodimate</b></div>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarScroll">
                    <div className="d-flex m-auto">
                        <ul className="navbar-nav me-auto gap-10 m-auto my-2 my-lg-0 navbar-nav-scroll">
                            <li className="nav-item">
                                <NavLink className="nav-link home nav-link-text" aria-current="page"
                                         to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link explore nav-link-text" to={"/nearby-universities"}>Explore
                                    nearby universities</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link contact nav-link-text" to={"/contact-us"}>Contact
                                    Us</NavLink>
                            </li>
                            <li className="nav-item d-lg-none">
                                <NavLink className="nav-link contact nav-link-text" to={"/boding-home"}>Bodimate your
                                    home</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={"d-none d-lg-flex"}>
                    <ul className="nav-owner my-lg-0 navbar-nav-scroll m-0">
                        <div className="nav-item m-0 d-none d-lg-block">
                            <NavLink className="nav-link-owner bodimate-home nav-link-text text-decoration-none"
                                     to={"/boding-home"}>Bodimate
                                your home</NavLink>
                        </div>
                    </ul>
                    <div>
                        <ul className="navbar-nav navbar-nav-icon ml-auto m-0">
                            <li className="nav-item dropdown m-0">
                                <NavLink style={{minWidth: "42px"}}
                                         className="nav-link user-btn-icon dropdown-toggle text-center" to={"/"}
                                         id="navbarDropdown"
                                         role="button"
                                         data-bs-toggle="dropdown" aria-expanded="false">
                                    {username ? <span className={"text-center"}>{username?.slice(0, 1)}</span> :
                                        <div>
                                            <FeatherIcon className="" icon={"menu"}/>
                                            <span className="ms-1">
                                    <FeatherIcon className="" icon={"user"}/>
                                </span>
                                        </div>
                                    }
                                </NavLink>
                                <ul className="dropdown-menu m-0" aria-labelledby="navbarDropdown">
                                    {!username ?
                                        <li><NavLink className="dropdown-item dropdown-detail" to={"/register"}>Sign
                                            Up</NavLink></li> : null}
                                    {!username ? <li><NavLink className="dropdown-item dropdown-detail" to={"/login"}>Log
                                        In</NavLink></li> : null}
                                    {username &&<li><NavLink className="dropdown-item dropdown-detail"
                                                  to={"/admin"}>Profile</NavLink></li>}
                                    {username &&<li>
                                        <div className="dropdown-item dropdown-detail" onClick={()=>{
                                            localStorage.clear();
                                            setUsername(null)
                                        }}
                                        >Logout
                                        </div>
                                    </li>}
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><NavLink className="dropdown-item dropdown-detail" to={"/bodimate-home"}>Bodimate
                                        Home</NavLink></li>
                                    <li><NavLink className="dropdown-item dropdown-detail" to={"/help-cente"}>Help
                                        Center</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
