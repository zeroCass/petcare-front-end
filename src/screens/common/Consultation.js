import React, { useContext, useState, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { TextInput, IconButton, Button } from 'react-native-paper'
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import moment from 'moment'

import { ConsultationContext } from '@context/Consultation'
import ModalComp from '@components/ModalComp'
import VetQuery from '@components/VetQuery'


export default () => {
    const { consultation } = useContext(ConsultationContext)

    const [state, setState] = useState(consultation)
    const [editField, setEditField] = useState(false)
    const [editableButton, setEditableButton] = useState(true)
    const [newConsultation, setNewConsultation] = useState(false)
    const [appointDate, setAppointDate] = useState(new Date())
    const [appointTime, setAppointTime] = useState(new Date())

    const [showModal, setShowModal] = useState(false)

    const stringDateFormated = '__/__/'
    const stringTimeFormated = '  :  '


    const defaultValues = () => {
        setEditField(false)
        setEditableButton(true)
        setNewConsultation(false)
    }
    const newConsultationValues = () => {
        setEditField(true)
        setEditableButton(false)
        setNewConsultation(true)
    }

    useFocusEffect(
        useCallback(() => {
            Object.keys(state).length > 0 ? defaultValues() : newConsultationValues()
        },[])
    )

    // returns the date with the time setup
    const setupDateTime = (appointTime, appointDate) => {
        // alterar para eceber estimeTime e o appointDate
        // convert the hours, minuts of the time to ms
        const time2Ms = 
            (appointTime.getHours() * 3600 + appointTime.getMinutes() * 60) * 1000
        const dateMidnight = 
            new Date(appointDate.getFullYear(), appointDate.getMonth(), appointDate.getDate(), 0, 0, 0, 0).getTime()
        return new Date(dateMidnight + time2Ms)
    }


    const selectedVet = (vetId) => {
        console.log(vetId)
    }

    return (
        <View style={styles.container} >
            <ModalComp isVisible={showModal} 
                onClose={() => setShowModal(false)} 
                component={<VetQuery onClose={() => setShowModal(false)} onSelect={selectedVet} />} 
            />
            <View style={styles.content}>
                <View style={{ width: '100%', backgroundColor: 'green', padding: 5 }} >
                    <View style={{ alignItems:'center' }} >
                        <Text>Paciente</Text>
                    </View>
                    <View>
                        <View style={[styles.patitientView]}>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={editField}
                                    mode='outlined'
                                    label='ID'
                                    placeholder='235'
                                    value={state.petId}
                                    onChangeText={(petId) => setState({...state, petId})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                        disabled={editField}
                                        mode='outlined'
                                        label='Raça'
                                        placeholder='Buldog'
                                        value={state.petBreed}
                                        onChangeText={(petBreed) => setState({...state, petBreed})}
                                        left={<TextInput.Icon name='account'/>}
                                    />
                            </View>
                        </View>
                        <View style={styles.patitientView}>
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    disabled={editField}
                                    mode='outlined'
                                    label='Nome'
                                    placeholder='Terror'
                                    value={state.petName}
                                    onChangeText={(petName) => setState({...state, petName})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', backgroundColor: 'yellow', marginTop:20 }}>
                    <View style={{ alignItems:'center' }} >
                            <Text>Veterinario</Text>
                    </View>
                    <View>
                        <View style={styles.vetView}>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={editField}
                                    mode='outlined'
                                    label='ID'
                                    placeholder='235'
                                    value={state.vetId}
                                    onChangeText={(vetId) => setState({...state, vetId})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={editField}
                                    mode='outlined'
                                    label='Nome'
                                    placeholder='235'
                                    value={state.vetName}
                                    onChangeText={(vetName) => setState({...state, vetName})}
                                    left={<TextInput.Icon name='account'/>}
                                /> 
                            </View>
                        </View>
                        <View>
                            <Button onPress={() => setShowModal(true)} >
                                Selecionar Veterinário
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', marginTop:20 }}>
                    <View style={{ alignItems:'center' }} >
                        <Text>Data/Hora</Text>
                    </View>
                    <View style={styles.dateView}>
                        <Button mode='contained' icon='clock-time-nine' style={styles.dateButton} onPress={() => {
                            DateTimePickerAndroid.open({
                                value: appointTime,
                                onChange: (_, time) => {
                                    setAppointTime(new Date(time))
                                    console.log(time)
                                },
                                is24Hour: true,
                                mode: 'time',
                            })
                        }} >{stringTimeFormated}</Button>
                        <Button mode='contained' icon='calendar-range' style={styles.dateButton} onPress={() => {
                            DateTimePickerAndroid.open({
                                value: appointDate,
                                onChange: (_, date) => {
                                    setAppointDate(new Date(date))
                                    console.log(date)
                                },
                                mode: 'date',
                            })
                        }} >{stringDateFormated}</Button>
                    </View>
                </View>
                {editableButton
                ? <View style={styles.button} >
                    <IconButton
                        icon='pencil-circle'
                        size={50}
                        onPress={() => {
                            setEditableButton(false)
                            setEditField(true)
                        }}
                    />
                </View> 
                : <View style={styles.doubleButton}>
                    <IconButton
                        icon='close-circle'
                        size={50}
                        onPress={() => {
                            defaultValues()
                            // setState({})
                        }}
                    />
                    <IconButton
                        icon='check-circle'
                        size={50}
                        onPress={() => {
                            defaultValues()
                            // setState({})
                        }}
                    />
                </View>}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        padding: 5,
        // margin: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        // padding: 10,
        // margin: 10,
    },
    patitientView: {
        flexDirection: 'row',
    },
    vetView: {
        backgroundColor: 'blue',
        width: '100%',
        flexDirection: 'row',
    },
    dateButton: {
        margin: 10, 
        borderRadius: 25,
        backgroundColor: '#1081B6',
    },
    dateView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 3,
        right: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    doubleButton: {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        position: 'absolute', 
        top: 5, 
        right: 10, 
    }

})