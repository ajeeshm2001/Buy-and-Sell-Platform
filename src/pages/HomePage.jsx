import React from 'react';
import { Box, Typography } from '@mui/material';
import bannerImageMain from '../svg/Banner_Image_Main.svg';
import bannerImageSecondary from '../svg/Banner_Image_Secondary.svg';
import bannerImageHighlight from '../svg/Banner_Image_Highlight.svg';
import { AdvertisementList } from './AdvertisementList';

export const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          minHeight: '600px',
          backgroundColor: '#ffffff',
        }}
      >
        <Box sx={{ flex: 1, minWidth: '50%', mr: 7 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '70px',
              fontWeight: 600,
              lineHeight: 1.2,
              color: '#000000'
            }}
          >
            Get daily thing in same platform
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: '314px',
              height: '500px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            <Box
              component="img"
              src={bannerImageMain}
              alt="Product showcase 1"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                width: '300px',
                height: '190px',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={bannerImageSecondary}
                alt="Product showcase 2"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>

            <Box
              sx={{
                width: '300px',
                height: '300px',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={bannerImageHighlight}
                alt="Product showcase 3"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <AdvertisementList />
    </Box>
  );
};