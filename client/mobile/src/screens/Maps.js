import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image, Button, Alert, Modal, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHistories } from '../store/actions/historyAction';
import pointer from '../../assets/pointerCar.png';
import location from '../../assets/location.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import CurrentLocation from '../components/CurrentLocation';
import { Icon as Icn, Button as Btn, H3 } from 'native-base'

export default function Maps({ navigation }) {
  const user = useSelector(state => state.userReducer.user)
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

  const [date2, setDate2] = useState(new Date(Date.now()));
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

  useEffect(() => {
    dispatch(getHistories(Date.parse(date), Date.parse(date2)));
    getLocation();
  }, [dispatch])

  if (histories.length == 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  function filterHistory() {
    dispatch(getHistories(Date.parse(date), Date.parse(date2)));
  }

  async function getLocation() {
    const res = await fetch(`http://54.255.56.32:3000/devices/1/histories`, {
      headers: {
        token: user.token
      }
    });
    const data = await res.json();
    if (data) {
      setRegion({
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
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
        <View>
          <Text style={styles.textStyle}>
            {`From\u00A0: ${JSON.stringify(date + 0).substr(1, 21).replace(/ /, ', ')}`}
          </Text>
          <Text style={styles.textStyle}>
            {`To \u00A0 \u00A0 \u00A0: ${JSON.stringify(date2 + 0).substr(1, 21).replace(/ /, ', ')}`}
          </Text>
        </View>
      </TouchableHighlight>

      <CurrentLocation currLoc={() => centerMap(region)} />

      <MapView style={styles.mapStyle}
        region={region}
        // onRegionChangeComplete={region => setRegion(region)}
        ref={ref => (this.mapView = ref)}
        initialRegion={region}
      >
        <Btn
          transparent
          style={{ top: 27 }}
          onPress={() => navigation.openDrawer()}
        >
          <Icn name="menu" />
        </Btn>
        {histories ? <Marker coordinate={{ latitude: histories[0].latitude, longitude: histories[0].longitude }}>
          <Image
            source={location}
            style={{ width: 32, height: 32 }}
          />
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                {/* <Text style={styles.name}>Mobil Yaris B1234NHK</Text> */}
                {/* <Text>A short description</Text> */}
                {/* <Text>{JSON.stringify(current)}</Text> */}
                <Text>{JSON.stringify(new Date(histories[0].createdAt) + 0).substr(1, 21)}</Text>
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
        {histories ? <Marker coordinate={{ latitude: histories[histories.length - 1].latitude, longitude: histories[histories.length - 1].longitude }}><Image
          source={pointer}
          style={{ width: 32, height: 32 }}
        />
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text style={styles.name}>Mobil Yaris B1234NHK</Text>
                {/* <Text>A short description</Text> */}
                {/* <Text>{JSON.stringify(current)}</Text> */}
                <Text>Date: {JSON.stringify(new Date(histories[histories.length - 1].createdAt) + 0).substr(1, 21)}</Text>
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
            <H3 style={styles.modalText}>Filter History</H3>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {
                !show2 &&
                <View style={{ flexDirection: "column", margin: 10}, !show2 && show ? {width: '90%'}: ''}>
                  <Text>From:</Text>
                  <View style={{margin: 10 }}>
                    <Button onPress={showDatepicker} title={JSON.stringify(date + 0).substr(5, 12)} />
                  </View>
                  <View style={{margin: 10 }}>
                    <Button onPress={showTimepicker} title={JSON.stringify(date + 0).substr(17, 5)} />
                  </View>
                  {show && (
                    <> 
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        style={{overflow: 'visible'}}
                      />
                      <Button title="OK" onPress={() => setShow(false)} />
                    </>
                  )}
                </View>
              }

              {
                !show &&
                <View style={{ flexDirection: "column", margin: 10 }, !show && show2 ? {width: '90%'}: ''}>
                  <Text>To:</Text>
                  <View style={{margin: 10 }}>
                    <Button onPress={showDatepicker2} title={JSON.stringify(date2 + 0).substr(5, 12)} />
                  </View>
                  <View style={{margin: 10 }}>
                    <Button onPress={showTimepicker2} title={JSON.stringify(date2 + 0).substr(17, 5)} />
                  </View>
                  {show2 && (
                    <> 
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date2}
                        mode={mode2}
                        is24Hour={true}
                        display="default"
                        onChange={onChange2}
                      />
                      <Button title="OK" onPress={() => setShow2(false)} />
                    </>
                  )}
                </View>
              }
            </View>
            {
              !show && !show2 &&
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3", position: 'absolute', height: 35, top: 195, left: 50 }}
                onPress={() => {
                  filterHistory();
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Search History!</Text>
              </TouchableHighlight>
            }
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
    position: 'relative'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    elevation: 5,
    width: '90%'
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    top: 73,
    left: 10,
    zIndex: 9,
    width: '95%'
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
