import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import { ConsultationContext } from '@context/Consultation'

export default () => {
    const { consultation } = useContext(ConsultationContext)
    return (
        <View>
            <Text>PET Status</Text>
            <Text>{consultation.consultationDateTime}</Text>
            <Text>{consultation.idPet} - {consultation.name}</Text>
        </View>
    )
}