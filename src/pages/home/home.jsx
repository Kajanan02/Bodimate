import React from 'react';
import BoardingCard from "./boarding-card/boarding-card.jsx";
import bording from '../../assets/home/Big Card.png';
import homeContact from "../../assets/neaby-university/contact us.png";
import uva from '../../assets/neaby-university/uwu.jpg'

import './home.css';

function Home() {

    return (
        <div>
            <div className="container padx-sm-3 padx-md-4 pad-lg-20 home-container">
                <div className="main-image-container">
                    <img src={bording} alt="Main" className="main-image"/>
                    <div className="overlay-text">
                        <h1>Not sure where to go? Perfect.</h1>
                        <button className="btn btn-flexible mt-3"> I'm flexible</button>
                    </div>
                </div>

                <div className="subheading mt-5">Discover Boarding</div>

                <div className="row mt-4">
                    {[...Array(12)].map((_, idx) => (
                        <div key={idx} className="col-12 col-md-6 col-lg-3 mb-4">
                            <BoardingCard/>
                        </div>
                    ))}

                    <div className="text-center mt-4">
                        <button className="btn btn-secondary">Show more</button>
                    </div>
                </div>
            </div>
            <div className="explore-container mt-5 padx-sm-3 padx-md-4 pad-lg-20 my-5 py-5">
                <div className={"container"}>
                    <div className="subheading mt-5">Explore nearby universities</div>
                    <div className="row">
                        {[...Array(12)].map((_, idx) => (
                            <div className="col-12 col-md-6 col-lg-3 mb-4 " key={"uni" + idx}>
                                <div className="university-card d-flex align-items-center">
                                    <img src={uva} alt="{university}" className="university-image"/>
                                    <div className="ms-2">
                                        <h5 className="university-name">University of Colombo</h5>
                                        <p className="university-drive">15 minute drive</p>
                                    </div>
                                </div>
                            </div>))}
                    </div>
                </div>
            </div>
            <div className={"container pb-5 pt-3"}>
                <div className="Contact-image-container   pad-lg-20 my-5">
                    <img src={homeContact} alt="Main" className="Contact-image"/>
                    <div className="">
                        <h1 className="home-overlay-text">Questions <br/>about <br/>hosting?</h1>
                        <button className="btn btn-light mt-3 p-2 home-overlay-btn px-4">Contact us</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;