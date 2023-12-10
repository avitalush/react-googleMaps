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
import { useParams } from 'react-router-dom';

const MinyanTable = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  let newList = []; // Changed from `const` to `let`
  const columns = [
    { id: 'Name', label: 'שם', minWidth: 100, align: 'center' },
    { id: 'MaxFar', label: 'מרחק מקסימלי', minWidth: 170, align: 'center' },
    { id: 'Address', label: 'כתובת', minWidth: 170, align: 'center' },
    { id: 'code', label: 'קוד', minWidth: 100, align: 'center' },
  ];
  const { codeRow } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const Minyan = useSelector((state) => state.slices.listOfMinyans);

  const obgOfMinyan = Minyan.find((minyan) => minyan.codeRow === codeRow);

  function createData(code, Name, MaxFar, Address) {
    return { code, Name, MaxFar, Address };
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

          const addressString = `${street} ${number}, ${city}`;
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

  const getListInlaidUsersHeap = async (obj) => {
    const inlaidUsersHeap = obj ? obj.InlaidUsersHeap : [];
    return inlaidUsersHeap;
  };

  const castingFunction = async (list) => {
    const updatedList = [];
    for (const item of list) {
      const { code, LocationX, LocationY, Name, MaxFar } = item;
      const address = await getAddres(window.google, LocationX, LocationY);

      const newItem = {
        code,
        Address: address,
        Name,
        MaxFar,
      };

      updatedList.push(newItem);
    }

    return updatedList;
  };

  const fetchData = async () => {
    let res = await getListInlaidUsersHeap(obgOfMinyan);
    newList = await castingFunction(res);
  };

  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      await fetchData();
      setRows(newList.map((item) => createData(item.code, item.Name, item.MaxFar, item.Address)));
    };

    fetchDataAndSetRows();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
            fontSize: '6vh',
            color: 'white',
            top: '30vh',
          }}
        >
          פרטי מנין בכתובת {obgOfMinyan.Address}בשעה {obgOfMinyan.TimeMinyan}
        </Typography>
      </Box>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
    </>
  );
};

export default MinyanTable;
