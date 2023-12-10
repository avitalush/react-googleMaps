
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { Navigate, useNavigate } from 'react-router-dom';
import './SignInPage.css'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';

export default function SignInPage() {

  const [name, setName] = useState('');

  const navigate = useNavigate();
const allProducts=[];
const handleAddProduct=()=>{
let index=allProducts.find(product=>{
    product.name===name
})
if(index!==-1){
    allProducts[index] = { ...allProducts[0], quanity: allProducts[index].quanity + 1 };
}
else{
    allProducts.push({ ...allProducts[0], quanity: 1});
}
}

function calculateSum() {
    const sum = allProducts.reduce((total, current) => total + Number(current.quanity), 0);
   return sum;
 } 
  return (
    <div className="container">
    <Box >
     <AppBar position="static" id="bar">
       <Toolbar>
     
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             רשימת קניות
         </Typography>
        
           <div>
            
<p>סה"כ {calculateSum()} מוצרים</p>
           </div>
         
       </Toolbar>
     </AppBar>
     </Box >
     <TextField id="outlined-basic" label="Outlined" variant="outlined" />
     <FormControl fullWidth>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
  
    onChange={handleChange}
  >
     {categories.map((cat,index) => (
          <MenuItem key={index} value={cat}>
            {cat}
          </MenuItem>
        ))}
  </Select>
</FormControl>
<Button variant="outlined"  onClick={handleAddProduct}>Outlined</Button>
{categories.map((category) => (
        <Category key={category.id} title={category.title} products={allProducts.filter(f=>f.categor===category)} />
 ))}

</div>
   
  );
}
