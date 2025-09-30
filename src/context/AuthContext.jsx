import { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
    userData: null,
    setUserData: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    const login = (data) => {
        setIsAuthenticated(true);
        setUserData(data);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserData(null);
        localStorage.removeItem('token');
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        userData,
        setUserData,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};