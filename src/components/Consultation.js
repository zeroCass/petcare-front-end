import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { ConsultationContext } from '@context/Consultation'
import { AuthContext } from '@context/Auth'

export default ({ navigation, consultation }) => {
    const { user } = useContext(AuthContext)
    const { setConsultation } = useContext(ConsultationContext)
    return (
        <TouchableOpacity onPress={() => {
            setConsultation({...consultation})
            const nextScreen = user.employeeType === 'vet' 
                ? 'ConsultationTab' : 'Consultation'
            const options = user.employeeType === 'vet' 
                ? {screen: 'Consultation', screenName: 'Consulta'} : {}
            navigation.navigate(nextScreen, options)
        }} >
            <View>
                <Text>{consultation.id}</Text>
                <Text>{consultation.date}</Text>
                <Text>{consultation.vet.name}</Text>
                <Text>{consultation.client.name}</Text>
            </View>
        </TouchableOpacity>
        
    )

}