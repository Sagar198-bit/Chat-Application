import { configureStore } from "@reduxjs/toolkit";
import AuthReducers from "./auth.slices/AuthSlices.js"
import ProtectedReducers from "./protected.routes.slice/Protected.Slice.js"
export const store = configureStore({
    reducer : {
        Auth: AuthReducers,
        Protected: ProtectedReducers,
    }
})