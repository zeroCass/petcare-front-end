import React, { useContext, useCallback, useState } from 'react'
import { View, Text, Button, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'
import moment from 'moment'
import 'moment/locale/pt-br'


import { AuthContext } from '@context/Auth'
import { ClientContext } from '@context/Client'
import { ConsultationContext } from '@context/Consultation'
import Consultation from '@components/Consultation'
import dataConsult from '../../dataConsult'


export default (props) => {
    const { user } = useContext(AuthContext)
    const { setClient } = useContext(ClientContext)
    const { setConsultation } = useContext(ConsultationContext)
    const [consultations ] = useState(dataConsult)

    useFocusEffect(
        useCallback(() => {
            // everytime is home, reset client e consultation
            setClient({})
            setConsultation({})
        }, [])
    )

    return (
        <View style={styles.container}>
            <View style={styles.topContent} >
                <View style={styles.menuButton} >
                    <IconButton
                        icon='menu'
                        size={30}
                        color='#FFF'
                        onPress={() => props.navigation.toggleDrawer()}
                    />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={styles.txtTitle}>Consultas</Text>
                    <Text style={styles.txtSubTitle}>{moment().format('DD [de] MMMM')}</Text>
                </View>
            </View>
            <View style={styles.content} >
                <FlatList
                    data={consultations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Consultation consultation={{...item}} {...props} />}
                />
                {user.employeeType === 'Attendant'
                ? <View style={styles.addButton}>
                    <IconButton
                        icon='plus-circle'
                        size={50}
                        onPress={() => {
                            props.navigation.navigate('Consultation')
                        }}
                    />
                </View>
                : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContent: {
        height: '25%',
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        height: '75%',
    },
    menuButton: {
        position: 'absolute',
        top: 5,
        left: 5,
    },
    txtTitle: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 40,
    },
    txtSubTitle: {
        color: '#FFF',
        fontSize: 18,
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },


})