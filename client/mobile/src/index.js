import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import Maps from './screens/Maps.js';
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
                user.name ? (
                    <>
                        <NavigationContainer>
                            <Drawer.Navigator>
                                <Drawer.Screen name="Home" component={Home} />
                                <Drawer.Screen name="History Location" component={Maps} />
                                <Drawer.Screen name="Current Location" component={LiveLocation} />
                                <Drawer.Screen name="Scanner" component={Scanner} />
                            </Drawer.Navigator>
                        </NavigationContainer>
                        
                    </>
                )
                    : (
                        <NavigationContainer>
                            <Stack.Navigator headerMode={false}>
                                <Stack.Screen name="Home" component={Login} />
                                <Stack.Screen name="History Location" component={Maps} />
                                <Stack.Screen name="Current Location" component={LiveLocation} />
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