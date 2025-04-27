import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlineIcon from '@mui/icons-material/AlternateEmail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useDispatch, useSelector } from 'react-redux';
import constants from '../shared/constants';
import { updateUserProfile } from '../services/userProfileService';
import { Loader } from '../components/Loader/Loader';
import { setAlertTimer } from '../helper/alertHelper';
import { SetAlert } from '../components/Alert/SetAlert';
import { setUser } from '../redux/reducers/userReducer';

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    location: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        username: user.username || '',
        photo: user.photo || '',
        location: user.location || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await updateUserProfile(formData);
      if (response?.data) {
        dispatch(setUser(response.data));
        setAlertTimer(setShowSuccessAlert);
      }
      setIsLoading(false);
    } catch (err) {
      setAlertTimer(setShowErrorAlert);
      setError(err?.response?.data?.error?.message || 'Update User Profile Failed');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          sx={{mb: 2, '& .MuiOutlinedInput-root': {borderRadius: '16px'}}}
          InputProps={{startAdornment: (<InputAdornment position="start"><AccountCircleIcon color="action" /></InputAdornment>)}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          sx={{mb: 2, '& .MuiOutlinedInput-root': {borderRadius: '16px'}}}
          InputProps={{startAdornment: (<InputAdornment position="start"><AccountCircleIcon color="action" /></InputAdornment>)}}
        />
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
          sx={{mb: 2, '& .MuiOutlinedInput-root': {borderRadius: '16px'}}}
          InputProps={{startAdornment: (<InputAdornment position="start"><EmailOutlineIcon color="action" /></InputAdornment>)}}
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
          sx={{mb: 2, '& .MuiOutlinedInput-root': {borderRadius: '16px'}}}
          InputProps={{startAdornment: (<InputAdornment position="start"><PersonOutlineIcon color="action" /></InputAdornment>)}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="location"
          label="Location"
          name="location"
          autoComplete="location"
          value={formData.location}
          onChange={handleChange}
          sx={{mb: 2, '& .MuiOutlinedInput-root': {borderRadius: '16px'}}}
          InputProps={{startAdornment: (<InputAdornment position="start"><LocationOnIcon color="action" /></InputAdornment>)}}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="phone"
          label="Contact Number"
          type="text"
          id="phone"
          autoComplete="phone"
          value={formData.phone}
          onChange={handleChange}
          sx={{mb: 2, '& .MuiOutlinedInput-root': {borderRadius: '16px'}}}
          InputProps={{startAdornment: (<InputAdornment position="start"><PhoneIcon color="action" /></InputAdornment>)}}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 2, mb: 2, py: 1.5, bgcolor: '#F50963', borderRadius: '25px', textTransform: 'none', fontWeight: 600, '&:hover': {bgcolor: '#d6085a'}}}
        >
          Save
        </Button>
      </Box>
      <SetAlert message={error} severity={constants.ERROR} open={showErrorAlert} />
      <SetAlert message={constants.PROFILE_UPDATE_SUCCESS} severity={constants.SUCCESS} open={showSuccessAlert} />
    </>
  );
}