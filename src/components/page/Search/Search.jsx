import { useState } from "react"
import bgImage from "../../../assets/bgImage.jpg"
import { useLocation } from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import useSearch from "../../hooks/useSearch"
import MTCards from "../../common/MTCards/MTCards"

function Search() {

    const location = useLocation()
    const path = location.pathname.slice(1, location.pathname.length)

    const [value, setValue] = useState("")

    const { content, setPage, setSearch } = useSearch(path)

    const handleQuery = e => {
        e.preventDefault()
        setSearch(value)
        setPage(1)
    }

    const handleContentPage = () => {
        setPage(page => page + 1)
    }

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex w-full min-h-[200px] justify-center"
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}>
                <span className="text-white mt-auto text-2xl mb-4">{path.toLocaleUpperCase()}</span>
            </div>
            <div className="flex mt-4 gap-2 w-full justify-center">
                <form className="md:w-2/6 sm:3/6 w-4/6" onSubmit={handleQuery}>
                    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <BsSearch className="text-white" />
                        </div>
                        <input
                            type="search"
                            id="search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                           bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600
                          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col items-center w-11/12 h-full">
                <div className="flex flex-wrap mt-8 gap-4 justify-center">
                    {content.length > 0 && content.map(d =>
                        <div key={d.id} className="flex flex-col items-center">
                            <div
                                style={{ minWidth: "170px", width: "100px" }}
                                className="rounded-lg"
                            >
                                <MTCards data={d} type={path} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 
                    focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 
                    py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white
                     dark:hover:bg-red-600 dark:focus:ring-red-900"
                        onClick={handleContentPage}
                    >
                        Load More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search