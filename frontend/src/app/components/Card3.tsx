import React from 'react'
import { FaStar } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdShoppingCart } from "react-icons/md"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { GoTrash } from "react-icons/go";
import Link from 'next/link'

const Card2 = () => {
    return (
        <div className=" bg-white shadow-lg relative rounded-lg p-4 max-w-[300px] w-full">
            <div className="absolute top-0 left-0 p-2 text-xl w-full flex items-center justify-end">
                <span className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out shadow-md">
                    <Link href={`/details`}><MdOutlineRemoveRedEye /></Link>
                </span>
            </div>
            <img className="w-full h-[140px] sm:h-[190px]" src="./img/5.jpg" alt="Image" />
            <div className='flex items-center justify-between my-1'>
                <h1 className="flex items-center sm:text-2xl text-main-800">
                    <FaIndianRupeeSign />
                    <span className=" font-bold">15.99</span>
                </h1>
                <div className="flex items-center sm:text-xl">
                    <FaStar className=" text-main-800" />
                    <FaStar className=" text-main-800" />
                    <FaStar className=" text-main-800" />
                    <FaStar className=" text-main-800" />
                    <FaStar className=" text-slate-700" />
                </div>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-700 h-[35px] overflow-hidden">Tasty Food</h1>
            <p className="h-12 overflow-hidden text-xs sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, autem neque nesciunt expedita aliquid quidem praesentium pariatur animi reprehenderit inventore.</p>
            <div className='flex gap-1 sm:gap-2'>
                <button className="text-xs sm:text-base bg-red-800 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-red-800  hover:text-red-800 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
                    <span className="mr-1 sm:mr-2">Remove</span>
                    <GoTrash />
                </button>
                <button className="text-xs sm:text-base bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
                    <span className="mr-1 sm:mr-2">Add</span>
                    <MdShoppingCart />
                </button>
            </div>
        </div>
    )
}

export default Card2
