import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/reducers/userReducer';

export const Logout = ({ open, onClose, onConfirm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
    onConfirm();
    navigate('/login');
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="logout-dialog-title" aria-describedby="logout-dialog-description" PaperProps={{sx: {width: '400px', minHeight: '200px', borderRadius: '12px', padding: '10px'}}}>
      <DialogTitle id="logout-dialog-title" sx={{fontSize: '22px', fontWeight: 600}}>
        Confirm Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description" sx={{fontSize: '16px'}}>
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{padding: '16px 24px'}}>
        <Button onClick={onClose} sx={{color: 'black', textTransform: 'none', fontWeight: 500, fontSize: '15px', borderRadius: '8px', padding: '8px 16px'}}>
          Cancel
        </Button>
        <Button onClick={handleLogout} variant="contained" sx={{bgcolor: '#F50963', '&:hover': {bgcolor: '#d6085a'}, textTransform: 'none', fontWeight: 500, fontSize: '15px', borderRadius: '8px', padding: '8px 16px'}} autoFocus>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};