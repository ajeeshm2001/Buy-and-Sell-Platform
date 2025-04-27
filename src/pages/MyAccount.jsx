import React, { useState } from 'react';
import { Box, Button, Card, Typography, Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import constants from '../shared/constants';
import { useSelector } from 'react-redux';

export const MyAccount = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Card sx={{width: '966px', height: '180px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', padding: '24px'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Avatar src={user?.avatar || constants.SAMPLE_AVATAR} alt={`${user?.firstName} ${user?.lastName}`} sx={{width: 65, height: 65}}/>
          <Box sx={{ml: 2}}>
            <Typography variant="h6" sx={{fontSize: '20px', fontWeight: '600'}}>
              {`${user?.firstName || ''} ${user?.lastName || ''}`}
            </Typography>
          </Box>
        </Box>
        <Button component={Link} to={'/profile'} variant="outlined" sx={{borderRadius: '24px', textTransform: 'none', color: 'black', borderColor: 'black', height: 'fit-content', '&:hover': {borderColor: 'black', backgroundColor: 'rgba(0, 0, 0, 0.04)'}}}>
          Edit Profile
        </Button>
      </Box>
      <Box sx={{display: 'flex', gap: 4}}>
        {user?.location && (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <LocationOnIcon sx={{color: '#666', mr: 1}}/>
            <Typography variant="body2" sx={{fontSize: '15px'}}>
              {user.location}
            </Typography>
          </Box>
        )}
        {user?.email && (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <EmailIcon sx={{color: '#666', mr: 1}}/>
            <Typography variant="body2" sx={{fontSize: '15px'}}>
              {user.email}
            </Typography>
          </Box>
        )}
        {user?.phone && (
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <PhoneIcon sx={{color: '#666', mr: 1}}/>
            <Typography variant="body2" sx={{fontSize: '15px'}}>
              {user.phone}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};