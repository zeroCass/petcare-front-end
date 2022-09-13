import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default (props) => {

    const [selected, setSelected] = useState(false)

    useEffect(() => {
        props.onSelect(props.id, selected)
    }, [selected])

    return (
        <TouchableOpacity onPress={() => setSelected(!selected)} >
            <View style={styles.container} >
                <View style={styles.check} >
                    {!selected 
                            ? <Icon name='checkbox-blank-circle-outline' size={35} /> 
                            : <Icon name='check-circle' color='#9d53f3' size={35} />}
                </View>
                <View style={styles.info}>
                    <Text style={styles.id}>{props.id} - {props.txt}</Text>
                    <Text>{props.txtCenter}</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        flexDirection: 'row', 
        height: 55, 
        marginVertical: 5,
        borderColor: '#AAA',
        borderWidth: 2,
    },
    check: {
        width: '20%', 
        alignItems:'center', 
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#AAA',
    },
    info: {
        width: '80%', 
        alignItems:'center',
    },
    id: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    }
})