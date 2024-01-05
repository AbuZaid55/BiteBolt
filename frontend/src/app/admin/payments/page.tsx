"use client"
import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa";
import AdminSiderbar from '@/app/components/AdminSiderbar';
import { Roboto_Slab } from "next/font/google"

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
})

const page = () => {
    const [showConfirm, setShowConfirm] = useState(false)
    return (
        <div className='flex bg-slate-200'>
            <AdminSiderbar />
            <div className='pl-16 sm:pl-20 w-full min-h-[100vh] overflow-hidden overflow-y-scroll text-slate-700' >
                <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Payments</h1>
                <div className='w-full flex flex-col items-start p-4'>
                    <input className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md shadow-md max-w-[600px]" type="search" placeholder='Search Payments' />
                </div>
                <div className='flex items-center justify-end w-full px-6'><span className='bg-main-800 text-white text-xl py-1 px-4 rounded-md shadow-md'>Total Payments: 20</span></div>


                <table className='mt-4'>
                    <thead className='bg-main-800 border-main-800 border-2'>
                        <tr>
                            <th>Payment Id</th>
                            <th>Order Id</th>
                            <th>User Id</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className='border border-main-800 text-base' aria-label={"Payment Id"}>pay_NKb2ZWNhoZC2wW</td>
                            <td className='border border-main-800 text-base' aria-label={"Order Id"}>order_NKb25hqdr5lMFa</td>
                            <td className='border border-main-800 text-base' aria-label={"User Id"}>64fabc528eb710bd3d00f277</td>
                            <td className='border border-main-800 text-base' aria-label={"Amount"}>&#8377; 343587</td>
                            <td className='border border-main-800 text-base' aria-label={"Date"}>20-12-2023</td>
                            <td className='border border-main-800 text-base' aria-label={"Delete"}><FaTrash className='icon delete' onClick={() => { setShowConfirm(true) }} /></td>
                        </tr>

                    </tbody>

                </table>
            </div>
            <div className={`${(showConfirm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full h-full items-center justify-center bg-[#3341557f]`}>
                <div className=' w-56 h-56 border p-4  bg-white rounded  flex items-stretch justify-between flex-col border-main-800 shadow-lg'>
                    <h1 className=' text-center text-2xl'>Are your sure you want to delete?</h1>
                    <div className='flex items-center justify-between'>
                        <button className=' bg-red-700 text-white px-3 py-2 rounded hover:bg-[#3341551f] border-2 border-red-700 hover:text-red-700 transition-all duration-300 ease-in-out'>YES</button>
                        <button className=' bg-main-800 text-white px-3 py-2 rounded hover:bg-[#44b67721] border-2 border-main-800 hover:text-main-800 transition-all duration-300 ease-in-out' onClick={() => { setShowConfirm(false) }}>NO</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
