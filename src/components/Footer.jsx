import { Box, Button, Divider, IconButton } from '@mui/material'
import React from 'react'
import LogoWhite from '../svg/Logo_White.svg'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <Box sx={{height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', background: '#212121', width: '100%'}}>
      <Box component={Link} to="/" sx={{display: 'flex', alignItems: 'center', gap: 3, textDecoration: 'none'}}>
        <img src={LogoWhite} alt="Logo" style={{height: '30px'}}/>
        <Divider orientation="vertical" flexItem sx={{bgcolor: '#F50963', height: '24px'}}/>
        <Box component="span" sx={{color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px'}}>
          Copyright 2024
        </Box>
      </Box>
      <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
        <IconButton  sx={{color: 'rgba(255, 255, 255, 0.6)'}} size="medium">
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{color: 'rgba(255, 255, 255, 0.6)'}} size="medium">
          <XIcon />
        </IconButton>
        <IconButton  sx={{color: 'rgba(255, 255, 255, 0.6)'}} size="medium">
          <YouTubeIcon />
        </IconButton>
      </Box>
    </Box>
  )
}