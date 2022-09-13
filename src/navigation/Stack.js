import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AttDrawer from '@navigation/attendant/AttDrawer'
import VetDrawer from '@navigation/vet/VetDrawer'
import AuthScreen from '@screens/auth/AuthScreen'
import Consultation from '@screens/common/Consultation'
import Pet from '@screens/attendant/Pet'

import { AuthContext } from '@context/Auth'

const Stack = createNativeStackNavigator()

export default () => {
    const { user } = useContext(AuthContext)
    const DrawerComponent = user.employeeType === 'Attendant' ? AttDrawer : VetDrawer
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false
        }} >
            {!user.token ? (
            <Stack.Group>
                <Stack.Screen name='AuthScreen' component={AuthScreen} />
            </Stack.Group>
            ) : (
            <Stack.Group>
                <Stack.Screen name='Main' component={DrawerComponent}/>
                <Stack.Screen name='Consultation' component={Consultation}/>
                <Stack.Screen name='Pet' component={Pet}/>
            </Stack.Group>
            )}
        </Stack.Navigator>
        
    )
}
