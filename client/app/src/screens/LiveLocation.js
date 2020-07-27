import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '../store/actions/currentAction';

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
  }, [dispatch])

  if(!current) {
    return (
      <View style={styles.container}>
        Loading...
      </View>
    )
  }

  return (
    <View style={styles.container}>
      
      <MapView style={styles.mapStyle} 
      region={region}
      onRegionChangeComplete={region => setRegion(region)}
      >
      <Marker coordinate={{ latitude: current.latitude, longitude: current.longitude }}/> 
      </MapView>
    </View>
  )
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
