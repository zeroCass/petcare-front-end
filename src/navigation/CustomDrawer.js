import React, { useContext } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem,
  } from '@react-navigation/drawer'
import { Avatar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AuthContext } from '@context/Auth'

export default props => {
    const { user } = useContext(AuthContext)
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.perfil}>
                <View style={styles.userAvatar}>
                    <Avatar.Icon size={80} icon='account'/>
                </View>
                <View style={styles.userInfo} >
                    <Text style={styles.name}>user.name</Text>
                    <Text style={styles.userInfoTxt}>user.email</Text>
                    <Text style={styles.userInfoTxt}>ID: user.id</Text>
                </View>
            </View>
            <View style={styles.menu}>
                <DrawerContentScrollView {...props} >
                    <DrawerItem 
                        label='Consultas'
                        icon={() => <Icon name='text-box-check-outline' size={25} />}
                        onPress={() => props.navigation.navigate('Home')}
                    />
                    
                    {user.employeeType === 'Attendant' ? 
                    <DrawerItem 
                        label='Cliente & Pet'
                        icon={() => <Icon name='paw' size={25} />}
                        onPress={() => props.navigation.navigate('Client-Pet')}
                    />
                    : null}
                    {user.employeeType === 'Attendant' ? 
                    <DrawerItem 
                        label='Financeiro'
                        icon={() => <Icon name='cash-multiple' size={25} />}
                        onPress={() => props.navigation.navigate('Finance')}
                    />
                    : null}
                    {user.employeeType === 'Vet' ?
                    <DrawerItem 
                        label='Agenda'
                        icon={() => <Icon name='calendar-month' size={25} />}
                        onPress={() => console.warn('Agenda')}
                    />
                    : null}
                    
                </DrawerContentScrollView>
            </View>
            <View style={styles.bottom}>
                <View style={{ flexDirection:'row', padding: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Icon name='exit-to-app' color='#FFF' size={30}/>
                    <Text style={{ color:'#FFF', fontWeight:'bold' }} >Sair</Text>
                </View>
            </View>
        </View>
        
    )
    
}

const styles = StyleSheet.create({
    perfil: {
        flex: 2,  
        backgroundColor: '#FFF', 
        // justifyContent: 'center', 
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10,
    },
    userAvatar: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width:'30%', 
    },
    userInfo: {
        justifyContent: 'center', 
        alignItems: 'flex-start',
        width:'70%',
        marginLeft: 10,
    },
    name: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    userInfoTxt: {
        fontSize: 12,
    },
    menu: {
        flex: 7, 
        backgroundColor: '#FFF',
        borderTopWidth: 2,
        borderTopColor: '#AAA',
    },
    bottom: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'flex-start', 
        backgroundColor: '#6401ee',
    }
})