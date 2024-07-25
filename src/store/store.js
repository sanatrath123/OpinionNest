import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authslice';
import darkslice from './darkmode'
const store = configureStore({
    reducer: {
        auth : authSlice,
        theme: darkslice
    }
});


export default store;
 


