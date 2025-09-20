import { useClerk, useUser } from '@clerk/clerk-react'
import React, { use } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiToolsData } from '../assets/assets'

const AITools = () => {
    const { user } = useUser()
    const navigate = useNavigate()
     const { openSignIn } = useClerk()
    return (
        <div className='px-4 sm:px-20 xl:px-32 my-24'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>AI Tools</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Everything u need to create enhance and optimise your ccontent with cutting edge technology</p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {AiToolsData.map((tool, index) => (
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer' onClick={() => user ? navigate(tool.path) : openSignIn()}>
                        < tool.Icon className='w-12 h-12 p-3 text-white rounded-xl'
                         style={{background:`linear-gradient(to bottom,${tool.bg.from},${tool.bg.to})`}}/>
                         <h3 className='text-lg font-semibold mt-6 mb-3'>{tool.title}</h3>
                          <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AITools
