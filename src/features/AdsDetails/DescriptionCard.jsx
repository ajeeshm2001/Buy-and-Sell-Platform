import React from 'react';
import { Card, Typography, Box } from '@mui/material';

export const DescriptionCard = ({ description }) => {
  return (
    <Card sx={{maxWidth: '948px', height: 'auto', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '30px 40px'}}>
      <Typography variant="h5" sx={{fontSize: '24px', fontWeight: '600', mb: 3}}>
        Overview
      </Typography>
      <Typography variant="body1" sx={{fontSize: '16px', color: '#333', lineHeight: 1.6}}>
        {description}
      </Typography>
    </Card>
  );
};