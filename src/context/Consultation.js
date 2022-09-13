import React, { createContext, useState } from 'react'

export const ConsultationContext = createContext()

export default ConsultationProvider = ({ children }) => {

    const [consultation, setConsultation] = useState({})
    return (
        <ConsultationContext.Provider value={{
            consultation, setConsultation
        }}>
            {children}
        </ConsultationContext.Provider>
    )
    
}