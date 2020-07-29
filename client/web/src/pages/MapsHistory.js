import React, { useEffect, useState } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker
} from "react-google-maps";
import { useSelector, useDispatch } from 'react-redux';
import { getHistories } from '../store/actions/historyAction';

export default function MapsHistory() {
  const dispatch = useDispatch();
  const { histories } = useSelector(state => state.historyReducer);
  const [date, setDate] = useState(new Date(Date.now() - 864e5));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [date2, setDate2] = useState(new Date(Date.now()));
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    dispatch(getHistories(Date.parse(date), Date.parse(date2)));
  }, [dispatch])

  const InternalMap = props => (
    <GoogleMap defaultZoom={7} defaultCenter={histories[0]}>
      <Polyline
        path={histories}
        options={{
          strokeColor: "#3498db",
          strokeOpacity: 0.75,
          strokeWeight: 4,
        }} 
      />
      <Marker position={histories[0]}/>
      <Marker position={histories[histories.length-1]}/>
    </GoogleMap>
  );
  
  const MapHoc = withScriptjs(withGoogleMap(InternalMap));
  
  const MyMapComponent = props => (
    <MapHoc
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOYItv2qh4x1p8uM8kfhhpAj0Vrpk-gOU&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
  if(!histories) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <div>
      <MyMapComponent/>
      {/* {JSON.stringify(histories)} */}
    </div>
  )
}
