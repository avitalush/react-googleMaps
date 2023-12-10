import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, MenuItem, Box, Modal, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleMaps from './GoogleMaps';
import AddressDetails from './AddressDetails';
import './ExistingMemberRegistrationPage.css';
import myImage from '../Images/logo.png';
import LocationForm from '../lesson14/GoogleMaps';
import {createMinyan} from '../Api';
const distanceUnits = [
  {
    value: 'meters',
    label: 'מטרים',
  },
  {
    value: 'kilometers',
    label: 'קילומטרים',
  },
];

const modeOfArrival = [
  {
    value: 'null',
    label: 'choose mode of arrival ',
  },
  {
    value: 'Car',
    label: 'רכב',
  },
  {
    value: 'Walk',
    label: 'הליכה',
  },
  {
    value: 'Bicycle',
    label: 'אופניים',
  },
];

export default function ExistingMemberRegistrationPage() {
  const [maxFar, setMaxFar] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('meters');
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState('');
  const [Phone, setPhon] = useState('');
  const [mail, setMail] = useState('');
  const [LocationX, setLocationX] = useState('');
  const [LocationY, setLocationY] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [resmodalOpen, setResModalOpen] = useState(false);
  const [objRes, setObjRes] = useState("");

  const [minyanHour, setMinyanHour] = useState(null);

  const locationTypes = [
    {
      value: 'null',
      label: 'choose location',
    },
    {
      value: 'current',
      label: 'current location',
    },
    {
      value: 'map',
      label: 'on the map',
    },
  ];
  async function getAddres(google, lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const location = new google.maps.LatLng(lat, lng);
  
    return new Promise((resolve, reject) => {
      geocoder.geocode({ location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
          const addressComponents = results[0].address_components;
          let city, street, number;
  
          for (const component of addressComponents) {
            const types = component.types;
  
            if (types.includes('locality')) {
              city = component.long_name;
            } else if (types.includes('route')) {
              street = component.long_name;
            } else if (types.includes('street_number')) {
              number = component.long_name;
            }
          }
  
          const addressString = ` ${street} ${number}, ${city}`;
          const hebrewAddressString = convertToHebrew(addressString);
  
          resolve(hebrewAddressString);
        } else {
          reject(new Error('Failed to geocode coordinates.'));
        }
      });
    });
  }
  
  function convertToHebrew(addressString) {
    const apiEndpoint = 'https://api.mymemory.translated.net/get';
    const params = new URLSearchParams({
      q: addressString,
      langpair: 'en|he',
    });
  
    return fetch(`${apiEndpoint}?${params}`)
      .then((response) => response.json())
      .then((data) => data.responseData.translatedText)
      .catch((error) => {
        console.error('Failed to convert address to Hebrew:', error);
        return addressString;
      });
  }
  const [locationType, setLocationType] = useState(locationTypes[0].value);
  const [arrival, setArrival] = useState(modeOfArrival[0].value);
  const[objReq,setObjReq]= useState({});
  const timeOptions = [
    '9:00am - 10:00am',
    '10:00am - 11:00am',
    '11:00am - 12:00pm',
    '12:00pm - 1:00pm',
    '1:00pm - 2:00pm',
    '2:00pm - 3:00pm',
    '3:00pm - 4:00pm',
    '4:00pm - 5:00pm',
    '5:00pm - 6:00pm',
    '5:00pm - 6:00pm',
    '6:00pm - 7:00pm',
    '7:00pm - 8:00pm',
    '8:00pm - 9:00pm',
    '9:00pm - 10:00pm',
    '10:00pm - 11:00pm',
    '11:00pm - 12:00am',
  ];

  const handleEndRegistration = async() => {
    debugger
    alert(objReq);
    // let res=createMinyan();
    // if(res){
    //   try {
    //     handleGetAddress(LocationX, LocationY);   
    //     setMinyanHour(parseInt(res.TimeMinyan.split(':')[0], 10));
    //   setResModalOpen(true);
    //   } catch (error) {
    //     console.error(error);
    //   } 
      
    // }
      
     
    
    // else{
    //   alert("הזן שוב את פרטיך");
    // }

    

  };
  const handleGetAddress = async (lat, lng) => {
    try {
      debugger
      const formattedAddress = await getAddres(window.google, lat, lng);
      setObjRes(formattedAddress);
    } catch (error) {
      console.log(error);
    }
  };
  const handleResModalClose = () => {
 setResModalOpen(false);

  };
  const isRegistrationDisabled = () => {
    if (mail && Name && LocationX && LocationY) {
      return false; // אפשר לאפשר את הכפתור כאשר כל השדות מולאו
    }
    return true; // משביתים את הכפתור אם לפחות אחד מהשדות ריק
  };
  const handleLocationTypeChange = (event) => {
    setLocationType(event.target.value);
    setModalOpen(true);

  };

  const handleSelectedTime = (event) => {
    debugger
    setSelectedTime(event.target.value);
    const currentDate = new Date();
    const selectedHour = parseInt(event.target.value.split(':')[0], 10);
    const selectedDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      selectedHour
    );
    handleChange(selectedDateTime,"TimeMinyan");

  };

  

  const handleModalClose = (lat, lng) => {
    setModalOpen(false);
    setLocationX(lat);
    setLocationY(lng);
    handleChange(lat,"LocationX");
    handleChange(lng,"LocationY");

  };

  const handleCancelRegistration = () => {
    // handle cancellation and redirect to home page
    window.location.href = '/';
  };
  const handleChange = (selected,key) => {
  
    setObjReq((prev) => ({
      ...prev,
      [key]: selected,
    }));
 
    };


  return (
    <>
      <Box sx={{ p: 4 }} id="existing">
        <Typography variant="h5" id="Title" sx={{ mb: 2, textAlign: 'center' }}>
רישום למנין קיים-שיבוץ מידי        </Typography>
        <TextField
          fullWidth
          label="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e)=>{ handleChange(e.target.value,"Name")}}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="text"
          label="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          onBlur={(e)=>{ handleChange(e.target.value,"Mail")}}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone"
          value={Phone}
          onBlur={(e)=>{ handleChange(e.target.value,"Phon")}}
          onChange={(e) => setPhon(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          onBlur={(e)=>{ handleChange(e.target.value,"Arrival")}}
          label="mode of arrival"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          sx={{ mb: 2 }}
        >
          {modeOfArrival.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="location type"
          value={locationType}
          onChange={handleLocationTypeChange}
          sx={{ mb: 2 }}
        >
          {locationTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Modal open={modalOpen} onClose={handleModalClose} center>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: '8px',
              p: 2,
            }}
          >
            {locationType === 'map' ? <LocationForm onCreate={handleModalClose} /> : locationType === 'current' ? <AddressDetails onCreate={handleModalClose} /> : null}
          </Box>
        </Modal>
        <TextField
          fullWidth
          label="Available for a meeting between the hours"
          value={selectedTime}
          onChange={handleSelectedTime}
          select
          sx={{ mb: 2 }}
        >
          {timeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* {registrationComplete && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="h6">!תודה על הרישום</Typography>
            <Typography variant="body1">נשלח לך הודעה עם מיקום המניין לפי הפרטים שסיפקת.</Typography>
          </Box>
        )} */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleCancelRegistration} disabled={registrationComplete}>
            ביטול
          </Button>
          <Button
        variant="contained"
        color="primary"
        onClick={handleEndRegistration}
        disabled={isRegistrationDisabled() || registrationComplete}
      >
        סיום רישום
      </Button>
        </Box>
      </Box>
      <div class="image-container">
        <img class="cropped-image" src={myImage} alt="My Image" />
      </div>
      <Modal open={resmodalOpen} onClose={handleResModalClose} center>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: '8px',
              p: 2,
            }}
          >
          <p>הרשמת למנין הושלמה בהצלחה</p> 
        
<br/>
          <p>שעת המנין:{minyanHour}</p> 
          <p>כתובת המנין:{objRes}</p> 
          </Box>
        </Modal>
    </>
  );
}
