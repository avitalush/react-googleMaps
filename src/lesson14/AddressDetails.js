import React, { useState } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { TextField, MenuItem, Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const AddressDetails = ({ google,onCreate }) => {
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [numOfStreet, setNumOfStreet] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false); // Added state for checking if all fields are filled
  const [showConfirmation, setShowConfirmation] = useState(false); // Added state for showing the confirmation modal

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLocation(address + ' ' + numOfStreet + ',' + city);
    setShowConfirmation(true); 
  };

  const handleConfirmation = () => {
    setShowConfirmation(false); // Close the confirmation modal
    setIsLoading(false);

    if (location.trim() !== '') {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === 'OK') {
          const { lat, lng } = results[0].geometry.location;
          setCoordinates({ lat: lat(), lng: lng() });
          const formattedAddress = results[0].formatted_address;
          let resultLat=lat();
          let resultLng=lng();
          
          onCreate(resultLat,resultLng);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    // Reset form fields
    setAddress('');
    setCity('');
    setNumOfStreet('');
    setIsFormFilled(false);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false); // Close the confirmation modal

    // Reset form fields
    setAddress('');
    setCity('');
    setNumOfStreet('');
    setIsFormFilled(false);
  };

  // Check if all fields are filled
  const checkFormFilled = () => {
    return address.trim() !== '' && numOfStreet.trim() !== '' && city.trim() !== '';
  };

  // Update isFormFilled state when any of the fields change
  const handleFieldChange = (field, value) => {
    if (field === 'address') {
      setAddress(value);
    } else if (field === 'numOfStreet') {
      setNumOfStreet(value);
    } else if (field === 'city') {
      setCity(value);
    }

    setIsFormFilled(checkFormFilled());
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" id="Title" sx={{ mb: 2, textAlign: 'center' }}>
        יצירת מיקום
      </Typography>
      <TextField
        fullWidth
        label="רחוב"
        value={address}
        onChange={(e) => handleFieldChange('address', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="מספר רחוב"
        value={numOfStreet}
        onChange={(e) => handleFieldChange('numOfStreet', e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="עיר"
        value={city}
        onChange={(e) => handleFieldChange('city', e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="outlined" onClick={handleFormSubmit} disabled={!isFormFilled}>
        create
      </Button>

      {/* Confirmation Modal */}
      <Modal open={showConfirmation} onClose={handleCancelConfirmation}>
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: '8px', p: 2 ,textAlign:'center'}}>
          <Typography variant="h6">:האם אתה בטוח שהכתובת הרצויה היא</Typography>
          <Typography>{address + ' ' + numOfStreet + ', ' + city}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleConfirmation}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleCancelConfirmation} sx={{ ml: 2 }}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* 
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        coordinates.lat !== null && (
          <Map google={google} initialCenter={coordinates} center={coordinates} zoom={10} language="he">
            <Marker position={coordinates} />
          </Map>
        )
      )} */}
    </Box>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCsgthVKM-7_V0Bz9AbgeabykLLhp8e2nU',
})(AddressDetails);
