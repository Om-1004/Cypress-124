import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const redIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function Map() {
  const [markers, setMarkers] = useState(() => {
    try {
      const stored = localStorage.getItem('markers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [newMarker, setNewMarker] = useState(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('markers', JSON.stringify(markers));
  }, [markers]);

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setNewMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !newMarker) return;

    const updatedMarkers = [
      ...markers,
      { ...newMarker, description: input.trim() },
    ];

    setMarkers(updatedMarkers);
    setNewMarker(null);
    setInput('');
  };

  return (
    <div className="mb-10 h-[500px] w-full">
      <MapContainer
        center={[43.65107, -79.347015]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full rounded-md shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <MapClickHandler />

        {markers.map((marker, index) => (
          <React.Fragment key={index}>
            <Marker position={[marker.lat, marker.lng]} icon={redIcon} />
            <Marker
              position={[marker.lat, marker.lng]}
              icon={L.divIcon({
                className: '',
                html: `<div class="inline-block whitespace-nowrap bg-white border border-gray-300 text-sm text-black px-2 py-1 rounded-md shadow-md max-w-[300px]">${marker.description}</div>`,
                iconAnchor: [-10, 40],
              })}
              interactive={false}
            />
          </React.Fragment>
        ))}

        {newMarker && (
          <Marker position={[newMarker.lat, newMarker.lng]} icon={redIcon}>
            <Popup closeButton={false} autoClose={false} closeOnClick={false}>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 p-2"
              >
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
