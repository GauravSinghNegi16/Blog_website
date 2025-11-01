import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
    return (
        <div className='px-[9%]'>
            <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500 '>
                <div>
                    <img src={assets.logo} alt="" className='w-32 sm:w-44' />
                    <p className='max-w-[410px] mt-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit eos aut ipsum praesentium, ipsam aspernatur necessitatibus magnam nam explicabo labore, optio voluptatem corrupti recusandae ratione qui corporis ea in dicta.</p>
                </div>
                <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                    {footer_data.map((elem, index) => (
                        <div key={index}>
                            <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
                                {elem.title}
                            </h3>
                            <ul className='text-sm space-y-1'>
                                {elem.links.map((elem, index) => (
                                    <li key={index} className=''>
                                        <a href="#" className='hover:underline transition'>{elem}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 © QuickBlog - All Right Reserved.</p>
        </div>
    )
}

export default Footer