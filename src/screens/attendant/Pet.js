import React, { useState, useContext, useCallback } from 'react'
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { TextInput, IconButton, Avatar } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'

import { ClientContext } from '@context/Client'
import AvatarPick from '@components/AvatarPick'
import { server } from '../../api'
import axios from 'axios'
import mime from 'mime'

export default ({ route }) => {
    const { client: { cpf: cpfClient } } = useContext(ClientContext)

    const pet = route.params
    const [state, setState] = useState({ ...pet, cpfTutor: cpfClient })
    const [editField, setEditField] = useState(false)
    const [editableButton, setEditableButton] = useState(true)
    const [newPet, setNewPet] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const saveImage = (imageData) => {
        setState({...state, image: imageData})
    }

    const fetchPet = async () => {
        setIsLoading(true)
        try {
            const res = await axios.delete(`${server}/pet/${pet.petId}`)
            const [ data ] = res.data
            setState({...data})
            setIsLoading(false)    
        }catch(e) {
            console.warn(e)
            setIsLoading(false)
            defaultValues()
        }
    }

    const deletePet = async () => {
        setIsLoading(true)
        try {
            const res = await axios.delete(`${server}/pet/${state.idPet}`)
            if (res.status === 200) 
                console.warn('Pet Deletado!')
            setIsLoading(false)    
            setState({})
            defaultValues()
        }catch(e) {
            console.warn(e)
            setIsLoading(false)
            defaultValues()
        }
    }
    
    const updatePet = async () => {
        setIsLoading(true)
        // const newImageUri =  "file:///" + state.image.uri.split("file:/").join("")
        // const formData = new FormData()
        // formData.append('image', {
        //     fileName: state.image.fileName,
        //     uri: state.image.uri,
        //     type: state.image.type,
        // })

        try {
            // const res = await axios(`${server}/pet`,{
            //     method: 'PUT',
            //     data: formData,
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            const res = await axios.put(`${server}/pet`, {...state })

            if (res.status === 200) 
                console.warn('Pet Atualizado!')
            
            setIsLoading(false)
            setState({...state})
        }catch(e) {
            console.log(e)
            setIsLoading(false)
        }

    }
   
    const addPet = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post(`${server}/pet`, {
                ...state
            })
            if (res.status === 200) 
                console.warn('Pet Cadastrado!')
            const data = res.data
            setState({...state, idPet: data.insertId})
            setIsLoading(false)
        }catch(e) {
            console.warn(e)
            setIsLoading(false)
            defaultValues()
        }
    }
    
    const defaultValues = () => {
        setEditField(false)
        setEditableButton(true)
        setNewPet(false)
    }
    
    const newPetValues = () => {
        setEditField(true)
        setEditableButton(false)
        setNewPet(true)
    }

    useFocusEffect(
        useCallback(() => {
            pet.new ? newPetValues() : defaultValues()
        }, [])
    )

    return (
            <View style={styles.container} >
                {!newPet
                ? <View style={styles.deleteButton} >
                    <IconButton
                        icon='delete'
                        color='red'
                        size={25}
                        onPress={() => {
                            if (state.idPet && state.idPet !== '')
                                deletePet()
                        }}
                    />   
                </View>
                : null}
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        {/* <Avatar.Icon size={120} icon='account' /> */}
                        <AvatarPick size={120} image={state.image} saveImage={saveImage} />
                </View>
                {isLoading
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size='large' animating={isLoading} />
                </View>
                : <ScrollView contentContainerStyle={styles.content} >
                    <View style={{ width: '100%' }} >
                        {state.idPet ?
                        <TextInput
                            disabled={!editField}
                            mode='outlined'
                            label='ID'
                            placeholder='267'
                            value={state.idPet}
                            onChangeText={(idPet) => setState({...state, idPet})}
                        />
                        : null}
                        <TextInput
                            disabled={!editField}
                            mode='outlined'
                            label='Nome'
                            placeholder='Terror'
                            value={state.name}
                            onChangeText={(name) => setState({...state, name})}
                            left={<TextInput.Icon name='dog'/>}
                        />
                        <TextInput
                            disabled={!editField}
                            mode='outlined'
                            label='Sexo'
                            placeholder='Macho/Fêmea'
                            value={state.sex}
                            onChangeText={(sex) => setState({...state, sex})}
                            left={<TextInput.Icon name='gender-male-female'/>}
                        />
                        <TextInput
                            disabled={!editField}
                            mode='outlined'
                            label='Espécie'
                            placeholder='Canina'
                            value={state.species}
                            onChangeText={(species) => setState({...state, species})}
                            left={<TextInput.Icon name='paw'/>}
                        />
                        <TextInput
                            disabled={!editField}
                            mode='outlined'
                            label='Raça'
                            placeholder='Buldog'
                            value={state.breed}
                            onChangeText={(breed) => setState({...state, breed})}
                            left={<TextInput.Icon name='paw'/>}
                        />
                        
                        <View style={{ flexDirection: 'row'}} >
                            <View style={{ width: '50%' }} >
                                <TextInput
                                    disabled={!editField}
                                    mode='outlined'
                                    label='Porte'
                                    placeholder='Grande'
                                    value={state.size}
                                    onChangeText={(size) => setState({...state, size})}
                                    left={<TextInput.Icon name='dog-service'/>}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <TextInput
                                    disabled={!editField}
                                    mode='outlined'
                                    label='Peso'
                                    placeholder='15Kg'
                                    value={state.weight}
                                    onChangeText={(weight) => setState({...state, weight})}
                                    left={<TextInput.Icon name='weight-kilogram'/>}
                                />
                            </View>
                        </View>
                        
                        <TextInput
                            disabled={!editField}
                            mode='outlined'
                            label='Data de Nascimento'
                            placeholder='10/10/2010'
                            value={state.birthDate}
                            onChangeText={(birthDate) => setState({...state, birthDate})}
                            left={<TextInput.Icon name='calendar'/>}
                        />
                        <TextInput
                            disabled={true}
                            mode='outlined'
                            label='CPF do(a) Tutor(a)'
                            placeholder='000.000.000-01'
                            value={cpfClient}
                            left={<TextInput.Icon name='account'/>}
                        />
                    </View>
                </ScrollView>}
                <View style={{ height: 50, width: '100%' }}>
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
                                if (newPet) addPet()
                                if (!newPet) updatePet()
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
        padding: 5,
        margin: 20,
    },
    content: {
        padding: 10,
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