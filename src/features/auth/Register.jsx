import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlineIcon from '@mui/icons-material/AlternateEmail';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../../svg/Logo.svg';
import Register_Logo from '../../svg/Register_Logo.svg'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { register } from '../../services/authService';
import { Loader } from '../../components/Loader/Loader';
import { SetAlert } from '../../components/Alert/SetAlert';
import { setAlertTimer } from '../../helper/alertHelper';
import constants from '../../shared/constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/userReducer';


export const Register = () => {

  const navigate = useNavigate();
  const dispatch =  useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await register(registrationData);
      if (response?.data?.jwt) {
        setAlertTimer(setShowSuccessAlert);
        if(response?.data?.user){
          dispatch(setUser(response.data.user))
        }
        localStorage.setItem('token', response.data.jwt)
        navigate('/homePage')
      }
      setIsLoading(false);
    }
    catch (err) {
      setAlertTimer(setShowErrorAlert);
      setError(err?.response?.data?.error?.message || 'Registration Failed')
      setIsLoading(false)
    }
  };



  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',py: 8,px: 2}}>
        <Card sx={{width: '1192px',boxShadow: '0 8px 40px -12px rgba(0,0,0,0.1)',borderRadius: '30px',overflow: 'hidden',height: '855px',display: 'flex',flexDirection: { xs: 'column', md: 'row' },border: '1px solid #DFDFDF'}}>
          <Box sx={{ width: { xs: '100%', md: '596px' } }}>
            <CardContent sx={{ p: 4, height: '100%' }}>
              <Box sx={{display: 'flex',justifyContent: 'center',mb: 4}}>
                <img src={Logo} alt="Logo" style={{ height: '30px' }}/>
              </Box>
              <Typography variant="body2" sx={{textAlign: 'center',mb: 4,color: '#212121',fontSize: 16}}>
                <b>{constants.LISTBNB}</b> {constants.LISTBNB_DESCRIPTION}
              </Typography>
              <Typography variant="body2" sx={{textAlign: 'center',mb: 4,color: '#212121',fontSize: 24,fontWeight: 600}}>
                {constants.CREATE_YOUR} <br /> {constants.ACCOUNT}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{
                    mb: 2, '& .MuiOutlinedInput-root': {
                      borderRadius: '16px'
                    }
                  }} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlineIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  sx={{
                    mb: 2, '& .MuiOutlinedInput-root': {
                      borderRadius: '16px'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    mb: 2, '& .MuiOutlinedInput-root': {
                      borderRadius: '16px'
                    }
                  }} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{
                    mb: 3, '& .MuiOutlinedInput-root': {
                      borderRadius: '16px'
                    }
                  }} InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 2,
                    py: 1.5,
                    bgcolor: '#F50963',
                    borderRadius: '25px',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: '#d6085a'
                    }
                  }}
                  endIcon={<ArrowRightAltIcon />}
                >
                  Register
                </Button>
              </Box>
            </CardContent>
          </Box>
          <Box sx={{width: { xs: '100%', md: '596px' },bgcolor: '#F509640A',display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100%'}}>
            <Box sx={{padding: 4,textAlign: 'center',maxWidth: '80%'}}>
              <img src={Register_Logo} alt="Logo"/>
              <Typography variant="h4" component="h2" sx={{
                  mb: 3,
                  mt: 2,
                  fontWeight: 600,
                  fontSize: 24,
                  color: '#212121'
                }}
              >
                {constants.ALREADY_HAVE_AN_ACCOUNT}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: '#666666', fontSize: 16 }}
              >
                {constants.REGISTER_PAGE_LOGIN_DESCRIPTION}
              </Typography>
              <Button
                component={Link}
                variant="contained"
                to={'/login'}
                size="small"
                color="primary"
                sx={{
                  width: '120px',
                  height: '45px',
                  borderRadius: '25px',
                  background: '#F50963',
                  textTransform: 'none'
                }}
                endIcon={<ArrowRightAltIcon />}
              >
                {constants.LOGIN}
              </Button>
            </Box>
          </Box>
        </Card>
        <SetAlert message={error} severity={constants.ERROR} open={showErrorAlert} />
        <SetAlert message={constants.REGISTRATION_SUCCESS} severity={constants.SUCCESS} open={showSuccessAlert} />
      </Box>
    </>
  );
};