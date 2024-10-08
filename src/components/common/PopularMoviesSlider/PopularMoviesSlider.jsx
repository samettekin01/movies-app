import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMovieVideo, getPopulerMoviesList } from "../../redux/slices/moviesSlice"
import { setIsOpenFrame } from "../../redux/slices/statusSlice"
import { BsArrowLeftCircle, BsArrowRightCircle, BsX } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

function PopularMoviesSlider() {

    const [width, setWidth] = useState(window.innerWidth)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [style, setStyle] = useState({ transform: `translateX(0%)` })

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { moviesList, movieVideo } = useSelector(state => state.moviesList)
    const { isOpenFrame } = useSelector(state => state.status)

    const sliderLength = moviesList.results !== undefined && moviesList.results.length

    const handleLeft = () => {
        handleCloseVideo()
        setCurrentIndex((currentIndex - 1 + sliderLength) % sliderLength)
        setStyle(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex - 1 + sliderLength) % sliderLength * (100 / sliderLength)}%)`
        }))
    }

    const handleRight = () => {
        handleCloseVideo()
        setCurrentIndex((currentIndex + 1) % sliderLength)
        setStyle(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex + 1) % sliderLength * (100 / sliderLength)}%)`
        }))
    }

    const handleMovieVideo = id => {
        dispatch(setIsOpenFrame(true))
        dispatch(getMovieVideo(id))
    }
    const handleMovieDetail = id => {
        const path = `movie/${id}`
        navigate(path)
    }

    const handleCloseVideo = () => {
        dispatch(setIsOpenFrame(false))
    }

    useEffect(() => {
        dispatch(getPopulerMoviesList())
    }, [dispatch])

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
    })
    return (
        <div className="flex overflow-hidden w-full h-full">
            <div className="flex flex-row transition duration-500" style={style}>
                {moviesList.results ? moviesList.results.map(d =>
                    <div
                        key={d.id}
                        className="flex justify-center items-center"
                        style={{
                            width: `${width}px`,
                            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${d.backdrop_path})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center"
                        }}
                    >
                        <div className="flex gap-8">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${d.poster_path}`}
                                alt={d.title}
                                className="mr-auto ml-40 rounded-2xl"
                                style={{ width: `${width / 5}px` }}
                            />
                            <div className="flex flex-col justify-center items-center gap-4">
                                <span className="text-white font-bold text-4xl">{d.original_title}</span>
                                <span className="text-white">{d.overview}</span>
                                <div className="flex gap-4">
                                    <button
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-xl dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                        onClick={() => handleMovieVideo(d.id)}
                                    >Watch trailer</button>
                                    <button
                                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        onClick={() => handleMovieDetail(d.id)}
                                    >Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : ""}
            </div >
            {isOpenFrame ? movieVideo.results !== undefined &&
                <div className="absolute w-full h-full flex justify-center items-center">
                    <div>
                        <iframe
                            title="trailer"
                            width="570px"
                            height="370px"
                            className="rounded-2xl"
                            src={`https://www.youtube.com/embed/${movieVideo.results[0].key}?enablejsapi=1&autoplay=1`}
                            allowFullScreen
                        ></iframe>
                    </div>
                    <button
                        onClick={handleCloseVideo}
                        className="text-white text-4xl mb-auto mt-24 ">
                        <BsX />
                    </button>
                </div> : ""}
            <button className="absolute text-white text-4xl top-1/2 right-4 transform -translate-y-1/2" onClick={handleRight}><BsArrowRightCircle /></button>
            <button className="text-white text-4xl absolute top-1/2 left-4 transform -translate-y-1/2" onClick={handleLeft}><BsArrowLeftCircle /></button>
        </div >
    )
}

export default PopularMoviesSlider