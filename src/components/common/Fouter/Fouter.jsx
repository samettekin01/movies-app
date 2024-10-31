import React from 'react'
import bgImage from "../../../assets/bgImage.jpg"

function Fouter() {
    return (
        <div
            className="flex w-full min-h-[200px] justify-center items-center mt-4 text-white"
            style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}>
            <div className='flex flex-wrap sm:gap-8 md:gap-16 gap-4'>
                <div className='flex flex-col items-center gap-4'>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Home</a>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Contact</a>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">About</a>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Help</a>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Live</a>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">FAQ</a>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Sitemap</a>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Youtube</a>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Instagram</a>
                    <a className='hover:text-gray-400' href='/' rel="noreferrer">Facebook</a>
                </div>
            </div>
        </div>
    )
}

export default Fouter
