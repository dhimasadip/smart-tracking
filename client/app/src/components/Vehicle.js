import React from 'react';
import { Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import motor from '../assets/pointerCar.png'


export default (props) => {

    const vehicle = props.vehicle ? props.vehicle : {
        uid: 'noVehiclePassed',
        location: {
            latitude: 0,
            longitude: 0
        }
    }

    const coordinate = new MapView.AnimatedRegion({
        latitude: vehicle.location.latitude,
        longitude: vehicle.location.longitude,
    })

    return (
        <Marker.AnimatedRegion
            coordinate={{
                latitude: vehicle.latitude,
                longitude: vehicle.longitude,
            }}
            // anchor={{x: 0.35, y: 0.32}}
            // ref={(marker) => this.marker = marker}
            // style={{width: 50, height: 50}}
        >
            <Image 
                source={motor}
                style={{width: 32, height: 32}}
            />
        </Marker.AnimatedRegion>
    )
}