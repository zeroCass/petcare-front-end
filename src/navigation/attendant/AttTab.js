import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Client from '@screens/attendant/Client'
import Pets from '@screens/attendant/Pets'

const Tab = createBottomTabNavigator()

export default () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarInactiveTintColor: '#AAA',
            tabBarActiveTintColor: '#008FD2'
        }} >
            <Tab.Screen name='Client' component={Client}  
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Cliente',
                    tabBarIcon: ({ color, size }) => (<Icon name='account' size={size} color={color} />)
                }} 
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('Client-Pet', { screen: 'Client', screenName: 'Cliente' })
                        }
                    }
                }}/>
            <Tab.Screen name='Pets' component={Pets} 
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Pets',
                    tabBarIcon: ({ color, size }) => (<Icon name='paw' size={size} color={color} />)
                }} 
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('Client-Pet', { screen: 'Pets', screenName: 'Pets' })
                        }
                    }
                }}/>
        </Tab.Navigator>
    )
}