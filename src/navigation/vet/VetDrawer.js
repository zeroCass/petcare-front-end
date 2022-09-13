import React from 'react'
import { View, Text, Button } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { IconButton } from 'react-native-paper'

import Consultations from '@screens/common/Consultations';
import VetTab from '@navigation/Vet/VetTab'
import CustomDrawer from '@navigation/CustomDrawer'

const Drawer = createDrawerNavigator()

const homeButton = (navigation) => (
    <IconButton
        onPress={() => navigation.navigate('Home')}
        size={25}
        color='#000'
        icon='home'
    />
)


export default () => {
    return (
        <Drawer.Navigator initialRouteName='Home'
            useLegacyImplementation 
            drawerContent={(props) => <CustomDrawer {...props} />} 
        >
            <Drawer.Screen name='Home' component={Consultations} 
                // options={{ title:'Consultas', headerTitleAlign: 'center' }}
                options={{ headerShown: false }}
            />
            <Drawer.Screen name='ConsultationTab' component={VetTab}  
                options={({ route, navigation }) => {
                    return {
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            homeButton(navigation)
                        ),
                        title: route.params ? 
                            route.params.screenName : 'Consulta',
                    }
            }}/>
        </Drawer.Navigator>
        
    )
}