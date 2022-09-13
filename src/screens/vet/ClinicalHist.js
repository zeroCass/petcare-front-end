import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import { ConsultationContext } from '@context/Consultation'

export default () => {
    const { consultation } = useContext(ConsultationContext)
    return (
        <View>
            <Text>Historico Clinico</Text>
            <Text>{consultation.id}</Text>
            <Text>{consultation.date}</Text>
            <Text>{consultation.vet.name}</Text>
            <Text>{consultation.client.name}</Text>
        </View>
    )
}