import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'

import { ConsultationContext } from '@context/Consultation'
import { AuthContext } from '@context/Auth'

export default ({ navigation, consultation }) => {
    const { user } = useContext(AuthContext)
    const { setConsultation } = useContext(ConsultationContext)
    const stringDateFormatted = moment(new Date(consultation.consultationDateTime)).format('DD [de] MMMM [às] HH:mm')
    return (
        <TouchableOpacity onPress={() => {
            setConsultation({...consultation})
            const nextScreen = user.employeeType === 'Vet' 
                ? 'ConsultationTab' : 'Consultation'
            const options = user.employeeType === 'Vet' 
                ? {screen: 'Consultation', screenName: 'Consulta'} : {}
            navigation.navigate(nextScreen, options)
        }} >
            <View style={styles.container}>
                <View style={styles.viewTitle}>
                    <Text style={styles.title}>{consultation.name}</Text>
                </View>
                <View style={styles.viewCenter}>
                    <Text style={{ color: '#000', fontWeight:'bold' }}>{stringDateFormatted}</Text>
                </View>
                <View style={styles.viewVet}>
                    <Text>Nome Vet.:{consultation.vetName}</Text>
                    <Text>Espec.:{consultation.speciality}</Text>
                </View>
                <View style={styles.viewStatus}>
                    <Text>{consultation.status}</Text>
                </View>     
            </View>
        </TouchableOpacity>
        
    )

}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 0.15,
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#AAA',
    },
    viewTitle: {
        alignItems:'center',
        width: '100%',
        backgroundColor: '#000',
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    viewCenter: {
        alignItems:'center',
        width: '100%',
    },
    viewVet: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    viewStatus: {
        justifyContent: 'flex-end',
        alignItems:'center',
        width: '100%',
    },
})