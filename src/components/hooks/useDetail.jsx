import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMoviesCredits, getMoviesDetail, getMovieVideo, getSimilarMovies } from '../redux/slices/moviesSlice'
import { getSimilarTV, getTVCredits, getTVDetail, getTVVideo } from '../redux/slices/tvSeriesSlice'

function useDetail() {
    const { movieDetail, movieCredits, movieVideo, similarMoviesList } = useSelector(state => state.moviesList)
    const { tvDetail, tvCredits, tvVideo, similarTVList } = useSelector(state => state.tvSeriesList)

    const dispatch = useDispatch()
    const { type, id } = useParams()

    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState(null)
    const [credits, setCredits] = useState(null)
    const [video, setVideo] = useState(null)
    const [similarList, setSimilarList] = useState(null)

    useEffect(() => {
        setLoading(false)
        setDetail(null)
        setCredits(null)
        setVideo(null)
        setSimilarList(null)
        if (!loading) {
            if (type === "movie") {
                dispatch(getMoviesDetail(id))
                dispatch(getMoviesCredits(id))
                dispatch(getMovieVideo(id))
                dispatch(getSimilarMovies(id))
            } else if (type === "tv") {
                dispatch(getTVDetail(id))
                dispatch(getTVCredits(id))
                dispatch(getTVVideo(id))
                dispatch(getSimilarTV(id))
            }
        }
        setLoading(true)
    }, [dispatch, id, type, loading])

    useEffect(() => {
        if (type === "movie") {
            setDetail(movieDetail)
            setCredits(movieCredits)
            setVideo(movieVideo)
            setSimilarList(similarMoviesList)
        } else if (type === "tv") {
            setDetail(tvDetail)
            setCredits(tvCredits)
            setVideo(tvVideo)
            setSimilarList(similarTVList)
        }
    }, [movieDetail, movieCredits, movieVideo, similarMoviesList, tvDetail, tvCredits, tvVideo, similarTVList, type])
    return ({
        loading, detail, credits, video, similarList, setLoading, setDetail, setCredits, setVideo, setSimilarList
    })
}

export default useDetail