import { Box, Button, Card, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { deleteAdvertisement, getAdvertisementList } from '../services/advertisementService';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useSelector } from 'react-redux';
import { Loader } from '../components/Loader/Loader';
import { SetAlert } from '../components/Alert/SetAlert';
import { setAlertTimer } from '../helper/alertHelper';
import constants from '../shared/constants';
import { Link } from 'react-router-dom';
import { DeleteDialog } from './DeleteDialog';

export const Ads = () => {
  const { user } = useSelector((state) => state.user);
  const [ads, setAds] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAdId, setSelectedAdId] = useState(null);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await getAdvertisementList();
      if (response?.data) {
        const userAds = response.data.filter(ad => ad.owner.id === user?.id);
        setAds(userAds);
      }
      setIsLoading(false);
    } catch (err) {
      setAlertTimer(setShowErrorAlert);
      setError(err?.response?.data?.error?.message || 'Failed to fetch advertisements');
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedAdId(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAdId) {
      setIsLoading(true);
      try {
        await deleteAdvertisement(selectedAdId);
        setAlertTimer(setShowSuccessAlert);
        fetchAdvertisements(); // Refresh the list after deletion
        setOpenDeleteDialog(false);
      } catch (err) {
        setAlertTimer(setShowErrorAlert);
        setError(err?.response?.data?.error?.message || 'Failed to delete advertisement');
        setIsLoading(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setSelectedAdId(null);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box>
        {ads.map((ad) => (
          <Card key={ad.id} sx={{width: '966px', height: '205px', borderRadius: '12px', mb: 2, display: 'flex', alignItems: 'center', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
            <Box component="img" src={ad.image || "/api/placeholder/150/165"} alt={ad.title} sx={{width: '150px', height: '165px', borderRadius: '12px', objectFit: 'cover'}}/>
            <Box sx={{ml: 3, flexGrow: 1}}>
              <Typography variant="h6" sx={{fontSize: '20px', fontWeight: '600', mb: 1}}>
                {ad.title}
              </Typography>
              <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                {user.location && (
                  <>
                    <LocationOnIcon sx={{color: '#666', mr: 0.5, fontSize: '20px'}}/>
                    <Typography variant="body2" sx={{fontSize: '15px', color: '#666'}}>
                      {user.location}
                    </Typography>
                  </>
                )}
              </Box>
              <Typography variant="h5" sx={{fontSize: '24px', fontWeight: '700', color: '#F50963'}}>
                ${ad.price}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', gap: 2, alignSelf: 'flex-start'}}>
              <Button component={Link} to={`/advertisementdetails/${ad.id}`} variant="outlined" sx={{borderRadius: '24px', textTransform: 'none', color: '#212121', border: '0.5px solid #212121', width: '80px', height: '32px'}} >
                View 
              </Button>
              <Button variant="contained" sx={{borderRadius: '24px', bgcolor: '#F50963', '&:hover': {bgcolor: '#d6085a'}, textTransform: 'none', width: '80px', height: '32px'}} onClick={() => handleDeleteClick(ad.id)}>
                Delete
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
      <DeleteDialog 
        open={openDeleteDialog}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <SetAlert message={error} severity={constants.ERROR} open={showErrorAlert} />
      <SetAlert message={constants.DELETE_SUCCESS} severity={constants.SUCCESS} open={showSuccessAlert} />
    </>
  );
};