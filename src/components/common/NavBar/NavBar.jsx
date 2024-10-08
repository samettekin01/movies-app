import { useEffect, useState } from "react"
import { BsYoutube } from "react-icons/bs"
import { Link, useLocation } from "react-router-dom"

function NavBar() {
    const menu = {
        title: [{
            name: "Home",
            page: "/"
        },
        {
            name: "Movies",
            page: "/movies"
        },
        {
            name: "TV Series",
            page: "/tv"
        }
        ]
    }

    const location = useLocation()

    const [blur, setBlur] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 1){
                setBlur(true)
            }else{
                setBlur(false)
            }
        })
    }, [])

    return (
        <div className="fixed z-50 w-full ">
            <div className={`flex p-4 w-full justify-between ${blur ? "backdrop-blur-sm bg-opacity-60 bg-black" : "backdrop-blur-0"} duration-150`}>
                <Link to="/" className="flex items-center gap-2 text-white"><BsYoutube className="text-red-600" />PatroMovies</Link>
                <div className="flex gap-8">
                    {menu && menu.title.map((d, i) =>
                        <div key={i} className="group cursor-pointer">
                            <Link to={d.page} className={`${location.pathname === d.page ? "text-white" : "text-gray-300"} group-hover:text-white`}>{d.name}
                                <div className={`mt-1 border-red-600 rounded-2xl border-2 origin-center ${location.pathname === d.page ? "scale-x-100 text-white" : "scale-x-0"} group-hover:scale-x-100 group-hover:border-2 transition-transform duration-150`}></div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar