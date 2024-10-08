import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../../../utils/config";

export const getTvSeries = createAsyncThunk("tvSeries", async () => {
    const response = await fetch("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1", options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (TV Series)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getTopRatedTvSeries = createAsyncThunk("topRatedTVSeries", async () => {
    const response = await fetch("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1", options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (TV Series)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const tvSeriesSlice = createSlice({
    name: "tvSeries",
    initialState: {
        tvSeriesList: [],
        topRatedTvSeriesList: []
    },
    extraReducers: builder => {
        builder.addCase(getTvSeries.fulfilled, (state, action) => {
            state.tvSeriesList = action.payload
        })
        builder.addCase(getTopRatedTvSeries.fulfilled, (state, action) => {
            state.topRatedTvSeriesList = action.payload
        })
    }
}).reducer