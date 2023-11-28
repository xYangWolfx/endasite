import React, { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    // Initialize the map
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.19825110323452, lng: -8.461013195732969 },
      zoom: 15, // Adjust the zoom level as needed
    });

    // Create a marker for the event location
    const marker = new window.google.maps.Marker({
      position: { lat: 40.19825110323452, lng: -8.461013195732969 },
      map: map,
      title: "Event Location",
    });
  }, []);

  return <div id="map" style={{ height: "400px", width: "100%" }} />;
};

export default Map;