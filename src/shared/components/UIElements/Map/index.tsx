import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

interface MapProps {
  style?: object;
  zoom: number;
  center: LatLngTuple
}


const LeafletMap: React.FC<MapProps> = ({ center, zoom }) => {
  return (
    <Map id="mapId"
      style={{ height: '20rem', width: '100%' }}
      center={center}
      zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors">
      </TileLayer>
      <Marker position={center} >
        <Popup>Your place</Popup>
      </Marker>
    </Map>
  )
}

export default LeafletMap;
