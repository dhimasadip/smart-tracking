import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHistories } from '../store/actions/historyAction';
import pointer from '../../assets/pointerCar.png';

export default function Maps() {
  const dispatch = useDispatch();
  const { histories } = useSelector(state => state.historyReducer);
  const [region, setRegion] = useState({
    latitude: -6.266113167,
    longitude: 106.874190333,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  useEffect( () => {
    dispatch(getHistories());
  }, [dispatch])

  if(histories.length==0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      
      <MapView style={styles.mapStyle} 
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
      >
     <Marker coordinate={{ latitude: histories[0].latitude, longitude: histories[0].longitude }}>
     <Image 
          source={pointer}
          style={{width:32, height:32}}
        />
      </Marker> 
     <Marker coordinate={{ latitude: histories[histories.length-1].latitude, longitude: histories[histories.length-1].longitude }}><Image 
          source={pointer}
          style={{width:32, height:32}}
        />
      </Marker>
      <Polyline coordinates={histories} />
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
