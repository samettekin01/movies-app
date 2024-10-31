import React from 'react'
import { FaGithub } from 'react-icons/fa'

function Github() {
    return (
        <div className='fixed z-10 top-20 right-0 bg-black pr-6 p-1 rounded-l-full'>
            <a href='https://github.com/samettekin01' target='_blank' rel='noreferrer'>
                <FaGithub
                    className='text-4xl cursor-pointer text-white
        hover:text-gray-400 transition-colors duration-300
        ' />
            </a>
        </div>
    )
}

export default Github