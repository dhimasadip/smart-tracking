import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '../store/actions/currentAction';
import CurrentLocation from '../components/CurrentLocation';
import pointer from '../../assets/pointerCar.png';
import person from '../../assets/person.png';

import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

export default function LiveLocation({ navigation }) {
  const dispatch = useDispatch();
  const { current } = useSelector(state => state.currentReducer);
  const [region, setRegion] = useState({
    latitude: 48.858570,
    longitude: 2.294493,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  });
  const [userLocation, setUserLocation] = useState({
    latitude: 48.858570,
    longitude: 2.294493,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  });

  const getLocationUser = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      console.log('permission to access location was denied')
    }

    const location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true })
    const currRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    }

    setUserLocation(currRegion)
  }

  useEffect(() => {
    dispatch(getCurrent());
    getLocation();
    getLocationUser();
  }, [dispatch])

  if (!current) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  async function getLocation() {
    const res = await fetch(`http://54.255.56.32:3000/devices/1/current`, {
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NTg2MTQxOH0.ynOGgRX4FYWF3gCAZIuGtt72kXsx3oMKtRfDwPYmtLk'
      }
    });
    const data = await res.json();
    setRegion({
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    })
  }







  return (
    <View style={styles.container}>
      <CurrentLocation currLoc={() => centerMap(region)} />
      {/* <View style={ styles.buttonsContainer }>
        <Picker
          // selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View> */}
      <MapView style={styles.mapStyle}
        region={region}
        // onRegionChangeComplete={region => setRegion(region)}
        ref={ref => (this.mapView = ref)}
        initialRegion={region}>
        {/* <Marker coordinate={{ latitude: current.latitude, longitude: current.longitude }}/>  */}
        <Marker
          coordinate={region}
        >
          <Image
            source={pointer}
            style={{ width: 32, height: 32 }}
          />
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>Mobil Yaris B1234NHK</Text>
                {/* <Text>A short description</Text> */}
                {/* <Text>{JSON.stringify(current)}</Text> */}
                <Text>Date: {JSON.stringify(new Date(current.createdAt) + 0).substr(1, 21)}</Text>
                {/* <Image 
                style={styles.image}
                source={pointer}
              /> */}
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={userLocation}
        >
          <Image
            source={person}
            style={{ width: 32, height: 32 }}
          />
        </Marker>
      </MapView>
    </View>
  )
}

const centerMap = (region) => {
  this.mapView.animateToRegion(region, 1000)
}

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  buttonsContainer: {
    zIndex: 9,
    position: 'absolute',
    bottom: 60,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 7,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
