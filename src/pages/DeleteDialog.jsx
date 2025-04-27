import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export const DeleteDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description" PaperProps={{sx: {width: '400px', minHeight: '200px', borderRadius: '12px', padding: '10px'}}}>
      <DialogTitle id="delete-dialog-title" sx={{fontSize: '22px', fontWeight: 600}}>
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description" sx={{fontSize: '16px'}}>
          Are you sure you want to delete this advertisement?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{padding: '16px 24px'}}>
        <Button onClick={onClose} sx={{color: 'black', textTransform: 'none', fontWeight: 500, fontSize: '15px', borderRadius: '8px', padding: '8px 16px'}}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" sx={{bgcolor: '#F50963', '&:hover': {bgcolor: '#d6085a'}, textTransform: 'none', fontWeight: 500, fontSize: '15px', borderRadius: '8px', padding: '8px 16px'}} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};