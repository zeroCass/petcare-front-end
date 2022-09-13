import React from 'react'

import Navigation from '@navigation/Navigation'
import AuthProvider from '@context/Auth'
import ClientProvider from '@context/Client'
import ConsultationProvider from '@context/Consultation'

export default () => {
    return (
        <AuthProvider>
            <ConsultationProvider>
                <ClientProvider>
                    <Navigation/>
                </ClientProvider>
            </ConsultationProvider>
        </AuthProvider>
    )
}