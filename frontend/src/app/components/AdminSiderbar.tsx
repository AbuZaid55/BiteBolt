"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { Roboto_Slab } from 'next/font/google'
import { FaAngleLeft } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import {FaUserFriends,FaShoppingCart,FaPlusSquare,FaNotesMedical,FaTimes,FaCcAmazonPay} from "react-icons/fa";

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: 'swap'
  })
  

const AdminSiderbar = () => {
    const [open,setOpen]=useState(true)
  return (
    <div className={`bg-white ${(open)?'w-72':"w-20"} h-full p-4 relative transition-all duration-300 ease-in-out`}>
        <span onClick={()=>{setOpen(!open)}} className='absolute top-4 p-2 rounded-full text-2xl right-0 translate-x-1/2 cursor-pointer hover:scale-110 hover:text-white hover:bg-main-800 transition-all ease-in-out duration-300 shadow-md bg-slate-100'><FaAngleLeft/></span>
        <Link href="/" className="flex items-center overflow-hidden mt-10 gap-4">
          <img className=" min-w-12 h-12" src="/logo.png" alt="logo" />
          <h1 className={`text-4xl text-slate-700 ${robotoSlab.className}`}>BiteBolt</h1>
        </Link>
        <Link href="/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-2xl mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap'><MdSpaceDashboard className="min-w-8 "/>Dashboard</Link>
        <Link href="/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-2xl mt-1 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaUserFriends className="min-w-8 "/>Users</Link>
        <Link href="/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-2xl mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaShoppingCart className="min-w-8 "/>Products</Link>
        <Link href="/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-2xl mt-1 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaPlusSquare className="min-w-8 "/>Add Products</Link>
        <Link href="/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-2xl mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaNotesMedical className="min-w-8 "/>Orders</Link>
        <Link href="/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-2xl mt-1 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaTimes className="min-w-8 "/>Cancelled Orders</Link>
        <Link href="/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-2xl mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaCcAmazonPay className="min-w-8 "/>Payments</Link>
      </div>
  )
}

export default AdminSiderbar
