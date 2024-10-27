import { useEffect, useState } from "react"
import PopularCardsSlider from "../../common/PopularCardsSlider/PopularCardsSlider"
import useDetail from "../../hooks/useDetail"

function Detail() {
    const [width, setWidth] = useState(window.innerWidth)

    const { loading, detail, credits, video, similarList } = useDetail()

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
        })
    }, [])

    if (loading && detail) {
        return (
            <div className="w-full h-full items-center">
                <div
                    key={detail?.id}
                    className="flex justify-center items-center"
                    style={{
                        width: `100%`,
                        height: "100%",
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${detail?.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center"
                    }}
                >
                    <div className="flex md:flex-row md:justify-center md:gap-16 sm:gap-8 gap-0 sm:flex-col sm:items-center flex-col items-center w-full">
                        <img
                            src={`https://image.tmdb.org/t/p/original/${detail?.poster_path}`}
                            alt={detail?.title}
                            className="rounded-2xl mt-auto mb-auto"
                            style={{ width: `${width / 5}px`, height: "100%" }}
                        />
                        <div className="flex flex-col justify-center gap-4 md:w-4/6 w-full sm:w-full sm:items-center items-center ">
                            <span className="text-white font-bold text-4xl text-center mt-1">{detail?.original_title}</span>
                            <div className="flex gap-4 flex-wrap">
                                {detail?.genres && detail?.genres.map(d =>
                                    <span
                                        key={d.id}
                                        className="px-2 py-1.5 text-xs whitespace-nowrap font-semibold text-black border border-gray-200 rounded-2xl bg-transparent dark:text-gray-100 dark:border-gray-500"
                                    >
                                        {d?.name}
                                    </span>)}
                            </div>
                            <span className="md:flex text-white sm:hidden hidden line-clamp-4 max-h-52 overflow-auto overflow-x-hidden">{detail?.overview}</span>
                            <span className="text-white font-bold text-xl">Top Casts</span>
                            <div className="flex md:gap-4 sm:gap-2 gap-0">
                                {credits?.cast && credits?.cast.slice(0, 4).map(d =>
                                    <div
                                        key={d.id}
                                        className="flex flex-col w-20 gap-2 items-center"
                                    >
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${d.profile_path}`}
                                            alt={d?.name}
                                            className="rounded-md md:min-w-[70px] sm:min-w-[40px] sm:max-w-[40px] max-w-[40px]"
                                        />
                                        <span className="text-white whitespace-normal text-sm text-center">{d?.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {video?.results && <div className="flex flex-col items-center mt-12 gap-16">
                    <div className="flex flex-col gap-4">
                        <span className="text-white text-2xl">{video?.results[0]?.name}</span>
                        <iframe
                            title="trailer"
                            className="rounded-2xl md:min-w-[570px] md:min-h-[370px] sm:min-w-[500px] sm:min-h-[300px] min-h-[200px]"
                            src={`https://www.youtube.com/embed/${video?.results[0]?.key}?enablejsapi=1`}
                            allowFullScreen
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <span className="text-white text-2xl">{video?.results[1]?.name}</span>
                        <iframe
                            title="trailer"
                            className="rounded-2xl md:min-w-[570px] md:min-h-[370px] sm:min-w-[500px] sm:min-h-[300px] min-h-[200px]"
                            src={`https://www.youtube.com/embed/${video?.results[1]?.key}?enablejsapi=1`}
                            allowFullScreen
                        />
                    </div>
                </div>}
                <div className="flex justify-center">
                    <PopularCardsSlider data={similarList?.results} title="Similar movies" type="movie" />
                </div>
            </div>
        )
    } else {
        return ("Loading")
    }
}

export default Detail