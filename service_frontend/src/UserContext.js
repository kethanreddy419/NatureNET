// src/UserContext.js

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);

    return (
        <UserContext.Provider value={{ profile, setProfile }}>
            {children}
        </UserContext.Provider>
    );
};
