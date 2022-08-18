import React, { useState, useRef } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Event from "../models/Event"
import connectDb from "../middleware/mongoose"
import "leaflet/dist/leaflet.css";
import osm from "../components/osm-providers";

const markerIcon = new L.Icon({
  iconUrl: require("./resources/flag.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const MarkersMap = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  return (
    <>


      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Adding Markers to react leaflet</h2>
          <p>Loading basic map using layer from maptiler</p>
          <div className="col">
            <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <TileLayer
                url={osm.maptiler.url}
                attribution={osm.maptiler.attribution}
              />

              {Event.map((event, idx) => (
                <Marker
                  position={[event.location.lat, event.location.log]}
                  icon={markerIcon}
                  key={idx}
                >
                  <Popup>
                    <b>
                      {event.event_name}, {event.start_time}
                    </b>
                  </Popup>
                </Marker>
              ))}
            </Map>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkersMap;






// import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css'
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
// import "leaflet-defaulticon-compatibility";

// const Map = () => {
//   return (
//     <MapContainer center={[40.8054,-74.0241]} zoom={14} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
//       <Marker 
//       position={[40.8054,-74.0241]}
//       draggable={true}
//       animate={true}
//       >
//         <Popup>
//           Hey ! you found me
//         </Popup>
//       </Marker>
//     </MapContainer>
//   )
// }

// export default Map