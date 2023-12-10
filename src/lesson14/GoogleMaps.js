import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import scriptLoader from 'react-async-script-loader';

const LocationForm = ({ google, isScriptLoaded, onCreate }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleMapClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    setCoordinates({ lat, lng });
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK') {
        const formattedAddress = results[0].formatted_address;
       
        onCreate(lat, lng);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {isScriptLoaded && (
        <Map
          google={google}
          initialCenter={{
            lat: 32.086060, // Bnei Brak latitude
            lng: 34.826770, // Bnei Brak longitude
          }}
          onClick={handleMapClick}
          language="he"
        >
          {coordinates.lat !== null && <Marker position={coordinates} />}
        </Map>
      )}
    </div>
  );
};

const LocationFormWithScriptLoader = scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsgthVKM-7_V0Bz9AbgeabykLLhp8e2nU&language=he`,
])(LocationForm);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCsgthVKM-7_V0Bz9AbgeabykLLhp8e2nU',
})(LocationFormWithScriptLoader);
