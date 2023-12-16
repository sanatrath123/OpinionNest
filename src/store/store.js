import {configureStore} from "@reduxjs/toolkit"
import { AuthSlice } from "./authslice"
export const store = configureStore({
    reducer: {
        AuthSlice
    }
})