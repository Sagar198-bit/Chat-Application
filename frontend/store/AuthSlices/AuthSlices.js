import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {getme} from "../../src/api/authApi";
import {Socket} from "../../src/socket/socket.js";

export const isAuthenticated = createAsyncThunk("Authenticated", async () => {
    "Authenticated",

        async () => {
            const response = await getme();
            if (response.status === 200) {
                Socket()
            }
            return response.data;
        },
        {
            condition: (_, {getState}) => {
                const status = getState().auth.status;
                if (status === "loading" || status === "succeeded") {
                    return false; // ← Stops before even hitting backend
                }

            }
        }
});

const initialState = {
    data: [],
    status: "idle",
    error: null,
};

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(isAuthenticated.pending, (state) => {
                state.status = "loading";
            })
            .addCase(isAuthenticated.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(isAuthenticated.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            });
    },
});
export default AuthSlice.reducer