import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    status: false
}

export const protectedSlices = createSlice({
    name: "protected",
    initialState,
    reducers: {
        setProtectedData: (state , action) => {
            state.status= action.payload
        }
    }
})
export const {setProtectedData} = protectedSlices.actions
export default protectedSlices.reducer