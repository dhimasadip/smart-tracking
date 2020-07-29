import React from 'react'
import { StyleSheet, View, Button, Linking, Platform, Image, ImageBackground } from 'react-native';
import flat_navigation from '../../assets/flat-navigation.png'
import flat_smarttracking from '../../assets/Smart-tracking.png'
import { LinearGradient } from 'expo-linear-gradient';
import { Icon as Icn, Button as Btn } from 'native-base'


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
          <ImageBackground source={flat_navigation} style={styles.stretch}>
            <Btn
              transparent
              style={{marginTop: 15}}
              onPress={() => navigation.openDrawer()}
            >
              <Icn name="menu" />
            </Btn>
          </ImageBackground>
        </View>
        <View style={styles.column}>
        
            <>
              <View style={styles.row}>
                <View style={styles.shadowBox}>
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    style={styles.box} colors={['#0AC7C4', '#0ABFCF']}
                  >
                    <Button title="Current Location" color='#fff' onPress={() => navigation.navigate('Current Location')} />
                  </LinearGradient>
                </View>

                <View style={styles.shadowBox}>
                  <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    style={styles.box} colors={['#0ACF70', '#09EF96']}
                  >
                    <Button title="History Location" color='#fff' onPress={() => navigation.navigate('History Location')} />
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

            </>
          

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
    // height: '20%',
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
  },
  burger: {
    position: "absolute",
    top: 2,
    left: 2
  }
});