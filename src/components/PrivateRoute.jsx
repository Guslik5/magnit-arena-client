import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children }) {
    const { isLoggedIn } = useContext(AuthContext);

    return isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;