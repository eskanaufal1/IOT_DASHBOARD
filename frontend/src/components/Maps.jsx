import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
  CircleMarker,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
// import mapData from "../assets/locDummy.json";

const circleIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=VzU7PPLtpY2i&format=png&color=000000",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const Maps = (props) => {
  return (
    <>
      <MapContainer
        id="map"
        center={[-6.192115523, 106.7482353441]}
        zoom={10}
        // scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {props.data.map((items, key) => console.log(items.color))} */}
        {props.data.map((items, key) => (
          <CircleMarker
            key={key}
            center={[items.latitude, items.longitude]}
            pathOptions={{ color: items.color, fillColor: items.color }}
            radius={10}
          >
            <Popup>{items.device}</Popup>
          </CircleMarker>
        ))}
        {props.data[0] !== undefined ? (
          <Marker position={[props.data[0].latitude, props.data[0].longitude]}>
            <Popup>Jakarta, Indonesia</Popup>
          </Marker>
        ) : (
          <Marker position={[-6.21462, 106.84513]}>
            <Popup>Jakarta, Indonesia</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default Maps;
