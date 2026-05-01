import { configureStore } from "@reduxjs/toolkit";
import AuthReducers from "../store/AuthSlices/AuthSlices.js"
export const store = configureStore({
    reducer : {
        Auth: AuthReducers
    }
})