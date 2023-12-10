import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { TextField, MenuItem, Box, Modal, Typography } from '@mui/material';
import GoogleMaps from './GoogleMaps';
import AddressDetails from './AddressDetails';
import './ExistingMemberRegistrationPage.css'; 
import LocationForm from '../lesson14/GoogleMaps';
import {createNewMinyan} from '../Api';

import myImage from '../Images/logo.png';
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
export default function NewRequestPage() {
  const [maxFar, setMaxFar] = useState('');
  const [distanceUnit, setDistanceUnit] = React.useState('meters');
  const [registrationComplete, setRegistrationComplete] = React.useState(false);
  const [name, setName] = React.useState('');
  const [Phone, setPhon] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const[objReq,setObjReq]= useState({});

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
  const [locationType, setLocationType] = useState(locationTypes[0].value);
  const [arrival, setArrival] = useState(modeOfArrival[0].value);

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
  const [LocationX, setLocationX] = useState('');
  const [LocationY, setLocationY] = useState('');

  const onSubmit=async()=>{

  
    // var x = await createNewMinyan(objReq)
    // if(x){
    //   alert("נוסף בהצלחה,הידד!!")
    // }
  }
  const handleChange = (selected,key) => {
    
   setObjReq((prev) => ({
     ...prev,
     [key]: selected,
   }));

   };
  const handleEndRegistration = () => {
    const currentDate = new Date();
    const selectedHour = parseInt(selectedTime.split(':')[0], 10);
    
    const selectedDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), selectedHour);
    onSubmit();
    
    setRegistrationComplete(true);
  
  };
  const handleLocationTypeChange = (event) => {
  debugger
    setLocationType(event.target.value);
    
      setModalOpen(true);
   
  };
  const handleDistanceUnit = (event) => {
    debugger
    setDistanceUnit(event.target.value)      
        if(event.target.value==='kilometers'){
          setMaxFar(maxFar*1000)  ;
        }
        else{
          setMaxFar(maxFar)  ;
        }
       handleChange(maxFar,"MaxFar");
      
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
    handleChange(lng,"LocationY")
  };
  const handleCancelRegistration = () => {
    // handle cancellation and redirect to home page
    window.location.href = '/';
  };

  const isRegistrationDisabled = () => {
    return !maxFar || registrationComplete;
  };

  return (
    <>
    <Box sx={{ p: 4 }} id="existing">
      <Typography variant="h5" id="Title" sx={{ mb: 2, textAlign: 'center' }}> 
      - רישום למניין חדש
המתנה לזמן שיבוץ      </Typography>
      <TextField
        fullWidth
        label="name"
        value={name}
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
       <div style={{ display: 'flex', alignItems: 'center',marginBottom:'1rem' }}>
          <TextField
            fullWidth
            type="number"
            label="max distance"
            value={maxFar}
            onChange={(e) => setMaxFar(e.target.value)}
            onBlur={(e)=>{ handleChange(e.target.value,"MaxFar")}}
            sx={{ marginRight: '1rem' }}
          />
          <TextField
            select
            fullWidth
            label="distance unit"
            value={distanceUnit}
            onChange={handleDistanceUnit}
          >
            {distanceUnits.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      <TextField
        select
        fullWidth
        label="mode of arrival"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        onBlur={(e)=>{ handleChange(e.target.value,"ModeOfArrival")}}
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: '8px', p: 2 }}>
        {locationType === 'map' ? <LocationForm onCreate={handleModalClose}/> : <AddressDetails onCreate={handleModalClose}/>}
        
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
        <TextField
          fullWidth
          label="Phone"
          value={Phone}
          onChange={(e) => setPhon(e.target.value)}
          onBlur={(e)=>{ handleChange(e.target.value,"Phone")}}
          sx={{ mb: 2 }}
        />

  
     
      {registrationComplete && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">תודה על הרישום!</Typography>
          <Typography variant="body1">
            נשלח לך הודעה עם מיקום המניין לפי הפרטים שסיפקת.
          </Typography>
        </Box>
      )}
       <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={handleCancelRegistration} disabled={registrationComplete}>
          ביטול
        </Button>

        <Button variant="contained" color="primary" onClick={handleEndRegistration} disabled={isRegistrationDisabled() || registrationComplete}>
          סיום  רישום
        </Button>
      </Box>
      

    </Box> 
    <div class="image-container">
  <img class="cropped-image" src={myImage}  alt="My Image" />
</div>

            </>

  );
}