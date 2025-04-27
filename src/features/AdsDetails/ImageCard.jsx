import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Button, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import moment from 'moment';
import { DescriptionCard } from './DescriptionCard';
import { PriceCard } from './PriceCard';
import { OwnerDetailsCard } from './OwnerDetailsCard';
import { getAdvertisementDetails } from '../../services/advertisementService';
import { useParams } from 'react-router-dom';
import constants from '../../shared/constants';
import { setAlertTimer } from '../../helper/alertHelper';
import { Loader } from '../../components/Loader/Loader';
import { SetAlert } from '../../components/Alert/SetAlert';


export const ImageCard = () => {
  const { id } = useParams();
  const [adDetails, setAdDetails] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAdvertisementDetails();
    }
  }, [id]);

  const fetchAdvertisementDetails = async () => {
    setIsLoading(true);
    try {
      const response = await getAdvertisementDetails(id);
      if (response?.data) {
        setAdDetails(response.data);
      }
      setIsLoading(false);
    } catch (err) {
      setAlertTimer(setShowErrorAlert);
      setError(err?.response?.data?.error?.message || 'Failed to fetch advertisement details');
      setIsLoading(false);
    }
  };


  if (!adDetails) {
    return null;
  }

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Box sx={{display: 'flex', gap: 3}}>
          <Card sx={{minWidth: '948px', height: '678px', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '30px 40px'}}>
            <Typography variant="h5" sx={{fontSize: '24px', fontWeight: '600', mb: 4}}>
              {adDetails.title}
            </Typography>
            <Box sx={{width: '866px', height: '498px', mb: 3, borderRadius: '8px', overflow: 'hidden', position: 'relative'}}>
              <Box component="img" src={adDetails.image} alt={adDetails.title} sx={{width: '100%', height: '100%', objectFit: 'cover'}}/>
            </Box>
          </Card>
          <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            <PriceCard price={adDetails.price}/>
            <OwnerDetailsCard owner={adDetails.owner}/>
          </Box>
        </Box>
        <DescriptionCard description={adDetails.description}/>
      </Box>
      <SetAlert message={error} severity={constants.ERROR} open={showErrorAlert} />
    </>
  );
};