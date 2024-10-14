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

export const getTVVideo = createAsyncThunk("tvVideo", async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (TV Video)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getTVDetail = createAsyncThunk("detail", async id => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (TV Detail)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getTVCredits = createAsyncThunk("credits", async id => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (TV Credits)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getSimilarTV = createAsyncThunk("similar", async id => {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (TV Credits)")
        }
    } catch (e) {
        console.log(e)
    }
})


export const tvSeriesSlice = createSlice({
    name: "tvSeries",
    initialState: {
        tvSeriesList: [],
        topRatedTvSeriesList: [],
        tvVideo: [],
        tvDetail: [],
        tvCredits: [],
        similarTVList: []
    },
    extraReducers: builder => {
        builder.addCase(getTvSeries.fulfilled, (state, action) => {
            state.tvSeriesList = action.payload
        })
        builder.addCase(getTopRatedTvSeries.fulfilled, (state, action) => {
            state.topRatedTvSeriesList = action.payload
        })
        builder.addCase(getTVVideo.fulfilled, (state, action) => {
            state.tvVideo = action.payload
        })
        builder.addCase(getTVDetail.fulfilled, (state, action) => {
            state.tvDetail = action.payload
        })
        builder.addCase(getTVCredits.fulfilled, (state, action) => {
            state.tvCredits = action.payload
        })
        builder.addCase(getSimilarTV.fulfilled, (state, action) => {
            state.similarTVList = action.payload
        })
    }
}).reducer