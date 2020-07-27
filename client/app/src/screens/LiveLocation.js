import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '../store/actions/currentAction';
import CurrentLocation from '../components/CurrentLocation';
import pointer from '../../assets/pointerCar.png'

export default function Maps() {
  const dispatch = useDispatch();
  const { current } = useSelector(state => state.currentReducer);
  const [region, setRegion] = useState({
    latitude: -6.266113167,
    longitude: 106.874190333,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009
  });

  useEffect( () => {
    dispatch(getCurrent());
    if(current) {
      setRegion({
        latitude: current.latitude,
        longitude: current.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      })
    }
  }, [dispatch])

  if(!current) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CurrentLocation currLoc={() => centerMap(region)} />
      <MapView style={styles.mapStyle} 
      region={region}
      onRegionChangeComplete={region => setRegion(region)}>
      {/* <Marker coordinate={{ latitude: current.latitude, longitude: current.longitude }}/>  */}
      <Marker 
        coordinate={{ latitude: current.latitude, longitude: current.longitude }}
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
  this.map.animateToRegion(region)
}

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
});
