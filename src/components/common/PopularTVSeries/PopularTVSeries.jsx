import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopRatedTvSeries, getTvSeries } from '../../redux/slices/tvSeriesSlice'
import PopularCardsSlider from '../PopularCardsSlider/PopularCardsSlider'

function PopularTVSeries() {

    const dispatch = useDispatch()

    const { tvSeriesList, topRatedTvSeriesList } = useSelector(state => state.tvSeriesList)

    useEffect(() => {
        dispatch(getTvSeries())
        dispatch(getTopRatedTvSeries())
    }, [dispatch])

    return (
        <div className="flex flex-col items-center"> 
            <PopularCardsSlider data={tvSeriesList.results} title="Popular TV series" />
            <PopularCardsSlider data={topRatedTvSeriesList.results} title="Top Rated TV series" />
        </div>
    )
}

export default PopularTVSeries