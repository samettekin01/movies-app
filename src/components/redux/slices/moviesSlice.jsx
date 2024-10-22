import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { options } from "../../../utils/config";

export const getPopulerMoviesList = createAsyncThunk("moviesList", async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page ? page : 1}&sort_by=popularity.desc`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (Movies List)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getMovieVideo = createAsyncThunk("movieVideo", async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (Movie Video)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getTopRatedMovies = createAsyncThunk("topRated", async () => {
    const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (Top Rated Movie)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getMoviesDetail = createAsyncThunk("detail", async id => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (Movie Detail)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getMoviesCredits = createAsyncThunk("credits", async id => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (Movie Credits)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const getSimilarMovies = createAsyncThunk("similar", async id => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options)
    try {
        if (response.ok) {
            return response.json()
        } else {
            console.log("Promise resolved but HTTP status failed (Movie Credits)")
        }
    } catch (e) {
        console.log(e)
    }
})

export const handleMovieSearch = createAsyncThunk("searchMovie", async ({ query, page }) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
    try {
        if (response.ok) {
            return response.json()
        }
    } catch (e) {
        console.log("Promise resolved but HTTP status failed (Movie Search)")
    }
})

export const moviesSlices = createSlice({
    name: "movies",
    initialState: {
        moviesList: [],
        topRatedMoviesList: [],
        movieVideo: [],
        movieDetail: [],
        movieCredits: [],
        similarMoviesList: [],
        searchMovie: []
    },
    extraReducers: builder => {
        builder.addCase(getPopulerMoviesList.fulfilled, (state, action) => {
            state.moviesList = action.payload
        })
        builder.addCase(getMovieVideo.fulfilled, (state, action) => {
            state.movieVideo = action.payload
        })
        builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
            state.topRatedMoviesList = action.payload
        })
        builder.addCase(getMoviesDetail.fulfilled, (state, action) => {
            state.movieDetail = action.payload
        })
        builder.addCase(getMoviesCredits.fulfilled, (state, action) => {
            state.movieCredits = action.payload
        })
        builder.addCase(getSimilarMovies.fulfilled, (state, action) => {
            state.similarMoviesList = action.payload
        })
        builder.addCase(handleMovieSearch.fulfilled, (state, action) => {
            state.searchMovie = action.payload
        })
    }
}).reducer