import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importe les styles CSS de Leaflet
import { useLoaderData } from "react-router-dom";
import { Icon } from "leaflet";
import "leaflet.markercluster";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import NavVisiteur from "../components/NavVisiteur";
import coffee from "../assets/images/icons/easterCofffee.png";
import bdr from "../assets/images/icons/bdr.png";
import borneimg from "../assets/images/bornes/borne.svg";

function LocateUser() {
  const authData = Cookies.get("authData");
  let firstname = null;

  if (authData) {
    const authDataNameDecoded = jwtDecode(authData);
    firstname = authDataNameDecoded.firstname;
  }

  const [position, setPosition] = useState([48.8566, 2.3522]);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
    return () => {
      map.stopLocate();
    };
  }, [map]);

  if (position === null) return null;

  const userIconDefault = new Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=103779&format=png&color=000000",
    iconSize: [75, 75],
  });

  const userIconCoffe = new Icon({
    iconUrl: coffee,
    iconSize: [50, 50],
  });

  return position ? (
    <Marker
      position={position}
      icon={firstname === "Anthony" ? userIconCoffe : userIconDefault}
    >
      <Popup>Vous êtes ici, {firstname}</Popup>
    </Marker>
  ) : null;
}

function ClusterMarkers({ terminals }) {
  const map = useMap();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const markerClusterGroup = L.markerClusterGroup();

    terminals.forEach((borne) => {
      const [lati, longi] = borne.cood
        .trim()
        .slice(1, -1)
        .split(",")
        .map((coord) => parseFloat(coord.trim()));

      const icon = new Icon({
        iconUrl: bdr,
        iconSize: [50, 50],
      });

      // eslint-disable-next-line no-undef
      const marker = L.marker([longi, lati], { icon }).bindPopup(`
        <div>
         <img src=${borneimg} alt="" />
          <h1>Borne : ${borne.name}</h1>
          <p>${borne.address}</p>
          <p><strong> Prise :</strong> ${borne.plug_type}</p>
          <p><strong>Enseigne :</strong> ${borne.chain_name}</p>
          <p><strong>Ouverture :</strong> ${borne.accessibility}</p>
          <button type="button"> <a href="carte/bornes/${borne.id}" style="color: white; text-decoration: none;" >Réserver</a></button>
        </div>
      `);

      markerClusterGroup.addLayer(marker);
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [terminals, map]);

  return null;
}

ClusterMarkers.propTypes = {
  terminals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      cood: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      isBooked: PropTypes.number.isRequired,
      plug_type: PropTypes.string.isRequired,
      chain_name: PropTypes.string.isRequired,
      accessibility: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function Carte() {
  const terminalData = useLoaderData();

  return (
    <>
      <NavVisiteur />
      <MapContainer
        center={[48.866667, 2.333333]}
        zoom={5}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClusterMarkers terminals={terminalData} />
        <LocateUser />
      </MapContainer>
    </>
  );
}

export default Carte;
