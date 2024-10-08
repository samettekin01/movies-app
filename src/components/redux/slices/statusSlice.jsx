import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
    name: "status",
    initialState: {
        isOpenFrame: false
    },
    reducers: {
        setIsOpenFrame: (state, action) => {
            state.isOpenFrame = action.payload
        }
    }
})

export const { setIsOpenFrame } = statusSlice.actions
export default statusSlice.reducer