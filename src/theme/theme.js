import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif"
  },
  palette: {
    primary: {
      main: '#F50963',
    },
    secondary: {
        main: '#212121'
    }
  },
});

export default theme;