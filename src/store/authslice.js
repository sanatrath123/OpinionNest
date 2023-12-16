import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
 status: false,
 UserData: null
}

export const AuthSlice = createSlice({
    Name: "Auth",
    initialstate,

    reducers: {
        login: (state , action)=>{
            state.status= true
            state.UserData = action.payload
        }

        logout: (state , action)=>{
            state.status= false
            state.UserData=null
        }
    }
})