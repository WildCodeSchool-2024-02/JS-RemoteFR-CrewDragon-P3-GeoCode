import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importe les styles CSS de Leaflet
import { useLoaderData } from "react-router-dom";
import { Icon } from "leaflet";
// import { useEffect, useState } from "react";

function Carte() {
  const terminalData = useLoaderData();
  const icon = new Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=15366&format=png&color=000000",
    iconSize: [50, 50],
  });

  return (
    <MapContainer
      center={[48.866667, 2.333333]}
      zoom={5}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {terminalData.map((borne) => (
        <Marker
          key={borne.id}
          position={[borne.ylatitude, borne.xlongitude]}
          icon={icon}
        >
          <Popup className="popupTerminal">
            <h1>Borne :</h1>
            <p>{borne.name}</p>
            <p>{borne.address}</p>
            {borne.isBooked === 1 ? (
              <p>Borne déjà réservé</p>
            ) : (
              <p>Borne Disponible</p>
            )}
            <h3>Prise :</h3>
            <p>{borne.plug_type}</p>
            <h3>chain_name :</h3>
            <p>{borne.chain_name}</p>
            <h3>accessibility :</h3>
            <p>{borne.accessibility}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Carte;
