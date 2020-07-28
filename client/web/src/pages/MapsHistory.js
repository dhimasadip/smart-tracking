import React, { useEffect } from 'react'
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
  useEffect( () => {
    dispatch(getHistories());
  }, [dispatch])

  const InternalMap = props => (
    <GoogleMap defaultZoom={7} defaultCenter={histories[0]}>
      <Polyline
        path={histories}
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
