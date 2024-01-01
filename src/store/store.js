import {configureStore} from "@reduxjs/toolkit"
import  AuthSlice  from "./authslice"
   const store = configureStore({
    reducer: {
        Auth: AuthSlice
    }
 })
 export default store
 


