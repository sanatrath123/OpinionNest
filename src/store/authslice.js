import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: undefined
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state, action) => {
            
            state.status = true;
            state.userData = action.payload;
            
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;