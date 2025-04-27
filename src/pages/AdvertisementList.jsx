import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, Grid, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getAdvertisementList } from '../services/advertisementService';
import { Loader } from '../components/Loader/Loader';
import { SetAlert } from '../components/Alert/SetAlert';
import { setAlertTimer } from '../helper/alertHelper';
import constants from '../shared/constants';
import { useNavigate } from 'react-router-dom';

export const AdvertisementList = () => {
  const navigate = useNavigate();
  const [advertisements, setAdvertisements] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await getAdvertisementList();
      if (response?.data) {
        setAdvertisements(response.data);
      }
      setIsLoading(false);
    } catch (err) {
      setAlertTimer(setShowErrorAlert);
      setError(err?.response?.data?.error?.message || 'Failed to fetch advertisements');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ padding: '60px 80px' }}>
        <Box sx={{ textAlign: 'center', mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Typography sx={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, color: '#F50963', mb: 1 }}>
            WHAT'S NEW
          </Typography>
          <Typography sx={{ fontSize: '50px', fontWeight: 600, color: '#000' }}>
            Fresh Recommendations
          </Typography>
        </Box>

        <Typography sx={{ fontSize: '24px', fontWeight: 500, mb: 3 }}>
          <span style={{ color: '#F50963' }}>{advertisements.length}</span> items
        </Typography>

        <Grid container spacing={3}>
          {advertisements.map((ad) => (
            <Grid item xs={3} sm={6} md={4} lg={3} xl={3} key={ad.id}>
              <Card sx={{ width: '296px', height: '380px', borderRadius: '14px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer', '&:hover': { boxShadow: '0 6px 16px rgba(0,0,0,0.15)' } }}>
                <Box sx={{ width: '296px', height: '217px', overflow: 'hidden' }}>
                  <Box component="img" src={ad.image} alt={ad.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Box sx={{ padding: '16px' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#000' }}>
                    {ad.title}
                  </Typography>
                  <Typography sx={{ fontSize: '14px', color: '#666', mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {ad.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#F50963' }}>
                      ${ad.price}
                    </Typography>
                    <IconButton
                      onClick={() => navigate(`/advertisementdetails/${ad.id}`)}
                      sx={{ p: 0 }}>
                      <VisibilityIcon sx={{ fontSize: '20px', color: '#666' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <SetAlert message={error} severity={constants.ERROR} open={showErrorAlert} />
    </>
  );
};