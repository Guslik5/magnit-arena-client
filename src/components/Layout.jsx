import React from 'react';
import { Outlet } from 'react-router-dom';

import '../App.css';
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";


function Layout() {
    return (
        <div className="bg-body-tertiary">
            <NavBar/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;