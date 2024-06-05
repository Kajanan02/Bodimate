import React from 'react';
import Header from "../header.jsx";
import Footer from "../footer.jsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Layout;