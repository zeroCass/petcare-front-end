import React, { useContext, useState, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'

import { ClientContext } from '@context/Client'
import Pet from '@components/Pet'
import { server } from '@src/api'
import axios from 'axios'

export default (props) => {
    const { client } = useContext(ClientContext)
    const [pets, setPets] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchPets = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${server}/pet/all/${client.cpf}`)
            const data = res.data
            setPets(data)
            setIsLoading(false)
        } catch(e) {
            console.warn(e)
            setIsLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchPets()
        }, [])
    )

    return (
        <View style={styles.container} >
            <FlatList
                data={pets}
                keyExtractor={(item) => item.idPet}
                renderItem={({ item }) => <Pet pet={{...item}} {...props}/>}
            />
            {isLoading 
            ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <ActivityIndicator size='large' animating={isLoading} />
            </View>
            :<>
                {Object.keys(client).length > 0
                ? <View style={styles.addButton}>
                    <IconButton
                        icon='plus-circle'
                        size={50}
                        onPress={() => {
                            props.navigation.navigate('Pet', { new: true })
                        }}
                    />
                </View>
                : null }
                </>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
