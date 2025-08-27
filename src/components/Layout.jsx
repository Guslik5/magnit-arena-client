import React from 'react';
import { Outlet } from 'react-router-dom';

import '../App.css';
import Header from "./Header.jsx";


function Layout() {
    return (
        <div className="bg-body-tertiary">
            <Header/>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;