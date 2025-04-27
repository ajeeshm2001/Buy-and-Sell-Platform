import { Box, Button, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { createAdvertisement } from '../services/advertisementService';
import { Loader } from '../components/Loader/Loader';
import { setAlertTimer } from '../helper/alertHelper';
import { SetAlert } from '../components/Alert/SetAlert';
import constants from '../shared/constants';

export const PostAds = () => {
  const initialFormData = {
    title: '',
    description: '',
    image: '',
    price: ''
  }
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
      const response = await createAdvertisement(formData);
      if (response?.data) {
        setAlertTimer(setShowSuccessAlert);
      }
      setFormData(initialFormData)
      setIsLoading(false);
    } catch (err) {
      setAlertTimer(setShowErrorAlert);
      setError(err?.response?.data?.error?.message || 'Failed to post advertisement');
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
          id="title"
          label="Ad Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><TitleIcon color="action" /></InputAdornment>) }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline={true}
          rows={4}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="image"
          label="Image URL"
          name="image"
          value={formData.image}
          onChange={handleChange}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><CollectionsIcon color="action" /></InputAdornment>) }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><AttachMoneyIcon color="action" /></InputAdornment>) }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, py: 1.5, bgcolor: '#F50963', borderRadius: '25px', textTransform: 'none', fontWeight: 600, '&:hover': { bgcolor: '#d6085a' } }}
        >
          Post
        </Button>
      </Box>
      <SetAlert message={error} severity={constants.ERROR} open={showErrorAlert} />
      <SetAlert message={constants.CREATE_ADVERTISEMENT_SUCCESS} severity={constants.SUCCESS} open={showSuccessAlert} />
    </>
  );
};