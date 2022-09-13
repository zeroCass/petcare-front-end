import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { IconButton } from 'react-native-paper'

import Consultations from '@screens/common/Consultations'
import AttTab from '@navigation/attendant/AttTab'
import Finance from '@screens/attendant/Finance'
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
        <Drawer.Navigator
            useLegacyImplementation 
            drawerContent={(props) => <CustomDrawer {...props} />} 
            initialRouteName='Home' 
            ScreenOptions={({navigation }) => {
                return {
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        homeButton(navigation)
                    )
                }
        }} >
            <Drawer.Screen name='Home' component={Consultations}
                // options={{ title:'Consultas', headerTitleAlign: 'center' }} 
                options={{ headerShown: false }}
            />
            <Drawer.Screen name='Client-Pet' component={AttTab} 
                options={({ route, navigation }) => {
                    return {
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            homeButton(navigation)
                        ),
                        title: route.params ? 
                            route.params.screenName : 'Cliente',
                    }
            }} />
            <Drawer.Screen name='Finance' component={Finance} 
                options={({ navigation }) => {
                    return {
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            homeButton(navigation)
                        )
                    }
            }}/>
        </Drawer.Navigator>
        
    )
}