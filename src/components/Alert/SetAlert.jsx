import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const AlertBar = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const SetAlert = (props) => {
  return (
    <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={props.open}>
      <AlertBar severity={props.severity} sx={{ width: '100%' }}>
        {props.message}
      </AlertBar>
    </Snackbar>
  );
};
