import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopulerMoviesList, handleMovieSearch } from '../redux/slices/moviesSlice'
import { getTvSeries, handleTVSearch } from '../redux/slices/tvSeriesSlice'

function useSearch(type, search) {
    const dispatch = useDispatch()
    const { moviesList, searchMovie } = useSelector(state => state.moviesList)
    const { tvSeriesList, searchTV } = useSelector(state => state.tvSeriesList)

    const [content, setContent] = useState()

    useEffect(() => {
        if (type === "movies") {
            dispatch(getPopulerMoviesList())
            if (search) {
                dispatch(handleMovieSearch(search))
            }
        } else if (type === "tv") {
            dispatch(getTvSeries())
            if (search) {
                dispatch(handleTVSearch(search))
            }
        }
    }, [dispatch, search, type])
    useEffect(() => {
        if (type === "movies") {
            setContent(moviesList)
            if (search) {
                setContent(searchMovie)
            }
        } else if (type === "tv") {
            setContent(tvSeriesList)
            if (search) {
                setContent(searchTV)
            }
        }
    }, [search, type, searchTV, searchMovie, moviesList, tvSeriesList])

    return ({ content })
}

export default useSearch