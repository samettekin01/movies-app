import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPopulerMoviesList, getTopRatedMovies } from "../../redux/slices/moviesSlice"
import PopularCardsSlider from "../PopularCardsSlider/PopularCardsSlider"

function PopulerMoviesCards() {

    const dispatch = useDispatch()

    const { moviesList, topRatedMoviesList } = useSelector(state => state.moviesList)


    useEffect(() => {
        dispatch(getPopulerMoviesList())
        dispatch(getTopRatedMovies())
    }, [dispatch])

    return (
        <div className="flex flex-col items-center">
            <PopularCardsSlider data={moviesList.results} title="Popular movies" type="movie"/>
            <PopularCardsSlider data={topRatedMoviesList.results} title="Top rated movies" type="movie"/>
        </div>
    )
}

export default PopulerMoviesCards