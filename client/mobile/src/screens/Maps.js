import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, Button,  Alert, Modal, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHistories } from '../store/actions/historyAction';
import pointer from '../../assets/pointerCar.png';
import location from '../../assets/location.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import CurrentLocation from '../components/CurrentLocation';

export default function Maps() {
  const dispatch = useDispatch();
  const { histories } = useSelector(state => state.historyReducer);
  const [region, setRegion] = useState({
    latitude: -6.266113167,
    longitude: 106.874190333,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date(Date.now() - 864e5));
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

  const [date2, setDate2] = useState(Date());
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
    dispatch(getHistories(Date.parse(date), Date.parse(date2)));
    getLocation();
  }, [dispatch])

  if(histories.length==0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  function filterHistory () {
    dispatch(getHistories(Date.parse(date), Date.parse(date2)));
  }

  async function getLocation() {
    const res = await fetch(`http://54.255.56.32:3000/devices/1/histories`,{
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NTg2MTQxOH0.ynOGgRX4FYWF3gCAZIuGtt72kXsx3oMKtRfDwPYmtLk'
      }
    });
    const data = await res.json();
    if(data) {
      setRegion({
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      })
    }
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>{JSON.stringify(date+0).substr(1,21)} to {JSON.stringify(date2+0).substr(1,21)}</Text>
      </TouchableHighlight>

      <CurrentLocation currLoc={() => centerMap(region)} />
      
      <MapView style={styles.mapStyle} 
        region={region}
        // onRegionChangeComplete={region => setRegion(region)}
        ref={ref => (this.mapView = ref)}
        initialRegion={region}
          >
        { histories? <Marker coordinate={{ latitude: histories[0].latitude, longitude: histories[0].longitude }}>
        <Image 
              source={location}
              style={{width:32, height:32}}
        />
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.name}>Mobil Yaris B1234NHK</Text>
              {/* <Text>A short description</Text> */}
              {/* <Text>{JSON.stringify(current)}</Text> */}
              <Text>Date: {JSON.stringify(new Date(histories[0].createdAt)+0).substr(1,21)}</Text>
              {/* <Image 
                style={styles.image}
                source={pointer}
              /> */}
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker> : ''}
     {histories ? <Marker coordinate={{ latitude: histories[histories.length-1].latitude, longitude: histories[histories.length-1].longitude }}><Image 
          source={pointer}
          style={{width:32, height:32}}
        />
        <Callout tooltip>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.name}>Mobil Yaris B1234NHK</Text>
              {/* <Text>A short description</Text> */}
              {/* <Text>{JSON.stringify(current)}</Text> */}
              <Text>Date: {JSON.stringify(new Date(histories[histories.length-1].createdAt)+0).substr(1,21)}</Text>
              {/* <Image 
                style={styles.image}
                source={pointer}
              /> */}
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker> : ''}
      {histories ? <Polyline coordinates={histories} strokeColor="#3498db" strokeWidth={6} /> : ''}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Filter History</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <View style={{flexDirection: "column", margin: 10}}>
                <Text>From:</Text>
                <View>
                  <Button onPress={showDatepicker} title="Select Date!" />
                </View>
                <View>
                  <Button onPress={showTimepicker} title="Select Time!" />
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
                <Text>To:</Text>
                <View>
                  <Button onPress={showDatepicker2} title="Select Date!" />
                </View>
                <View>
                  <Button onPress={showTimepicker2} title="Select Time!" />
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
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                filterHistory ();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Search History!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  )

}
const centerMap = (region) => {
  this.mapView.animateToRegion(region, 1000)
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
    height: Dimensions.get('window').height/1.1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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
