import { createSlice } from "@reduxjs/toolkit";
import authslice from "./authslice";

const initialState = {
    mode:'dark'
}

const darkSlice = createSlice({

    name:"theme",
    initialState,
    reducers:{
        changeMode:(state , action)=>{
            state.mode = action.payload == 'dark' ? 'light' :'dark'
        }
    } 
})

export const {changeMode} = darkSlice.actions

export default darkSlice.reducer