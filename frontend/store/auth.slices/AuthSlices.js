import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {getme} from "../../src/api/auth.api.js";
import {Socket} from "../../src/socket/socket.js";

export const isAuthenticated = createAsyncThunk(
    "Authenticated",

    async () => {
        const response = await getme();

        const{name , _id} = response?.data.data


        if (response.status === 200) {

            Socket(name , _id);


        }

        return response.data;
    },

    {
        condition: (_, { getState }) => {
            const status = getState()?.auth?.status;

            if (status === "loading" || status === "succeeded") {
                return false;
            }

            return true;
        }
    }
);

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