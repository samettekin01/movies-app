import PopularMoviesCards from "../../common/PopularMovies/PopularMoviesCards"
import PopularMoviesSlider from "../../common/PopularMoviesSlider/PopularMoviesSlider"
import PopularTVSeries from "../../common/PopularTVSeries/PopularTVSeries"

function MainPage() {
    return (
        <div className="w-full h-full">
            <PopularMoviesSlider />
            <div className="flex flex-col items-center">
                <PopularMoviesCards />
                <PopularTVSeries />
            </div>
        </div>
    )
}

export default MainPage