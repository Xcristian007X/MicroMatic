import React from 'react';
import L from 'leaflet';
import {Marker} from 'react-leaflet';


const Bus = new L.Icon({
        iconUrl: require("../assets/bus.png"),
})


const Markers = (props) => {
    return (
        <Marker position = {{lat: props.data[1], lng: props.data[0] }} icon = {Bus}/>
    )
}

export default Markers