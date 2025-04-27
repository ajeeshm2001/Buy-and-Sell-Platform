import React from 'react';
import { Card, Typography, Box, Avatar, Button } from '@mui/material';
import constants from '../../shared/constants';

export const OwnerDetailsCard = ({ owner }) => {
  return (
    <>
    {owner.firstName &&
    <Card sx={{width: '323px', height: 'auto', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '24px'}}>
      <Typography variant="body2" sx={{fontSize: '14px', color: '#666', mb: 0.5}}>
      Owner Details
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Avatar src={owner.avatar || constants.SAMPLE_AVATAR} alt={owner.firstName + " " + owner.lastName} sx={{width: 104, height: 104, mt: 2, mb: 2}}/>
        <Typography variant="h6" sx={{fontSize: '20px', fontWeight: '600', mb: 3}}>
          {owner.firstName} {owner.lastName}
        </Typography>
      </Box>
    </Card>
    }
    </>
  );
};