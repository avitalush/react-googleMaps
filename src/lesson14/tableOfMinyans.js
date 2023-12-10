import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setListOfMinyans } from '../redux';
import Typography from '@mui/material/Typography';
import { Navigate, useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import{getByDate,getAllMinyans} from '../Api'
import './tableOfMinyans.css'
import dayjs from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Stack from '@mui/material/Stack';

const TableOfMinyans = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedDate, setSelectedDate] = useState("invalid Date");
  const [showDateTimeInput, setShowDateTimeInput] = useState(false);

  let newList = []; // Changed from `const` to `let`
  const columns = [
   
    { id: 'Address', label: 'כתובת המנין', minWidth: 100, align: 'center' },
    { id: 'TimeMinyan', label: 'שעת תחילת מנין', minWidth: 170, align: 'center' }, 
    { id: 'codeRow', label: 'קוד מנין', minWidth: 100, align: 'center' },
  ];
  // const existingList = [
  //   {
  //     codeRow: '20',
  //     LocationX: '32.08720897140882',
  //     LocationY: '34.826598338623064',
  //     TimeMinyan: '2023-06-08T16:20:00Z',
  //     InlaidUsersHeap: [
  //       {code:'10', Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' },
  //       {code:'20', Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' },
  //       { code:'30',Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' },
  //       {code:'40', Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' }
  //     ],
  //   },
  //   {
  //     codeRow: '30',
  //     LocationX: '32.08720897140882',
  //     LocationY: '34.826598338623064',
  //     TimeMinyan: '2023-06-08T16:20:00Z',
  //     InlaidUsersHeap: [
  //       {code:'10', Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' },
  //       {code:'20', Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' },
  //       { code:'30',Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' },
  //       {code:'40', Name: 'ggg', LocationX: '32.08720897140882', LocationY: '34.826598338623064', MaxFar: '20' }
  //     ],
  //   },
  //   // Other objects in the existingList array...
  // ];
  const existingList=[];
  const navigate = useNavigate();
  const dateInput = document.getElementById('date-input');

  const dispatch = useDispatch();
  const listMinyans = useSelector((state) => state.slices.listOfMinyans);
  function createData( codeRow,Address, TimeMinyan) {
    return { codeRow, Address, TimeMinyan };
  }
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

  function getTimeFromDateTime(dateTime) {
    const dateObj = new Date(dateTime);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  const handleDateChange = (date) => {
    try {
      if (date instanceof Date && !isNaN(date)) {
        const formattedDate = date ? date.toISOString().slice(0, 16) : null;
        setSelectedDate(formattedDate)
      } else { 
        throw new Error('Invalid date object'+date);
      }  
    
    } catch (error) {
      console.error('Error:', error.message);
      
    }
  
  };

  
  
  
  const castingfuntion = async (list) => {
    const updatedList = [];
    for (const item of list) {
      const { codeRow,LocationX, LocationY, TimeMinyan, InlaidUsersHeap } = item;
      const address = await getAddres(window.google, LocationX, LocationY);
      const time = getTimeFromDateTime(TimeMinyan);

      const newItem = {
        codeRow,
        Address: address,
        TimeMinyan: time,
        InlaidUsersHeap,
      };

      updatedList.push(newItem);
    }

    return updatedList;
  };

  const handleDisplayClick = async () => {
    let res;
    if (selectedDate !== "invalid Date") {
     await getByDate(selectedDate).then((r)=>{res = r.data} );
    } else {
      await getAllMinyans().then((r)=>{res = r.data} );
    }
    
    const updatedList = await castingfuntion(res);
    dispatch(setListOfMinyans(updatedList));
  };
  
  useEffect(() => {
    const fetchData = async () => {
      if (selectedDate !== "invalid Date") {
        let res = await getByDate();
        const updatedList = await castingfuntion(res);
        dispatch(setListOfMinyans(updatedList));
      } else {
        let res = await getAllMinyans();
        const updatedList = await castingfuntion(res);
        dispatch(setListOfMinyans(updatedList));
      }
    };
  
    fetchData();
  }, [selectedDate, dispatch]);
  
  useEffect(() => {
    setRows(
      listMinyans.map((item) =>
        createData(item.codeRow, item.Address, item.TimeMinyan)
      )
    );
  }, [listMinyans]);
  
  const handleDateTimeButtonClick = () => {
    setShowDateTimeInput(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleDateTimeChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleClick = (codeRow) => {
    
    navigate(`/minyanTable/${codeRow}`);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  return (
    <>
     <Box sx={{ mb: 5 }}>
        <Typography
          variant="h2"
          component="div"
          sx={{
            textAlign: 'center',
            fontSize: '8vh',
            color: 'white',
           
            top: '30vh',
          }}
        >
          רשימת המנינים
        </Typography>
      </Box>
      {listMinyans.length !=0 ? (
      <Paper sx={{ width: '70%', overflow: 'hidden', margin: '0 auto' }}>

    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.index}
                  onClick={() => handleClick(row.codeRow)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                      {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  ):(
    <div id="otef"><Button variant="contained" color="primary"  onClick={handleDisplayClick} disabled={!((selectedDate.toString()!=="invalid Date"&&showDateTimeInput)|!showDateTimeInput)}>
    הפעל שיבוץ
  </Button>  <div id="o-date">
        {!showDateTimeInput?(       
    <Button variant="contained" color="primary" style={{}} onClick={handleDateTimeButtonClick}>
    הפעל סינון לפי תאריך ושעה
  </Button>
  ):(
    <Stack spacing={2}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DateTimePicker value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
    </LocalizationProvider>
    <Typography> {selectedDate == null ? 'null' : selectedDate.toString()}</Typography>
  </Stack>
  )}
  
            </div></div>
  )}
  </>
  );
};

export default TableOfMinyans;
