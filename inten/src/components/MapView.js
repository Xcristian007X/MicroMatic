import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON,Marker,useMapEvent,Popup } from 'react-leaflet'
import Markers from './Markers.js';
import L from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { setPosition } from "../reducers/busSlice"

const MapView = () => {
  const dispatch = useDispatch();
  const { post3 , post2 , position } = useSelector(state => state.Section);

  const iconoD = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
  })

  function LocationMarker() {
    const map = useMapEvent({
      click() {
        map.locate()
      },
      locationfound(e) {
        dispatch(setPosition({
          position: e.latlng
        }))
        map.flyTo(e.latlng, 16)
      },
    })
    console.log(position+"posision")
    return position === null ? null : (
      <Marker position={position} icon = {iconoD}>
        <Popup>Estás aquí</Popup>
      </Marker>
    )
  }

  console.log(post2)

  if (post2 === null || post3 === null) {
    console.log("dato nulo")
    return (
    <MapContainer center={{ lat: -38.73575113914755, lng:  -72.59038463084502 }} zoom={13} scrollWheelZoom={true}>
      <TileLayer url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
       <LocationMarker/>
    </MapContainer>
  )} else {
    console.log("dato bueno")
    console.log(post3)
    return (
      <MapContainer
      center={{ lat: -33.45578470205833, lng: -33.45578470205833 }}
      zoom={13}
      scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    {post2.map(coordenadas => <Markers key = {coordenadas} data={coordenadas}/>)}

      <GeoJSON data={post3[0]}  style={() => ({ color: "blue" })} />
      <GeoJSON data={post3[1]}  style={() => ({ color: "red" })} />
      <LocationMarker/>
  </MapContainer>
  )}}

export default MapView
