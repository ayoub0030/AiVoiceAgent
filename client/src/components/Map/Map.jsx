import React, { useEffect, useRef } from 'react';
import './Map.css';

const Map = ({ selectedEmergency }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        const loadGoogleMaps = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDaM_WnVJRWVOBhMY5hqnKROP_jV_s4SNw&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            window.initMap = () => {
                const mapOptions = {
                    center: { lat: 34.0209, lng: -6.8416 },
                    zoom: 6,
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }]
                        }
                    ]
                };

                mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

                // Update map position if there's a selected emergency
                if (selectedEmergency) {
                    updateMapForEmergency(selectedEmergency);
                }
            };
        };

        loadGoogleMaps();

        return () => {
            // Cleanup
            const script = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
            if (script) {
                script.remove();
            }
            delete window.initMap;
        };
    }, []);

    useEffect(() => {
        if (mapInstanceRef.current && selectedEmergency) {
            updateMapForEmergency(selectedEmergency);
        }
    }, [selectedEmergency, mapInstanceRef]);

    const updateMapForEmergency = (emergency) => {
        const { location } = emergency;
        
        // Clear existing marker
        if (markerRef.current) {
            markerRef.current.setMap(null);
        }

        // Center map on emergency location
        mapInstanceRef.current.setCenter(location);
        mapInstanceRef.current.setZoom(15);

        // Add marker for emergency location
        markerRef.current = new window.google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#FF0000',
                fillOpacity: 0.8,
                strokeWeight: 1
            }
        });
    };

    return <div ref={mapRef} className="map" />;
};

export default Map;
