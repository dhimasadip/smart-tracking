import React, { useEffect } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} from "react-google-maps";
import { useSelector, useDispatch } from 'react-redux';
import { getCurrent } from '../store/actions/currentAction';

export default function LiveLocation() {
  const dispatch = useDispatch();
  const { current } = useSelector(state => state.currentReducer);

  useEffect( () => {
    dispatch(getCurrent());
  }, [dispatch])

  const InternalMap = props => (
    <GoogleMap defaultZoom={7} defaultCenter={{ lat: current.latitude, lng: current.longitude }}>
      <Marker position={{ lat: current.latitude, lng: current.longitude  }}/>
      <DirectionsRenderer origin={{ lat: 40.756795, lng: -73.954298 }} destination={{ lat: 41.756795, lng: -78.954298 }} />
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

  if(!current) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <div>
      <MyMapComponent/>
    </div>
  )
}
