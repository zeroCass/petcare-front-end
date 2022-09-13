import React, { createContext, useState } from 'react'

export const ClientContext = createContext()


export default ClientProvider = ({ children }) => {

    const [client, setClient] = useState({})
    return (
        <ClientContext.Provider value={{
            client, setClient
        }}>
            {children}
        </ClientContext.Provider>
    )
    
}