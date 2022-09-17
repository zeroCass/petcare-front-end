import React, { useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Searchbar, Button } from 'react-native-paper'

import ItemSelect from '@components/ItemSelect'
import axios from 'axios'
import { server } from '../api'

// props.onSelect -> function recieve from parent to send data back
export default (props) => {
    const [vets, setVets] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const selectedItem = (itemId, selected, item) => {
        const find = selectedItems.find(i => i.id === itemId)
        if (find && !selected) 
            setSelectedItems(selectedItems.filter(i => i.id !== itemId ? true : false))
        

        if (!find && selected)
            setSelectedItems([...selectedItems, { id: itemId, item }])

    }

    const fetchSearch = async () => {
        try {
            setIsloading(true)
            const res = await axios.get(`${server}/vet/${search}`)
            if (res.status === 200) {
                if (res.data.length === 0)
                    console.warn('Nenhum resultado encontrado')
                setVets(res.data)
            }
            setIsloading(false)
        }catch(e) {
            console.log(e)
            setIsloading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <Searchbar  
                    placeholder='Nome Veterinário(a)'
                    value={search}
                    onChangeText={(search) => setSearch(search)}
                    onIconPress={() => fetchSearch()}
                />
            </View>
            <View style={styles.content}>
                {isLoading 
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size='large' animating={isLoading} />
                </View>
                : <FlatList
                    data={vets}
                    keyExtractor={(item) => item.idVet}
                    renderItem={({ item }) => (
                        <ItemSelect id={item.idVet} 
                            txt={item.name} 
                            txtCenter={item.speciality}
                            item={item} 
                            onSelect={selectedItem}/>)}
                />}
                
            </View>
            <View>
                <Button mode='contained' 
                    onPress={() => {
                        props.onSelect(selectedItems)
                        props.onClose()
                    }}>
                        Selecionar
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 15, 
    },
    search: {
        alignContent:'center', 
        marginVertical: 10,
    },
    content: {
        flex: 1, 
        alignItems: 'center', 
        marginVertical: 5,
    },
})