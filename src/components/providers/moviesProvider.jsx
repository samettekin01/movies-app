import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const MoviesContext = createContext();
export function MoviesProvider({ children }) {
    const [movie, setMovie] = useState({
        search: "minions",
        adult: false,
        lang: "tr-TR"
    })
    const [movies, setMovies] = useState([]);

    const changeSearch = (value, prev) => {
        setMovie(get => ({
            ...get,
            search: value,
            adult: prev
        }))
    }
    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?query=${movie.search ? movie.search : "minions"}&include_adult=${movie.adult}&language=${movie.lang}&page=1&api_key=${apiKey}`)

            .then(response => response.json())
            .then(response => setMovies(response))
            .catch(err => console.error(err));
    }, [movie, apiKey])
    return (
        <MoviesContext.Provider value={{ movies, changeSearch }}>
            {children}
        </MoviesContext.Provider>
    )
}

export function useMovie() {
    return useContext(MoviesContext);
}
