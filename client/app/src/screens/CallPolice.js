import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';

export default function CallPolice() {
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
    <View style={styles.MainContainer}>
      <TouchableOpacity onPress={dialCall} activeOpacity={0.7} style={styles.button} >
        <Text style={styles.TextStyle}>Call Police</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    padding: 6,
    backgroundColor: '#FF6F00',
    borderRadius: 7,
  },
  TextStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  }
});