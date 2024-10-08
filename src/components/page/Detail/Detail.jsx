import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMoviesCredits, getMoviesDetail, getMovieVideo, getSimilarMovies } from "../../redux/slices/moviesSlice"
import { useParams } from "react-router-dom"
import PopularCardsSlider from "../../common/PopularCardsSlider/PopularCardsSlider"

function Detail() {
    const dispatch = useDispatch()
    const { movieDetail, movieCredits, movieVideo, similarMoviesList } = useSelector(state => state.moviesList)
    const { id } = useParams()
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        dispatch(getMoviesDetail(id))
        dispatch(getMoviesCredits(id))
        dispatch(getMovieVideo(id))
        dispatch(getSimilarMovies(id))
    }, [dispatch, id])

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
    }, [])
    return (
        <div className="w-full h-full items-center">
            <div
                key={movieDetail.id}
                className="flex justify-center items-center"
                style={{
                    width: `100%`,
                    height: "100%",
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }}
            >
                <div className="flex justify-center gap-16">
                    <img
                        src={`https://image.tmdb.org/t/p/original/${movieDetail.poster_path}`}
                        alt={movieDetail.title}
                        className="rounded-2xl mt-auto mb-auto"
                        style={{ width: `${width / 5}px`, height: "100%" }}
                    />
                    <div className="flex flex-col justify-center gap-4 w-2/6">
                        <span className="text-white font-bold text-4xl">{movieDetail.original_title}</span>
                        <div className="flex gap-4 flex-wrap">
                            {movieDetail.genres && movieDetail.genres.map(d =>
                                <span
                                    key={d.id}
                                    className="px-2 py-1.5 text-xs whitespace-nowrap font-semibold text-black border border-gray-200 rounded-2xl bg-transparent dark:text-gray-100 dark:border-gray-500"
                                >
                                    {d.name}
                                </span>)}
                        </div>
                        <span className="text-white">{movieDetail.overview}</span>
                        <span className="text-white font-bold text-xl">Top Casts</span>
                        <div className="flex gap-4">
                            {movieCredits.cast && movieCredits.cast.slice(0, 4).map(d =>
                                <div
                                    key={d.id}
                                    className="flex flex-col w-20 gap-2 items-center"
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${d.profile_path}`}
                                        alt={d.name}
                                        className="rounded-md min-w-[70px]"
                                    />
                                    <span className="text-white whitespace-normal text-sm text-center">{d.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {movieVideo.results && <div className="flex flex-col items-center mt-12 gap-16">
                <div className="flex flex-col gap-4">
                    <span className="text-white text-2xl">{movieVideo.results[0].name}</span>
                    <iframe
                        title="trailer"
                        width="570px"
                        height="370px"
                        className="rounded-2xl"
                        src={`https://www.youtube.com/embed/${movieVideo.results[0].key}?enablejsapi=1&autoplay=1`}
                        allowFullScreen
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <span className="text-white text-2xl">{movieVideo.results[1].name}</span>
                    <iframe
                        title="trailer"
                        width="570px"
                        height="370px"
                        className="rounded-2xl"
                        src={`https://www.youtube.com/embed/${movieVideo.results[1].key}?enablejsapi=1&autoplay=1`}
                        allowFullScreen
                    />
                </div>
            </div>}
            <PopularCardsSlider data={similarMoviesList.results} title="Similar movies" type="movie"/>
        </div>
    )
}

export default Detail