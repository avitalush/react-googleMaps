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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { Navigate, useNavigate } from 'react-router-dom';
import './SignInPage.css'; 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
const theme = createTheme();

export default function SignInPage() {
  const [open, setOpen] = React.useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = React.useState(false);
  const [password, setPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleExistingMember = () => {
    setOpen(true);
  };
  const handleCancelConfirmationPassword = () => {
   if(password=="1234"){
    setShowConfirmationPassword(false);
    navigate('/table')
   }
  else{
    setShowConfirmationPassword(false);
  }
  };

  const handleNewMember = () => {
    navigate("/newRequest");

  };

  const handleYes = () => {
    navigate("/existingMember");
    setOpen(false);
  };
  const handleNo = () => {
    navigate("/newRequest");

    setOpen(false);
  };

  return (
   
    <div className="container">
       <Box >
        <AppBar position="static" id="bar">
          <Toolbar>
        
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
           
              <div>
               
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e)=>{setShowConfirmationPassword(true)}}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
              </div>
            
          </Toolbar>
        </AppBar>
        </Box >

        <h1>Welcome to MinyamMatch</h1>

    <div className="button-container">
    <Button
    id="btn-1"
            variant="contained"
            size="large"
            color="primary"
            
            onClick={handleExistingMember}
          >
            רישום למניין קיים
          </Button>
          <Button
    id="btn-2"

            variant="contained"
            size="large"
            color="primary"
            
            onClick={handleNewMember}
          >
            רישום למניין חדש
          </Button>
    </div>
    <Modal open={showConfirmationPassword} onClose={handleCancelConfirmationPassword}>
        <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: '8px', p: 2 ,textAlign:'center'}}>
          <Typography variant="h6">הקש סיסמא</Typography>
          <div class="input-wrapper">
      <input id="in" type="password" placeholder="סיסמה" onChange={(e) => setPassword( e.target.value)}/>
    </div>
          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleCancelConfirmationPassword}>
              אישור
            </Button>
            
          </Box>
        </Box>
      </Modal>
    <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleNo}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={{
                backgroundColor: 'white',
                boxShadow: 24,
                padding: 4,
                borderRadius: 4,
                maxWidth: 400,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
                <Typography id="transition-modal-title" variant="h6" sx={{ color: 'primary.main', mb: 2 }}>
                  כדי שנענה על דרישותיך באופן מיטבי יש להירשם למניין חדש בזמן השיבוץ הבא. האם אתה רוצה בכל זאת להירשם למניין קיים?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={handleYes}
                  >
                    כן
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={handleNo}
                  >
                    לא
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
  </div>
   
  );
}
