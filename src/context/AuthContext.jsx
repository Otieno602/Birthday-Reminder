import React from 'react';
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (userToken) {
            localStorage.setItem('token', userToken);
        } else {
            localStorage.removeItem('token');
        }
    }, [userToken]);

    const login = (token) => setUserToken(token);
    const logout = () => setUserToken(null);

  return (
    <AuthContext.Provider value = {{ userToken, login, logout }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthContext