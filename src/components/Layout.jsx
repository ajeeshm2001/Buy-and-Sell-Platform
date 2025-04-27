import { Container, Box } from '@mui/material';
import { Footer } from './Footer';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >     
     <Header />
      <Container sx={{ my: 4, flex: '1 0 auto' }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
