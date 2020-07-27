import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'


export default (props) => {
    const currLoc = props.currLoc ? props.currLoc : console.log('Current Location function not working')
    const bottom = props.bottom ? props.bottom : 65

    return (
        <View style={[styles.container, {top: HEIGHT - bottom}]}>
            <MaterialIcons
                name="my-location"
                color="#000"
                size={25}
                onPress={() => { currLoc() }}
            />
        </View>
    )
}

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        width: 45,
        height: 45,
        top: 110,
        left: (WIDTH-70),
        borderRadius: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 7,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
});
