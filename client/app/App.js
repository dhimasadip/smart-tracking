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
          <Drawer.Screen name="Current Location" component={LiveLocation} />
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
// import React, { useState } from 'react';
// import { StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, Layout, Icon, Input, IconRegistry, Button, Text } from '@ui-kitten/components';
// import { EvaIconsPack } from '@ui-kitten/eva-icons';

// const AlertIcon = (props) => (
//   <Icon {...props} name='alert-circle-outline' />
// );

// export default function App() {

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('');
//   const [secureTextEntry, setSecureTextEntry] = useState(true);

//   const toggleSecureEntry = () => {
//     setSecureTextEntry(!secureTextEntry);
//   };

//   const renderIcon = (props) => (
//     <TouchableWithoutFeedback onPress={toggleSecureEntry}>
//       <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
//     </TouchableWithoutFeedback>
//   );

//   return (
//     <>
//       <IconRegistry icons={EvaIconsPack} />
//       <ApplicationProvider {...eva} theme={eva.dark}>
//         <KeyboardAvoidingView
//           style={{flex:1}}
//           behavior="padding"
//         >
//           <Layout style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
//             <Layout>
//               <Text category="h1">Hello.</Text>
//               <Text category="h1">Welcome Back.</Text>
//             </Layout>
//             <Layout style={{ justifyContent: 'center', width: '80%', height: '50%' }}>
//               <Input
//                 style={{ marginBottom: 10 }}
//                 placeholder='email'
//                 label='Email'
//                 value={email}
//                 onChangeText={nextValue => setEmail(nextValue)}
//               />
//               <Input
//                 style={{ marginBottom: 10 }}
//                 value={password}
//                 label='Password'
//                 placeholder='Password'
//                 caption='Should contain at least 8 characters'
//                 accessoryRight={renderIcon}
//                 captionIcon={AlertIcon}
//                 secureTextEntry={secureTextEntry}
//                 onChangeText={nextValue => setPassword(nextValue)}
//               />
//               <Button appearance='filled'>
//                 Login
//             </Button>
//             </Layout>
//           </Layout>
//         </KeyboardAvoidingView>
//       </ApplicationProvider>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#2d3436',
//     color: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
