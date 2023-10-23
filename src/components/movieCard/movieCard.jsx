import { useMovie } from "../providers/moviesProvider";
import image from "../../images/notfound.png"
import "./movie-card.css"

function MovieCard() {
    const { movies, changeSearch } = useMovie();

    const detail = e => {
        console.log(movies.results[e].original_title)
    }

    //6gBvsiEMcTst9IiK4gjlxwrf98u.jpg
    return (
        <div className="flex flex-col items-center" >
            <div className="w-full flex fixed flex-col items-center" style={{ zIndex: 1 }}>
                <input className="input-search" type="text" onChange={e => changeSearch(e.target.value)} placeholder="Search Movie..." />
            </div>
            <div className="flex flex-row flex-wrap justify-around m-16">
                {movies.results ? movies.results.map((data, index) =>
                    <div className="movie-card" key={index} onClick={() => detail(index)}>
                        <div className="img-container relative">
                            <img
                                className="w-full rounded-lg"
                                alt={data.title}
                                src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : image} />
                            <div className="overview">
                                {data.overview}
                            </div>
                        </div>
                        <div className="text-center">
                            <span>{data.title}</span><br />
                            <span>{data.release_date}</span>
                        </div>
                        <div className="text-center">
                            <span>IMDb: <span className="p-1 bg-green-600 rounded-lg">{Math.floor((data.popularity) * 10) / 10}</span></span>
                        </div>
                    </div>
                ) : "No Data"}
            </div>
        </div>
    )
}

export default MovieCard;