import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
    name: "status",
    initialState: {
        isOpenFrame: false,
        isDragging: false,
        isClickedAfterDrag: false
    },
    reducers: {
        setIsOpenFrame: (state, action) => {
            state.isOpenFrame = action.payload
        },
        setIsDragging: (state, action) => {
            state.isDragging = action.payload
        }
    }
})

export const { setIsOpenFrame, setIsDragging } = statusSlice.actions
export default statusSlice.reducer