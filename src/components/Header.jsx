import { Box, Button, Container } from '@mui/material'
import React from 'react'
import Logo from '../svg/Logo.svg'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Header = () => {
  const {user} = useSelector((state) => state.user)

  return (
    <Box sx={{height: '80px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', width: '100%'}}>
      <Box component={Link} to="/" sx={{display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
        <img src={Logo} alt="Logo" style={{height: '30px'}}/>
      </Box>
      <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
        <Button component={Link} to={user ? '/myaccount' : '/login'} variant="text" size="small" color='secondary' startIcon={<Person2OutlinedIcon />} sx={{fontSize: 14, textTransform: 'none'}}>
          {user ? user.username : 'Sign In'}
        </Button>
        <Button component={Link} to={user ? '/postads' : '/login'} variant="contained" size="small" color="primary" sx={{width: '160px', height: '40px', borderRadius: '25px', background: '#F50963', textTransform: 'none'}} endIcon={<ArrowRightAltIcon />}>
          Post Your Ad
        </Button>
      </Box>
    </Box>
  )
}