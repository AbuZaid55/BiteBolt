import React from 'react'
import { FaRegStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";

const Card1 = () => {
  return (
    <div className=" bg-white shadow-lg rounded-lg p-4">
    <img src="./img/3.png" alt="Image" />
    <h1 className="text-2xl font-bold text-slate-700 my-3 text-center">Tasty Food</h1>
    <div className="flex items-center justify-center"><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/></div>
    <div className="flex flex-col sm:flex-row items-center justify-between mt-5">
      <h1 className="flex items-center justify-center text-2xl text-main-800"><FaIndianRupeeSign/><span className=" font-bold">15.99</span></h1>
      <button className=" bg-slate-700 text-white px-8 py-2 rounded-md flex items-center justify-center w-full sm:w-auto mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#2f2f2f1c] transition-all duration-300 ease-in-out"><span className='mr-2'>ADD</span><MdShoppingCart/></button>
    </div>
  </div>
  )
}

export default Card1
