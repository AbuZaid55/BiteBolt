import React from 'react'
import { FaStar } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdShoppingCart } from "react-icons/md"
import { FaRegHeart } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import Link from 'next/link'

const Card2 = () => {
    return (
        <div className=" bg-white shadow-lg relative rounded-lg p-4 max-w-[300px]">
            <div className="absolute top-0 left-0 p-2 text-xl w-full flex items-center justify-between">
                <span className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out">
                    <FaRegHeart />
                </span>
                <span className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out">
                    <Link href={`/details`}><MdOutlineRemoveRedEye /></Link>
                </span>
            </div>
            <img className="mx-auto border-2 w-full" src="./img/5.jpg" alt="Image" />
            <div className="flex items-center text-xl mt-4 mb-1">
                <FaStar className=" text-main-800" />
                <FaStar className=" text-main-800" />
                <FaStar className=" text-main-800" />
                <FaStar className=" text-main-800" />
                <FaStar className=" text-slate-700" />
            </div>
            <h1 className="text-2xl font-bold text-slate-700 h-[35px] overflow-hidden">Tasty Food</h1>
            <p className="h-12 overflow-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, autem neque nesciunt expedita aliquid quidem praesentium pariatur animi reprehenderit inventore.</p>
            <h1 className="flex items-center text-lg sm:text-2xl text-main-800">
                <FaIndianRupeeSign />
                <span className=" font-bold">15.99</span>
            </h1>
            <button className=" bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
                <span className="mr-2">Add to Cart</span>
                <MdShoppingCart />
            </button>
        </div>
    )
}

export default Card2
