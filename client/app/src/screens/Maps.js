import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHistories } from '../store/actions/historyAction';
import pointer from '../../assets/pointerCar.png';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Maps() {
  const dispatch = useDispatch();
  const { histories } = useSelector(state => state.historyReducer);
  const [region, setRegion] = useState({
    latitude: -6.266113167,
    longitude: 106.874190333,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [date2, setDate2] = useState(new Date(1598051730000));
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);
  };

  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  const showTimepicker2 = () => {
    showMode2('time');
  };

  useEffect( () => {
    // dispatch(getHistories());
  }, [dispatch])

  // if(histories.length==0) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      
      <MapView style={styles.mapStyle} 
        region={region}
        onRegionChangeComplete={region => setRegion(region)}
      >
     {/* <Marker coordinate={{ latitude: histories[0].latitude, longitude: histories[0].longitude }}>
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
      <Polyline coordinates={histories} /> */}
      </MapView>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{flexDirection: "column", margin: 10}}>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <Text>{JSON.stringify(date+0).substr(1,21)}</Text>
        </View>
        <View style={{flexDirection: "column", margin: 10}}>
          <View>
            <Button onPress={showDatepicker2} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker2} title="Show time picker!" />
          </View>
          {show2 && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date2}
              mode={mode2}
              is24Hour={true}
              display="default"
              onChange={onChange2}
            />
          )}
          <Text>{JSON.stringify(date2+0).substr(1,21)}</Text>
        </View>
      </View>

      <View>
        <Button title="Search History!"/>
      </View>
      
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
    height: Dimensions.get('window').height/1.5,
  },
});
