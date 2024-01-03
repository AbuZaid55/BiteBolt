"use client"
import React, { useState } from 'react'
import { HiOutlineClipboardDocumentList } from "react-icons/hi2"
import { FaRegThumbsUp } from "react-icons/fa";
import { TbChefHat } from "react-icons/tb";
import { GoGift } from "react-icons/go";
import { TbBike } from "react-icons/tb";

const page = () => {

    const [status,setStatus]=useState("")
    const [track, setTrack] = useState(30)
    const [orderId, setOrderId] = useState('')

  return (
    <div className='flex items-center justify-center flex-col pb-[300px] mb-[-350px] bg-slate-200 pt-[90px]'>
      <h1 className='text-3xl text-main-800 mt-5 font-bold'>Track Your Order</h1>
      <div className={`${(status === "Cancelled" || status === 'Refund') ? 'hidden' : ''} w-80 h-80 border-2 relative m-10`}>
        <div className='bg-white h-72  w-1 relative left-5 top-5'>
          <div className='w-full bg-green-700 absolute z-20' style={{ height: `${track}%` }}></div>
          <div className='absolute z-30 w-full h-full flex items-center justify-between flex-col'>
            <p className={`w-6 h-6 font-bold rounded-full flex items-center justify-center ${(track >= 1) ? 'bg-green-700 text-white' : 'bg-white text-slate-700'}`}>&#10003;</p>
            <p className={`w-6 h-6 font-bold rounded-full flex items-center justify-center ${(track >= 40) ? 'bg-green-700 text-white' : 'bg-white text-slate-700'}`}>&#10003;</p>
            <p className={`w-6 h-6 font-bold rounded-full flex items-center justify-center ${(track >= 60) ? 'bg-green-700 text-white' : 'bg-white text-slate-700'}`}>&#10003;</p>
            <p className={`w-6 h-6 font-bold rounded-full flex items-center justify-center ${(track >= 80) ? 'bg-green-700 text-white' : 'bg-white text-slate-700'}`}>&#10003;</p>
            <p className={`w-6 h-6 font-bold rounded-full flex items-center justify-center ${(track >= 100) ? 'bg-green-700 text-white' : 'bg-white text-slate-700'}`}>&#10003;</p>
          </div>
          <div className='absolute text-lg left-10 w-64 h-full flex items-left justify-between flex-col text-slate-700'>
            <p className='flex items-center gap-2 text-xl'><HiOutlineClipboardDocumentList/>Order Placed</p>
            <p className='flex items-center gap-2 text-xl'><FaRegThumbsUp/>Order Confirmed</p>
            <p className='flex items-center gap-2 text-xl'><TbChefHat/>Order Processing</p>
            <p className='flex items-center gap-2 text-xl'><GoGift/>Ready to Pickup</p>
            <p className='flex items-center gap-2 text-xl'><TbBike/>Delivered</p>
          </div>
        </div>
      </div>
      <div className={`${(status === "Cancelled" || status === 'Refund') ? '' : 'hidden'} w-80 h-48 border-2 relative m-10`}>
        <div className='bg-white h-36  w-1 relative left-5 top-5'>
          <div className={`${(status === "Refund") ? 'bg-green-700' : ' bg-red-700'} w-full absolute z-20`} style={{ height: `${track}%` }}></div>
          <div className='absolute z-30 w-full h-full flex items-center justify-between flex-col'>
            <p className={`w-6 h-6 font-bold rounded-full flex items-center justify-center ${(track >= 1) ? 'bg-red-700 text-white' : 'bg-white text-slate-700'}`}>&#10003;</p>
            <p className={`w-6 h-6 font-bold rounded-full flex items-center justify-center ${(track >= 40) ? 'bg-green-700 text-white' : 'bg-white text-slate-700'}`}>&#10003;</p>
          </div>
          <div className='absolute text-lg left-10 w-64 h-full flex items-left justify-between flex-col '>
            <p>Cancelled</p>
            <p>Refund Successfull</p>
          </div>
        </div>
      </div>
      <div className='border flex justify-center flex-col p-5 w-80 mb-10 text-slate-700'>
        <label className='text-xl mb-2' htmlFor="orderInput">Order Id</label>
        <input className='w-full border-b border-main-800 outline-none bg-slate-200 text-xl' type="text" placeholder='Enter your order id' value={orderId} onChange={(e) => { setOrderId(e.target.value) }} />
        <button className=' bg-main-800  px-4 py-2 text-white font-bold rounded-full mt-5  hover:text-main-800  hover:bg-[#44b67721] transition-all duration-300 ease-in-out border-2 border-main-800'>Track Order</button>
      </div>
    </div>
  )
}

export default page
