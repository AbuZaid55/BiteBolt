import React from "react"
import { FaStar } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdShoppingCart } from "react-icons/md"
import { FaRegHeart } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import Link from "next/link"

const Card1 = () => {
  return (
    <div className=" bg-white shadow-lg relative rounded-lg p-4 max-w-[300px] w-full">
      <div className="absolute top-0 left-0 p-4 text-xl w-full flex items-center justify-between">
        <span className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out shadow-md">
          <FaRegHeart />
        </span>
        <span className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out shadow-md">
          <Link href={`/details`}>
            <MdOutlineRemoveRedEye />
          </Link>
        </span>
      </div>
      <img className="w-full h-[140px] sm:h-[190px] mx-auto" src="./img/3.png" alt="Image" />
      <h1 className="text-2xl font-bold text-slate-700 mt-3 mb-1 text-center w-[60%] mx-auto h-[35px] overflow-hidden">Tasty Food</h1>
      <div className="flex items-center justify-center text-xl">
        <FaStar className=" text-main-800" />
        <FaStar className=" text-main-800" />
        <FaStar className=" text-main-800" />
        <FaStar className=" text-main-800" />
        <FaStar className=" text-slate-700" />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
        <h1 className="flex items-center justify-center text-lg sm:text-2xl text-main-800">
          <FaIndianRupeeSign />
          <span className=" font-bold">15.99</span>
        </h1>
        <button className=" bg-slate-700 text-white sm:px-8 sm:py-2 rounded-md flex items-center justify-center w-full sm:w-auto mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out py-1">
          <span className="mr-2">ADD</span>
          <MdShoppingCart />
        </button>
      </div>
    </div>
  )
}

export default Card1
