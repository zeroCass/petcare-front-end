import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Patient from '@screens/vet/Patient'
import ClinicalHist from '@screens/vet/ClinicalHist'
import Exams from '@screens/vet/Exams'
import Consultation from '@screens/common/Consultation'

const Tab = createBottomTabNavigator()

export default () => {
    return (
        <Tab.Navigator 
            initialRouteName='Consultation'
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: '#AAA',
                tabBarActiveTintColor: '#008FD2'
            }}
        >
            <Tab.Screen name='Consultation' component={Consultation} 
                options={{
                    tabBarLabel: 'Consulta',
                    tabBarIcon: ({ color, size }) => (<Icon name='note-text-outline' size={size} color={color} />)
                }}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('ConsultationTab', { screen: 'Consultation', screenName: 'Consulta' })
                        }
                    }
                }}
            />
            <Tab.Screen name='Patient' component={Patient}
                options={{
                    tabBarLabel: 'Paciente',
                    tabBarIcon: ({ color, size }) => (<Icon name='paw' size={size} color={color} />)
                }}
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('ConsultationTab', { screen: 'Patient', screenName: 'Paciente' })
                        }
                    }
                }}
            />
            <Tab.Screen name='ClinicalHist' component={ClinicalHist}
                options={{
                    tabBarLabel: 'Histórico',
                    tabBarIcon: ({ color, size }) => (<Icon name='archive-clock' size={size} color={color} />)
                }} 
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('ConsultationTab', { screen: 'ClinicalHist', screenName: 'Histórico Clínico' })
                        }
                    }
                }}
            />
            <Tab.Screen name='Exams'component={Exams}
                options={{
                    tabBarLabel: 'Exames',
                    tabBarIcon: ({ color, size }) => (<Icon name='hospital-box' size={size} color={color} />)
                }} 
                listeners={({ navigation }) => {
                    return {
                        tabPress: (e) => {
                            e.preventDefault()
                            navigation.navigate('ConsultationTab', { screen: 'Exams', screenName: 'Exames' })
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}