import { MapContainer, TileLayer } from "react-leaflet";
import NavVisiteur from "../components/NavVisiteur";

import "./styles/Carte.scss";

function Carte() {
  return (
    <section>
      <h1> Bonjour je suis Carte </h1>
      <NavVisiteur />
      <div id="map">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </section>
  );
}

export default Carte;
