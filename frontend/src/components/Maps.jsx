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
import { Popconfirm, Alert } from "antd";
import { renderToString } from "react-dom/server";
import PixiOverlay from "react-leaflet-pixi-overlay";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
// import mapData from "../assets/locDummy.json";

const circleIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=VzU7PPLtpY2i&format=png&color=000000",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const legalIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-legal-business-and-finance-icongeek26-linear-colour-icongeek26.png",
  iconSize: [35, 35], // size of the icon
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const Maps = (props) => {
  const mapsData = useSelector((state) => state.realtimeData.realtimeData);
  // console.log(mapsData);
  const markers = mapsData.map((item) => ({
    id: item._id,
    iconColor: item.color,
    position: [item.latitude, item.longitude],
    popup: renderToString(<div>{item.device}</div>),
    tooltip: renderToString(<div>{item.device}</div>),
  }));
  return (
    <>
      <MapContainer
        preferCanvas
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
        <PixiOverlay markers={markers} />
        {/* {props.data.map((items, key) => console.log(items.color))} */}
        {/* {props.data.map((items, key) => (
          <CircleMarker
            key={key}
            center={[items.latitude, items.longitude]}
            pathOptions={{ color: items.color, fillColor: items.color }}
            radius={10}
          >
            <Popup>{items.device}</Popup>
          </CircleMarker>
        ))} */}
      </MapContainer>
    </>
  );
};

export default Maps;
