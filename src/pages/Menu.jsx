import React, { useEffect, useState } from 'react';
import {Box,Card,List,ListItem,ListItemText} from '@mui/material';
import { EditProfile } from './EditProfile';
import { PostAds } from './PostAds';
import { Ads } from './Ads';
import { MyAccount } from './MyAccount';
import { Logout } from './Logout';
import { useLocation, useNavigate } from 'react-router-dom';

export const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const menuItems = [
    { name: "My Account", path: "/myaccount" },
    { name: "Profile", path: '/profile' },
    { name: "Ads", path: '/myads' },
    { name: "Post Ads", isPrimary: true, path: '/postads' },
    { name: "Logout" }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const index = menuItems.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setValue(index);
    }
  }, [location.pathname]);

  const handleChange = (newValue) => {
    if (newValue === 4) {
      setOpenLogoutDialog(true);
    } else {
      setValue(newValue);
      navigate(menuItems[newValue].path);
    }
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <Box sx={{display: 'flex', gap: 5, alignItems: 'flex-start'}}>
      <Card sx={{minWidth: '306px', height: '885px', borderRadius: '12px', boxShadow: '0 0 40px rgba(0,0,0,0.1)'}}>
        <List sx={{width: '100%', padding: 0, mt: 5}}>
          {menuItems.map((item, index) => (
            <ListItem key={index} onClick={() => handleChange(index)} sx={{width: '256px', height: '53px', margin: '10px auto 10px auto', borderRadius: '44px', backgroundColor: value === index ? 'black' : 'white', color: value === index ? 'white' : item.isPrimary ? '#F50963' : 'black', cursor: 'pointer', '&:hover': {backgroundColor: value === index ? 'black' : '#f5f5f5'}, transition: 'all 0.2s ease-in-out', paddingLeft: '20px'}}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Card>
      <Logout open={openLogoutDialog} onClose={handleLogoutCancel} onConfirm={handleLogoutConfirm}/>
      {value === 1 &&
        <Card sx={{width: '966px', height: '885px', borderRadius: '12px', boxShadow: '0 0 40px rgba(0,0,0,0.1)', display: 'flex', padding: '80px'}}>
          <EditProfile />
        </Card>
      }
      {value === 2 &&
        <Ads />
      }
      {value === 3 &&
        <Card sx={{width: '966px', height: '885px', borderRadius: '12px', boxShadow: '0 0 40px rgba(0,0,0,0.1)', display: 'flex', padding: '80px'}}>
          <PostAds />
        </Card>
      }
      {value === 0 &&
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
          <MyAccount />
          <Ads />
        </Box>
      }
    </Box>
  );
};