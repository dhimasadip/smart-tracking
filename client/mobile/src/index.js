import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import Maps from './screens/Maps.js';
import CallPolice from './screens/CallPolice.js';
import LiveLocation from './screens/LiveLocation.js';
import Scanner from './screens/Scanner.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default () => {

    const user = useSelector(state => state.userReducer.user)

    return (
        <>
            {
                user ? (
                    <>
                        <NavigationContainer>
                            <Drawer.Navigator>
                                <Drawer.Screen name="Home" component={Home} />
                                <Drawer.Screen name="Maps" component={Maps} />
                                <Drawer.Screen name="Current Location" component={LiveLocation} />
                                {/* <Drawer.Screen name="Call Police" component={CallPolice} /> */}
                                <Drawer.Screen name="Scanner" component={Scanner} />
                            </Drawer.Navigator>
                        </NavigationContainer>
                    </>
                )
                    : (
                        <NavigationContainer>
                            <Stack.Navigator headerMode={false}>
                                <Stack.Screen name="Home" component={Login} />
                                <Stack.Screen name="Maps" component={Maps} />
                                <Stack.Screen name="CurrentLocation" component={LiveLocation}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    )

            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});