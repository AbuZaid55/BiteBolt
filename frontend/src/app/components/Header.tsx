"use client"
import React, { useState } from "react"
import { IoSearchSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import {Roboto_Slab} from 'next/font/google'

const robotoSlab = Roboto_Slab({
    weight:"500",
    subsets:["greek"],
    display:'swap'
})

const Header = () => {
  const [openNav,setOpenNev]=useState(false)
  return (
        <div className="h-[70px] shadow-md p-3 relative overflow-x-hidden ">
      <div className="h-full flex items-center justify-between">
        <div className="h-full flex items-center">
          <img className="h-[70%] sm:h-[80%]" src="./logo.png" alt="logo" />
          <h1 className={`text-2xl sm:text-3xl text-slate-700 ${robotoSlab.className}`}>BiteBolt</h1>
        </div>

        <div>
          <ul className="hidden lg:flex items-center justify-center text-xl">
            <li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Home</li>
            <li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Dishes</li>
            <li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Blog</li>
            <li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Order</li>
            <li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Contact</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-5 sm:text-xl">
          <span className=" hover:scale-125 bg-slate-200   hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md "> 
            <IoSearchSharp />
          </span>
          <span className=" hover:scale-125 bg-slate-200 font-bold  hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md ">
            <FaRegHeart />
          </span>
          <span className=" hover:scale-125 bg-slate-200 font-bold  hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md ">
            <MdOutlineShoppingCart />
          </span>
          <span className=" hover:scale-125 bg-slate-200 font-bold  hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md ">
            <RxDashboard />
          </span>
          <span className={`lg:hidden ${openNav?"flex flex-col items-center justify-center rotate-90":""} cursor-pointer transition-all duration-200 ease-in-out`} onClick={()=>{setOpenNev(!openNav)}}>
            <div className={`${openNav?' rotate-45':"my-1"} h-[3px] sm:h-1 w-7 bg-slate-700 transition-all ease-in-out duration-200`}></div>
            <div className={`${openNav?"hidden":""} h-[3px] sm:h-1 w-7 bg-slate-700 my-1`}></div>
            <div className={`${openNav?'-my-1 -rotate-45':"my-1"} h-[3px] sm:h-1 w-7 bg-slate-700 transition-all ease-in-out duration-200`}></div>
          </span>
        </div>
      </div>
      <ul className={` text-white fixed ${openNav?'right-0':'-right-52'} z-50 top-[70px] bg-slate-700 shadow-lg mt-[2px] w-48 h-[calc(100svh-70px-2px)] flex flex-col items-center justify-center text-xl transition-all ease-in-out duration-300`}>
        <li className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Home</li>
        <li className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Dishes</li>
        <li className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Blog</li>
        <li className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Order</li>
        <li className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Dashboard</li>
        <li className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Contact</li>
      </ul>
    </div>
  )
}

export default Header
