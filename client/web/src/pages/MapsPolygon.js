import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline,
  Marker
} from "react-google-maps";

export default function MapsPolygon() {
  const InternalMap = props => (
    <GoogleMap defaultZoom={7} defaultCenter={{ lat: -34.897, lng: 151.144 }}>
      <Polyline
        path={[{ lat: -34.397, lng: 150.644 }, { lat: -34.6, lng: 150.670 }, { lat: -35.397, lng: 151.644 }]}
      />
      <Marker position={{ lat: -34.397, lng: 150.644  }}/>
      <Marker position={{ lat: -35.397, lng: 151.644  }}/>
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
  return (
    <div>
      <MyMapComponent/>
    </div>
  )
}
