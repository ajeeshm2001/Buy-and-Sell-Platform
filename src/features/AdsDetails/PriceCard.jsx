import React from 'react';
import { Card, Typography, Box } from '@mui/material';

export const PriceCard = ({ price }) => {
  return (
    <Card sx={{minWidth: '320px', height: '99px', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '16px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Typography variant="body2" sx={{fontSize: '14px', color: '#666', mb: 0.5}}>
        Price
      </Typography>
      <Typography variant="h4" sx={{fontSize: '36px', fontWeight: '700', color: '#F50963'}}>
        ${price}
      </Typography>
    </Card>
  );
};