
// import React, { useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = ({ vendors }) => {
//   useEffect(() => {
//     let map = null; // Declare map variable outside the effect

//     if (!map) {
//       // Check if map is not initialized
//       map = L.map("map").setView([19.7515, 75.7139], 8); // Centered around Maharashtra

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);
//     }

//     // Render markers for vendors
//     vendors.forEach((vendor) => {
//       const [lng, lat] = vendor.location.coordinates;
//       L.marker([vendor.location.lat, vendor.location.lng])
//         .addTo(map)
//         .bindPopup(`<b>${vendor.shopname}</b><br>${vendor.name}`);
//     });

//     // Cleanup function when the component is unmounted
//     return () => {
//       if (map) {
//         map.remove(); // Remove the map instance
//         map = null; // Reset map variable
//       }
//     };
//   }, [vendors]); // Update effect when vendors change

//   return (
//     <div id="map" className="absolute z-10 w-full h-screen overflow-hidden" />
//   );
// };

// export default MapComponent;


// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const MapComponent = ({ vendors }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     let map = null;

//     if (!mapRef.current) {
//       map = L.map("map").setView([19.7515, 75.7139], 8); // Centered around Maharashtra
//       mapRef.current = map;

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);
//     } else {
//       map = mapRef.current;
//     }

//     // Remove existing markers before rendering new ones
//     map.eachLayer((layer) => {
//       if (layer instanceof L.Marker) {
//         map.removeLayer(layer);
//       }
//     });

//     // Render markers for vendors
//     vendors.forEach((vendor) => {
//       const [lng, lat] = vendor.location.coordinates;
//       const marker = L.marker([lat, lng]).addTo(map);
//       marker.bindPopup(`<b>${vendor.shopname}</b><br>${vendor.name}`);
//     });

//     // Zoom to the last marker location with smooth animation
//     if (vendors.length > 0) {
//       const lastVendor = vendors[vendors.length - 1];
//       const [lastLng, lastLat] = lastVendor.location.coordinates;
//       map.flyTo([lastLat, lastLng], 12, { duration: 2 }); // Smooth animation for 2 seconds (adjust as needed)
//     }

//     return () => {
//       // No cleanup needed
//     };
//   }, [vendors]);

//   return (
//     <div id="map" className="absolute z-10 w-full h-screen overflow-hidden" />
//   );
// };

// export default MapComponent;



import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ vendors }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    let map = null;

    if (!mapRef.current) {
      map = L.map("map").setView([19.7515, 75.7139], 8); // Centered around Maharashtra
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    } else {
      map = mapRef.current;
    }

    // Remove existing markers before rendering new ones
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Render markers for vendors with cool animation
    vendors.forEach((vendor) => {
      const [lng, lat] = vendor.location.coordinates;
      const marker = L.marker([lat, lng]).addTo(map);
      const popup = L.popup({ closeButton: false }).setContent(`<b>${vendor.shopname}</b><br>${vendor.name}`);
      marker.bindPopup(popup).openPopup();

      // Cool animation
      marker.on("mouseover", function () {
        marker.openPopup();
      });

      marker.on("mouseout", function () {
        marker.closePopup();
      });
    });

    // Zoom to the last marker location with smooth animation
    if (vendors.length > 0) {
      const lastVendor = vendors[vendors.length - 1];
      const [lastLng, lastLat] = lastVendor.location.coordinates;
      map.flyTo([lastLat, lastLng], 12, { duration: 2 }); // Smooth animation for 2 seconds (adjust as needed)
    }

    return () => {
      // No cleanup needed
    };
  }, [vendors]);

  return (
    <div id="map" className="absolute z-10 w-full h-screen overflow-hidden" />
  );
};

export default MapComponent;








