import * as React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const Map = ({ geojson, initZoom, popupContent, token }) => {
  const geojsonObject = JSON.parse(geojson);
  const coordinates = [
    geojsonObject.coordinates[1],
    geojsonObject.coordinates[0],
  ];
  return (
    <MapContainer
      className="h-72"
      zoom={initZoom}
      maxZoom={19}
      scrollWheelZoom={false}
      center={coordinates}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        id="mapbox/streets-v12"
        accessToken={token}
      />
      <Marker position={coordinates}>
        <Popup>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: popupContent }}
          />
        </Popup>
      </Marker>
    </MapContainer>
  );
};
