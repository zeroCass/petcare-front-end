import React, { useContext, useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { TextInput, IconButton, Button } from 'react-native-paper'
import { DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import moment from 'moment'
import 'moment/locale/pt-br'

import { ConsultationContext } from '@context/Consultation'
import { AuthContext } from '@context/Auth'
import ModalComp from '@components/ModalComp'
import VetQuery from '@components/VetQuery'
import axios from 'axios'
import { server } from '../../api'

export default () => {
    const { consultation } = useContext(ConsultationContext)
    const { user } = useContext(AuthContext)
    const [state, setState] = useState({})
    const [editField, setEditField] = useState(false)
    const [editableButton, setEditableButton] = useState(true)
    const [newConsultation, setNewConsultation] = useState(false)
    const [appointDate, setAppointDate] = useState(new Date())
    const [appointTime, setAppointTime] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const stringDateFormated = !state.consultationDateTime ? '__/___/' : moment(new Date(state.consultationDateTime)).format('DD/MMM')
    const stringTimeFormated = !state.consultationDateTime ? '   :  ' : moment(new Date(state.consultationDateTime)).format('HH:mm')

    const addConsultation = async () => {
        const consultationDateTime = setupDateTime()
        
        try {
            setIsLoading(true)
            const res = await axios.post(`${server}/consultation`, {
                consultationDateTime: consultationDateTime,
                idPet: state.idPet,
                idVet: state.idVet,
                price: state.price,
                status: 'Agendada',
            })
            if (res.status === 200) {
                console.warn('Consulta registrada')
                defaultValues()
            }
            setIsLoading(false)
        }
        catch(e) {
            console.warn(e)
            setIsLoading(false)
        }
    }
    const updateConsultation = async () => {
        try {
            setIsLoading(true)
            const res = await axios.put(`${server}/consultation`, {
                consultationDateTime: state.consultationDateTime,
                idPet: state.idPet,
                idVet: state.idVet,
                price: state.price,
                status: state.status,
            })
            if (res.status === 200) {
                console.warn('Consulta atualizada')
                defaultValues()
            }
            setIsLoading(false)
        }
        catch(e) {
            console.warn(e)
            setIsLoading(false)
        }
    }
    const deleteConsultation = async () => {
        try {
            setIsLoading(true)
            const res = await axios.delete(`${server}/consultation/
                ${state.consultationDateTime}/${state.idPet}/${state.idVet}`)
            if (res.status === 200) {
                console.warn('Consulta Deletada')
                defaultValues()
                setState({})
            }
            setIsLoading(false)
        }
        catch(e) {
            console.warn(e)
            setIsLoading(false)
        }
    }

    const defaultValues = () => {
        setEditField(false)
        setEditableButton(true)
        setNewConsultation(false)
        setState({...consultation})
    }
    const newConsultationValues = () => {
        setEditField(true)
        setEditableButton(false)
        setNewConsultation(true)
        setState({
          idPet: '',
          idVet: '',
          price: '',  
        })
    }

    useFocusEffect(
        // everytime consultation state changes: (re-create the function - usecallback)
        useCallback(() => {
            // if state is empty, so is in create MODE
            Object.keys(consultation).length > 0 ? defaultValues() : newConsultationValues()
            
            // on unmount
            return () => setState({})
        },[consultation])

    )



    // get two datetime (one for time and another for the date) and returns only ONE datetime
    const setupDateTime = () => {
        // convert the hours, minuts of the time to ms
        const time2Ms = 
            (appointTime.getHours() * 3600 + appointTime.getMinutes() * 60) * 1000
        const dateMidnight = 
            new Date(appointDate.getFullYear(), appointDate.getMonth(), appointDate.getDate(), 0, 0, 0, 0).getTime()
        return new Date(dateMidnight + time2Ms)
    }


    // selected only ONE item that contains vet info
    const selectedVet = (selectedItems) => {
        if (selectedItems.length >= 0) {
            const { item: vet } = selectedItems[0] 
            setState({...state, idVet: vet.idVet, speciality: vet.speciality, vetName: vet.name})
        }   
  
    }

    return (
        <View style={styles.container} >
            <ModalComp isVisible={showModal} 
                onClose={() => setShowModal(false)} 
                component={<VetQuery onClose={() => setShowModal(false)} onSelect={selectedVet} />} 
            />
            {!newConsultation && !user.employeeType === 'Vet'
                ? <View style={styles.deleteButton} >
                    <IconButton
                        icon='delete'
                        color='red'
                        size={25}
                        onPress={() => {
                            if (state.idPet && state.idPet !== '')
                                deleteConsultation()
                        }}
                    />   
                </View>
                : null}
                {isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size='large' animating={isLoading} />
                </View>
                : <View style={styles.content}>
                <View style={{ width: '100%', padding: 5 }} >
                    <View style={{ alignItems:'center' }} >
                        <Text style={{ color:'#000', fontSize: 20, fontWeight:'bold' }}>Paciente</Text>
                    </View>
                    <View>
                        <View style={[styles.patitientView]}>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={newConsultation ? false : true}
                                    mode='outlined'
                                    label='ID'
                                    placeholder='235'
                                    value={`${state.idPet}`}
                                    onChangeText={(idPet) => setState({...state, idPet})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                        disabled={true}
                                        mode='outlined'
                                        label='Raça'
                                        placeholder='Buldog'
                                        value={state.breed}
                                        onChangeText={(breed) => setState({...state, breed})}
                                        left={<TextInput.Icon name='account'/>}
                                    />
                            </View>
                        </View>
                        <View style={styles.patitientView}>
                            <View style={{ width: '100%' }}>
                                <TextInput
                                    disabled={true}
                                    mode='outlined'
                                    label='Nome'
                                    placeholder='Terror'
                                    value={state.name}
                                    onChangeText={(name) => setState({...state, name})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {user.employeeType === 'Attendant'
                ? <View style={{ width: '100%', marginTop:20 }}>
                    <View style={{ alignItems:'center' }} >
                            <Text style={{ color:'#000', fontSize: 20, fontWeight:'bold' }}>Veterinario</Text>
                    </View>
                    <View>
                        <View style={styles.vetView}>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={newConsultation ? false : true}
                                    mode='outlined'
                                    label='ID'
                                    placeholder='235'
                                    value={`${state.idVet}`}
                                    onChangeText={(idVet) => setState({...state, idVet})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={true}
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
                            <Button disabled={newConsultation ? false : true} onPress={() => setShowModal(true)} >
                                Selecionar Veterinário
                            </Button>
                        </View>
                    </View>
                </View>
                : null}
                <View style={{ width: '100%', marginTop:20 }}>
                    <View style={{ alignItems:'center' }} >
                            <Text style={{ color:'#000', fontSize: 20, fontWeight:'bold' }}>Consulta</Text>
                    </View>
                    <View>
                        <View style={styles.vetView}>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={!editField}
                                    mode='outlined'
                                    label='Preço'
                                    placeholder='200'
                                    value={`${state.price}`}
                                    onChangeText={(price) => setState({...state, price})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={!editField}
                                    mode='outlined'
                                    label='Status'
                                    placeholder='Agendada'
                                    value={state.status}
                                    onChangeText={(status) => setState({...state, status})}
                                    left={<TextInput.Icon name='account'/>}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                {user.employeeType === 'Vet' && state.status !== 'Finalizada'
                ? <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Button>BOTAO</Button>
                </View>
                : null}
                <View style={{ alignItems: 'center', marginTop:20 }}>
                    <View style={{ alignItems:'center' }} >
                        <Text>Data/Hora</Text>
                    </View>
                    <View style={styles.dateView}>
                        <Button mode='contained' disabled={newConsultation ? false : true}
                            icon='clock-time-nine' 
                            style={styles.dateButton} 
                            onPress={() => {
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
                        <Button  disabled={newConsultation ? false : true} mode='contained' 
                            icon='calendar-range' style={styles.dateButton} 
                            onPress={() => {
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
                {editableButton && user.employeeType === 'Attendant'
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
                : null}
                {!editableButton && user.employeeType === 'Attendant'
                ? <View style={styles.doubleButton}>
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
                            if (newConsultation) addConsultation()
                            if (!newConsultation) updateConsultation()
                        }}
                    />
                </View>
                : null}
                
            </View>}            
            
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
        width: '100%',
        flexDirection: 'row',
    },
    dateButton: {
        margin: 10, 
        borderRadius: 25,
        backgroundColor: '#4C11EA',
        color: '#FFF',
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