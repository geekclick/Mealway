import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ className }) => {
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

    // Cleanup function when the component is unmounted
    return () => {
      if (map) {
        map.remove(); // Remove the map instance
        map = null; // Reset map variable
      }
    };
  }, []);
  return (
    <div
      id="map"
      //   style={{
      //     height: "calc(100vh - 100px)",
      //     width: "100%",
      //     overflow: "hidden",
      //   }}
      className={className}
    />
  );
};

export default MapComponent;
