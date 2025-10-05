import './App.css'
import Home from "./pages/Home.jsx";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Layout from "./components/Layout.jsx";

import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import CreateNewsPage from "./pages/CreateNewsPage.jsx";
import EditNewsPage from "./pages/EditNewsPage.jsx";
import News from "./pages/News.jsx";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/news/:id" element={<News />} />
                </Route>


                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/news/create" element={<CreateNewsPage />} />
                <Route path="/admin/news/edit/:id" element={<EditNewsPage />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;