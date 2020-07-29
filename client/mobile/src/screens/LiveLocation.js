import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '../store/actions/currentAction';
import CurrentLocation from '../components/CurrentLocation';
import pointer from '../../assets/pointerCar.png';
import person from '../../assets/person.png';
import { Divider, ApplicationProvider } from '@ui-kitten/components';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import * as eva from '@eva-design/eva';
import { Icon as Icn, Button as Btn } from 'native-base'


export default function LiveLocation({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user)
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
  const [currLoc, setCurrLoc] = useState('')

  const getLocationUser = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      console.log('permission to access location was denied')
    }

    const location = await Location.getCurrentPositionAsync({ enabledHighAccuracy: true })
    const currRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }

    if (userLocation != currRegion) {
      setUserLocation(currRegion)
    }
  }

  // setInterval(() => {
  //   dispatch(getCurrent());
  //   getLocation();
  //   getLocationUser();
  // }, 3500)

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
        token: user.token
      }
    });
    const data = await res.json();
    setRegion({
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    })
    const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data.longitude}&key=AIzaSyAOYItv2qh4x1p8uM8kfhhpAj0Vrpk-gOU`)
    const { results } = await resp.json()
    setCurrLoc(results[2].formatted_address)
  }

  setInterval(getLocation, 15000);



  return (
    <View style={styles.container}>
      <CurrentLocation currLoc={() => centerMap(region)} />

      <MapView style={styles.mapStyle}
        // onRegionChangeComplete={region => setRegion(region)}
        ref={ref => (this.mapView = ref)}
        initialRegion={region}
        showsUserLocation={true}
        showsCompass={true}
      >
        <Btn
          transparent
          style={{ marginTop: 15 }}
          onPress={() => navigation.openDrawer()}
        >
          <Icn name="menu" />
        </Btn>
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

                {/* <Text>A short description</Text> */}
                {/* <Text>{JSON.stringify(current)}</Text> */}
                <Text>{JSON.stringify(new Date(current.createdAt) + 0).substr(1, 21).replace(/ /, ', ')}</Text>
                <ApplicationProvider {...eva} theme={eva.dark}>
                  <Divider />
                </ApplicationProvider>
                <Text style={styles.name}>{currLoc}</Text>
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
