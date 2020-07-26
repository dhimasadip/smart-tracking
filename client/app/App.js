import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import Home from './src/screens/Home.js';
import Maps from './src/screens/Maps.js';
import LiveLocation from './src/screens/LiveLocation.js';
import Scanner from './src/screens/Scanner.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Maps" component={Maps} />
          <Drawer.Screen name="Live Location" component={LiveLocation} />
          <Drawer.Screen name="Scanner" component={Scanner} />
        </Drawer.Navigator>
      </NavigationContainer>
      {/* <View style={styles.container}>
        <Game/>
        <StatusBar style="auto" />
      </View> */}
    </Provider>
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
