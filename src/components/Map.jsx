import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import supabase from "../config/supabaseClient";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function Map() {
  const newMarkerRef = useRef(null);

  const [markers, setMarkers] = useState([]);
  const [newMarker, setNewMarker] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMarkers = async () => {
      const { data, error } = await supabase.from("markers").select("*");
      if (error) {
        console.error("Error loading markers:", error.message);
      } else {
        console.log("Fetched markers:", data);
        setMarkers(data || []);
      }
    };

    fetchMarkers();
  }, []);

  useEffect(() => {
    if (newMarkerRef.current) {
      newMarkerRef.current.openPopup();
    }
  }, [newMarker]);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const isClickInsidePopup =
          e.originalEvent?.target.closest(".leaflet-popup");
        if (isClickInsidePopup) return;

        const latlng = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };

        console.log("Map clicked at:", latlng);
        setNewMarker(latlng);
      },
    });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !newMarker) return;

    const { error } = await supabase
      .from("markers")
      .insert([{ ...newMarker, description: input.trim() }]);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      console.log("Insert success!");
      const { data: updated, error: fetchError } = await supabase
        .from("markers")
        .select("*");

      if (fetchError) console.error("Fetch after insert failed:", fetchError);
      else setMarkers(updated || []);

      setNewMarker(null);
      setInput("");
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("markers").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error.message);
    } else {
      setMarkers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="mb-10 h-[900px] w-full">
      <MapContainer
        center={[43.65107, -79.347015]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full rounded-md shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapClickHandler />

        {Array.isArray(markers) &&
          markers.map((marker) => {
            if (!marker || !marker.lat || !marker.lng) return null;

            return (
              <React.Fragment key={marker.id || `${marker.lat}-${marker.lng}`}>
                <Marker position={[marker.lat, marker.lng]} icon={redIcon}>
                  <Popup>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">{marker.description}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(marker.id);
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </Popup>
                </Marker>

                <Marker
                  position={[marker.lat, marker.lng]}
                  icon={L.divIcon({
                    className: "",
                    html: `<div class="inline-block whitespace-nowrap bg-white border border-gray-300 text-sm text-black px-2 py-1 rounded-md shadow-md max-w-[300px]">${marker.description}</div>`,
                    iconAnchor: [-10, 40],
                  })}
                  interactive={false}
                />
              </React.Fragment>
            );
          })}

        {newMarker && (
          <Marker
            position={[newMarker.lat, newMarker.lng]}
            icon={redIcon}
            ref={(ref) => {
              if (ref) newMarkerRef.current = ref;
            }}
          >
            <Popup closeButton={false} autoClose={false} closeOnClick={false}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe the problem"
                  className="p-2 border border-gray-300 rounded-md text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  Add Marker
                </button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
