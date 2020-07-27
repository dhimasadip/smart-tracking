import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, Picker } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '../store/actions/currentAction';
import CurrentLocation from '../components/CurrentLocation';
import pointer from '../../assets/pointerCar.png';

export default function Maps() {
  const dispatch = useDispatch();
  const { current } = useSelector(state => state.currentReducer);
  const [region, setRegion] = useState({
    latitude: 48.858570,
    longitude: 2.294493,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02
  });

  useEffect( () => {
    // dispatch(getCurrent());
    getLocation();
  }, [dispatch])

  // if(!current) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   )
  // }

  async function getLocation() {
    const res = await fetch(`http://54.255.56.32:3000/devices/1/current`,{
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
      <View style={ styles.buttonsContainer }>
        <Picker
          // selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
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
          style={{width:32, height:32}}
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
  }
});
