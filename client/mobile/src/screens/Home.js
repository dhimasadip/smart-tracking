import React from 'react'
import { StyleSheet, View, Text, Image, Button, Linking, Platform } from 'react-native';
// import { Button, Icon, Layout, Spinner, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import flat_navigation from '../../assets/flat-navigation.png'
import flat_smarttracking from '../../assets/Smart-tracking.png'
import { LinearGradient } from 'expo-linear-gradient';

export default ({ navigation }) => {

  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${110}';
    }
    else {
      // for iOS
      phoneNumber = 'telprompt:${110}';
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.shadowBox}>
          <Image source={flat_navigation} style={styles.stretch} />
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <View style={styles.shadowBox}>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={styles.box} colors={['#0AC7C4', '#0ABFCF']}
              >
                <Button title="Current Location" color='#fff' onPress={() => navigation.navigate('CurrentLocation')} />
              </LinearGradient>
            </View>

            <View style={styles.shadowBox}>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={styles.box} colors={['#0ACF70', '#09EF96']}
              >
                <Button title="History Location" color='#fff' onPress={() => navigation.navigate('Maps')} />
              </LinearGradient>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.shadowBox}>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={styles.box} colors={['#4c669f', '#3b5998']}
              >
                <Button title="Call Police" color='#fff' onPress={dialCall} />
              </LinearGradient>
            </View>

            <View style={styles.shadowBox}>
              <LinearGradient
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                style={styles.box} colors={['#E74C3C', '#ed7669']}
              >
                <Button title="Alarm" color='#fff' />
              </LinearGradient>
            </View>
          </View>

        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '20%',
    // marginVertical: 5
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    width: '70%',
    justifyContent: 'space-evenly'
  },
  box: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stretch: {
    width: 375,
    height: 300,
    resizeMode: 'stretch',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  shadowBox: {
    flex: 1,
    height: 100,
    shadowColor: '#636e72',
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 15,
  }
});

// import * as React from 'react';
// import { List } from 'react-native-paper';

// const MyComponent = () => {
//   const [expanded, setExpanded] = React.useState(true);

//   const handlePress = () => setExpanded(!expanded);

//   return (
//     <List.Section title="Accordions">
//       <List.Accordion
//         title="Uncontrolled Accordion"
//         left={props => <List.Icon {...props} icon="folder" />}>
//         <List.Item title="First item" />
//         <List.Item title="Second item" />
//       </List.Accordion>

//       <List.Accordion
//         title="Controlled Accordion"
//         left={props => <List.Icon {...props} icon="folder" />}
//         expanded={expanded}
//         onPress={handlePress}>
//         <List.Item title="First item" />
//         <List.Item title="Second item" />
//       </List.Accordion>
//     </List.Section>
//   );
// };

// export default MyComponent;
