import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs"
import MTCards from "../MTCards/MTCards"
// import { setIsDragging } from "../../redux/slices/statusSlice"

function PopularCardsSlider({ data, title, type }) {
    const [translateX, setTranslateX] = useState({ transform: "translateX(0px)" })

    // const dispatch = useDispatch()
    const { moviesList } = useSelector(state => state.moviesList)
    // const { isDragging } = useSelector(state => state.status)

    const [slideCount, setSlideCount] = useState(Math.round(window.innerWidth / 240))
    const [width, setWidth] = useState(window.innerWidth)
    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderLength = moviesList.results !== undefined && moviesList.results.length

    // const [startPosition, setStartPosition] = useState(0)
    // const [mouseStart, setMouseStart] = useState(0)

    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const minSwipeDistance = 50

    // const calculateMaxTranslateX = () => {
    //     const totalContentWidth = sliderLength * 100 / slideCount
    //     const visibleContentWidth = 100
    //     const maxTranslateX = totalContentWidth - visibleContentWidth

    //     return maxTranslateX
    // }

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

    const onTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (touchStart - touchEnd < -minSwipeDistance) {
            handleLeft()
        }

        if (touchStart - touchEnd > minSwipeDistance) {
            handleRight()
        }
    }

    // const handleMouseDown = (e) => {
    //     setTimeout(() => dispatch(setIsDragging(true)), 100)
    //     setMouseStart(e.clientX)
    //     setStartPosition(currentIndex)
    // }

    // const handleMouseMove = (e) => {
    //     if (!isDragging) return
    //     if (mouseStart === 0) return // Sürükleme başlamamışsa
    //     const delta = e.clientX - mouseStart
    //     const deltaIndex = Math.round(delta / (width / sliderLength)) // Hareket edilen mesafeyi slaytlara göre ölçeklendir

    //     const newIndex = (startPosition - deltaIndex + sliderLength)
    //     setCurrentIndex(newIndex)
    //     setTranslateX(prevStyle => ({
    //         ...prevStyle,
    //         transform: `translateX(-${newIndex * (100 / sliderLength) % ((100 + 5) - (5 * slideCount))}%)`
    //     }))
    //     console.log(currentIndex)
    // }

    // const handleMouseUp = () => {
    //     setTimeout(() => dispatch(setIsDragging(false)), 1)
    //     setMouseStart(0)
    // }

    // const handleMouseLeave = () => {
    //     setTimeout(() => dispatch(setIsDragging(false)), 1)
    // }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth)
            setSlideCount(Math.round(window.innerWidth / 240))
        })
    })
    return (
        <div className="mt-12 p-5 relative">
            <div className="mb-5">
                <span className="text-xl font-bold text-white">{title}</span>
                <div className="mt-1 border-2 border-red-600 rounded-2xl w-24"></div>
            </div>
            <div
                className="overflow-hidden z-0 flex items-center "
                style={{ width: `${width / 1.2}px`, height: `100%` }}
            >
                <div className="flex z-0 duration-500 ease-out"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={translateX}>
                    {data ? data.map(d =>
                        <MTCards key={d.id} data={d} type={type} />
                    ) : "Loading"}
                </div>
                <button
                    className="absolute text-white text-5xl z-50 right-7 mb-5"
                    onClick={handleRight}
                >
                    <BsArrowRightCircle />
                </button>
                <button
                    className="absolute text-white text-5xl z-50 left-7 mb-5"
                    onClick={handleLeft}
                >
                    <BsArrowLeftCircle />
                </button>
            </div>
        </div>
    )
}

export default PopularCardsSlider