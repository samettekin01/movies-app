import { BsYoutube } from 'react-icons/bs'
import useDetail from '../../hooks/useDetail'
import { useNavigate } from 'react-router-dom'

function MTCards(data) {
    const navigate = useNavigate()
    const { loading, setLoading } = useDetail()
    const d = data.data

    const handleMovieDetail = id => {
        if (loading) {
            const type = data.type === "movies" ? "movie" : data.type
            const path = `/${type}/${id}`
            navigate(path)
            window.scrollTo(0, 0)
            setLoading(true)
        }
    }

    return (
        <div
            key={d.id}
            style={{ minWidth: "170px" }}
            className="relative group flex flex-col m-2 items-center cursor-pointer"
            onClick={() => handleMovieDetail(d.id)}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500/${d.poster_path}`}
                alt={d.title}
                className="rounded-2xl group-hover:blur-[2px]"
            />
            <div className="absolute top-0 flex items-center justify-center w-full h-full -translate-y-5 opacity-0 group-hover:opacity-100 duration-300 "><BsYoutube className="text-5xl text-red-600" /> </div>
            <span className="text-white mt-3">{d.original_title ? d.original_title : d.original_name}</span>
        </div>
    )
}

export default MTCards