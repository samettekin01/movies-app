import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopulerMoviesList, handleMovieSearch } from '../redux/slices/moviesSlice'
import { getTvSeries, handleTVSearch } from '../redux/slices/tvSeriesSlice'

function useSearch(type) {
    const dispatch = useDispatch()
    const { moviesList, searchMovie } = useSelector(state => state.moviesList)
    const { tvSeriesList, searchTV } = useSelector(state => state.tvSeriesList)

    const [search, setSearch] = useState("")
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (type === "movies") {
            dispatch(getPopulerMoviesList(page))
            if (search) {
                dispatch(handleMovieSearch({ query: search, page: page }))
            }
        } else if (type === "tv") {
            dispatch(getTvSeries(page))
            if (search) {
                dispatch(handleTVSearch({ query: search, page: page }))
            }
        }
    }, [dispatch, search, type, page])

    useEffect(() => {
        if (type === "movies") {
            const newResults = search ? searchMovie?.results : moviesList?.results
            if (newResults) {
                setContent(prev => {
                    const results = newResults.filter(item => !prev.some(prevItem => prevItem.id === item.id))
                    return page === 1 ? results : [...prev, ...results]
                })
            }
        } else if (type === "tv") {
            const newResults = search ? searchTV?.results : tvSeriesList?.results
            if (newResults) {
                setContent(prev => {
                    const results = newResults.filter(item => !prev.some(prevItem => prevItem.id === item.id))
                    return page === 1 ? results : [...prev, ...results]
                })
            }
        }
    }, [moviesList, searchMovie, searchTV, tvSeriesList, page, search, type])

    useEffect(() => {
        setContent([])
        setPage(1)
        window.scrollTo(0, 0)
    }, [type,search])

    return { content, setPage, setSearch }
}

export default useSearch
