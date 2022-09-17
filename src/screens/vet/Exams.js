import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import { ConsultationContext } from '@context/Consultation'

export default () => {
    const { consultation } = useContext(ConsultationContext)
    return (
        <View>
            <Text>Lista de Exames</Text>
        </View>
    )
}