import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes/Approutes'
import theme from './theme/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
