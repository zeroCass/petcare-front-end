import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { Avatar } from 'react-native-paper'


export default ({ navigation, pet }) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Pet', pet)
        }} >
            <View style={styles.container}>
                <View style={styles.avatar}>
                    {pet.image 
                    ? <Image source={{ uri: 'data:image/jpeg;base64,' + pet.image }} style={styles.img} />
                    : <Avatar.Icon icon='account' size={70} />}
                    
                </View>
                <View style={styles.infoView}>
                    <View style={styles.titleView}>
                        <Text style={styles.title} >{pet.name}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.txt}>{pet.species}</Text>
                        <Text style={styles.txt}>{pet.breed}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height * 0.14,
        borderBottomWidth: 2,
        borderBottomColor: '#AAA',
        flexDirection: 'row',
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
    },
    infoView: {
        width: '70%',
    },
    titleView: {
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: {
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    txt: {
        color: '#000',
    },
    img: {
        height: 70, 
        width: 70, 
        borderRadius: 70 / 2,
    }
})
