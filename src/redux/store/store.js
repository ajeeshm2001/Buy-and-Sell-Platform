import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../reducers/userReducer';


const persistConfig = {
    key: 'root',
    storage
  };
  

const persistedUserReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
  },
});

export const persistor = persistStore(store);