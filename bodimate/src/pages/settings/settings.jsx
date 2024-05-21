import React from 'react';
import home from "../../assets/home.svg";
import "./settings.css"

function Settings() {
    return (
        <div className={"settings-container"}>
            <div>
                <h3 className={'mb-5 main-title'}>Settings</h3>
            </div>
            <div className={'details-title-container mb-2'}>
                <img src={home} alt="Home Icon"/>
                <div className={'title ms-1 fw-bold'}>Account Details</div>
            </div>
        </div>
    );
}

export default Settings;