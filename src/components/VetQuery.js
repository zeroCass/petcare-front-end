import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Searchbar, Button } from 'react-native-paper'

import ItemSelect from '@components/ItemSelect'


const docs = [
    {
        id: 1,
        name: 'Marco Phenix',
        speciality:'Medic',
    },
    {
        id: 3,
        name:'Choper' 
    },
]

// props.onSelect -> function recieve from parent to send data back
export default (props) => {
    
    const [selectedItems, setSelectedItems] = useState([])
    const [search, setSearch] = useState('')

    const selectedItem = (itemId, selected) => {
        const find = selectedItems.find(id => id === itemId)
        if (find && !selected) 
            setSelectedItems(selectedItems.filter(i => i !== itemId ? true : false))
        

        if (!find && selected)
            setSelectedItems([...selectedItems, itemId])

    }

    const fetchSearch = async () => {}

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
                <FlatList
                    data={docs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ItemSelect id={item.id} 
                            txt={item.name} 
                            txtCenter={item.speciality} 
                            onSelect={selectedItem}/>)}
                />
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