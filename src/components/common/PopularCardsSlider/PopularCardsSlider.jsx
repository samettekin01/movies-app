import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs"
import MTCards from "../MTCards/MTCards"

function PopularCardsSlider({ data, title, type }) {
    const [translateX, setTranslateX] = useState({ transform: "translateX(0px)" })

    const { moviesList } = useSelector(state => state.moviesList)

    const [slideCount, setSlideCount] = useState(Math.round(window.innerWidth / 240))
    const [width, setWidth] = useState(window.innerWidth)
    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderLength = moviesList.results !== undefined && moviesList.results.length

    const handleRight = () => {
        setCurrentIndex((currentIndex + slideCount) % sliderLength)
        setTranslateX(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex + slideCount) % sliderLength * (100 / sliderLength)}%)`
        }))
    }
    const handleLeft = () => {
        setCurrentIndex((currentIndex - slideCount + sliderLength) % sliderLength)
        setTranslateX(prevStyle => ({
            ...prevStyle,
            transform: `translateX(-${(currentIndex - slideCount + sliderLength) % sliderLength * (100 / sliderLength)}%)`
        }))
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
            setSlideCount(Math.round(window.innerWidth / 240))
        })
    })
    return (
        <div className="mt-12 p-5">
            <div className="mb-5">
                <span className="text-xl font-bold text-white">{title}</span>
                <div className="mt-1 border-2 border-red-600 rounded-2xl w-24"></div>
            </div>
            <div className="relative overflow-hidden z-0 flex items-center " style={{ width: `${width / 1.2}px`, height: `100%` }}>
                <div className="flex z-0 duration-500 ease-out" style={translateX}>
                    {data ? data.map(d =>
                        <MTCards key={d.id} data={d} type={type} />
                    ) : "Loading"}
                </div>
                <button
                    className="absolute text-white text-5xl z-50 right-0 mb-5"
                    onClick={handleRight}
                >
                    <BsArrowRightCircle />
                </button>
                <button
                    className="absolute text-white text-5xl z-50 left-0 mb-5"
                    onClick={handleLeft}
                >
                    <BsArrowLeftCircle />
                </button>
            </div>
        </div>
    )
}

export default PopularCardsSlider