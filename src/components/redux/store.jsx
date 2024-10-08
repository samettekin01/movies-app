import { configureStore } from "@reduxjs/toolkit";
import { moviesSlices } from "./slices/moviesSlice";
import { tvSeriesSlice } from "./slices/tvSeriesSlice";
import statusSlice from "./slices/statusSlice";

export const store = configureStore({
    reducer: {
        moviesList: moviesSlices,
        tvSeriesList: tvSeriesSlice,
        status: statusSlice
    }
})