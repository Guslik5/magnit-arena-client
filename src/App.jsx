import './App.css'
import Home from "./pages/Home.jsx";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;