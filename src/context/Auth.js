import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const initialState = {
    token: false,
    employeeType: 'Attendant',
    // employeeType: 'Vet',
}

export default AuthProvider = ({ children }) => {

    const [user, setUser] = useState(initialState)
    return (
        <AuthContext.Provider value={{
            user, setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
    
}