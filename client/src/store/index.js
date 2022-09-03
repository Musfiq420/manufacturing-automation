import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux"; 
import { persistReducer } from 'redux-persist';
import accountSlice from './account-Slice.js';
import thunk from 'redux-thunk';
import machineDbSlice from './machineDbSlice.js';
import productionDbSlice from './productionDbSlice.js';


const reducers = combineReducers({
    account: accountSlice.reducer,   
    machinedb: machineDbSlice.reducer,
    productiondb: productionDbSlice.reducer
 });



 const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);



// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk]
// });
// export default store;


export default persistedReducer;