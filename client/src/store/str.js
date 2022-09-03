import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './index';

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
  });
  
export default store;