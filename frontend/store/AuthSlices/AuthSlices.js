import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getme } from "../../src/api/authApi";

export const isAuthenticated = createAsyncThunk("Authenticated", async () => {
  const response = await getme();
  console.log(response)
  return response;
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