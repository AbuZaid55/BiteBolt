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
    const [open,setOpen]=useState(false)
  return (
    <div className={`bg-white ${(open)?'w-72':"w-16 sm:w-20"} h-[100vh] p-2 sm:p-4 absolute z-30 md:relative transition-all duration-300 ease-in-out`}>
        <span onClick={()=>{setOpen(!open)}} className={`absolute top-4 p-1 sm:p-2 rounded-full text-2xl right-0 translate-x-1/2 cursor-pointer hover:scale-110 hover:text-white hover:bg-main-800 transition-all ease-in-out duration-300 shadow-md bg-slate-100 ${(open)?"":" rotate-180"}`}><FaAngleLeft/></span>
        <Link href="/" className="flex items-center overflow-hidden pl-2 sm:pl-0 mt-10 gap-4">
          <img className="min-w-8 h-8 sm:min-w-12 sm:h-12" src="/logo.png" alt="logo" />
          <h1 className={`text-2xl sm:text-4xl text-slate-700 ${robotoSlab.className}`}>BiteBolt</h1>
        </Link>
        <Link href="/admin/dashboard" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-xl sm:text-2xl mt-4 sm:mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap'><MdSpaceDashboard className="min-w-8 "/>Dashboard</Link>
        <Link href="/admin/users" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-xl sm:text-2xl mt-1 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaUserFriends className="min-w-8 "/>Users</Link>
        <Link href="/admin/products" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-xl sm:text-2xl mt-4 sm:mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaShoppingCart className="min-w-8 "/>Products</Link>
        <Link href="/admin/addproduct" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-xl sm:text-2xl mt-1 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaPlusSquare className="min-w-8 "/>Add Products</Link>
        <Link href="/admin/orders" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-xl sm:text-2xl mt-4 sm:mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaNotesMedical className="min-w-8 "/>Orders</Link>
        <Link href="/admin/cancelledorders" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-xl sm:text-2xl mt-1 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaTimes className="min-w-8 "/>Cancelled Orders</Link>
        <Link href="/admin/payments" className='flex items-center py-2 bg-slate-100 rounded-md px-2 gap-3 text-xl sm:text-2xl mt-4 sm:mt-8 hover:bg-[#e2e8f0] transition-all duration-200 ease-in-out overflow-hidden text-nowrap '><FaCcAmazonPay className="min-w-8 "/>Payments</Link>
      </div>
  )
}

export default AdminSiderbar
