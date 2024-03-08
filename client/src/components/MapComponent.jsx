
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ vendors }) => {
  useEffect(() => {
    let map = null; // Declare map variable outside the effect

    if (!map) {
      // Check if map is not initialized
      map = L.map("map").setView([19.7515, 75.7139], 8); // Centered around Maharashtra

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }

    // Render markers for vendors
    vendors.forEach((vendor) => {
      L.marker([vendor.location.lat, vendor.location.lng])
        .addTo(map)
        .bindPopup(`<b>${vendor.shopname}</b><br>${vendor.name}`);
    });

    // Cleanup function when the component is unmounted
    return () => {
      if (map) {
        map.remove(); // Remove the map instance
        map = null; // Reset map variable
      }
    };
  }, [vendors]); // Update effect when vendors change

  return (
    <div id="map" className="absolute z-10 w-full h-screen overflow-hidden" />
  );
};

export default MapComponent;