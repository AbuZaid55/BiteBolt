import React from 'react'
import AdminSiderbar from '@/app/components/AdminSiderbar';
import { Roboto_Slab } from "next/font/google"
import Link from 'next/link';

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
})

const page = () => {
    return (
        <div className='flex bg-slate-200'>
            <AdminSiderbar />
            <div className='pl-16 sm:pl-20 w-full min-h-[100vh] overflow-hidden overflow-y-scroll text-slate-700' >
                <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Orders</h1>
                <div className='w-full flex flex-col items-start p-4'>
                    <input className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md rounded-bl-none shadow-md max-w-[600px]" type="search" placeholder='Search Products' />
                    <label className='bg-main-800 text-white py-1 px-2 sm:px-4 rounded-b-md sm:text-xl shadow-md'>Search Type:-
                        <select className='text-slate-500 sm:px-4 ml-2 outline-none rounded-md cursor-pointer'>
                            <option value={"all"}>All</option>
                            <option value={"Processing"}>Processing</option>
                            <option value={"Confirmed"}>Confirmed</option>
                            <option value={"Shipped"}>Shipped</option>
                            <option value={"Out For Delivery"}>Out For Delivery</option>
                            <option value={"Delivered"}>Delivered</option>
                        </select>
                    </label>
                </div>
                <div className='flex items-center justify-end w-full px-6'><span className='bg-main-800 text-white text-xl py-1 px-4 rounded-md shadow-md'>Total Orders: 20</span></div>
                <div className=" mx-2 sm:mx-4 my-5 border-2 border-main-800 rounded-xl overflow-hidden relative">

                    {/* item  */}

                    <div className="flex item  items-center">
                        <img className="m-2" style={{ width: "80px", height: "80px" }} src='/img/5.jpg' alt="Image" />
                        <div className='w-full'>
                            <Link href={`/details?_id=`}><h1 className='h-7 overflow-hidden lg:text-2xl'>Realme Techlife Buds T100 with up to 28 Hours Playback & AI ENC for Calls Bluetooth Headset (Black, True Wireless) </h1></Link>
                            <p className="flex items-center lg:text-xl mx-2">Quentity: 20</p>
                        </div>
                    </div>

                    {/* item end  */}
                    <div className='p-2 text-main-800 border-t-2 border-main-800 text-lg'>
                        <p>Order Id: 64fafdacffebcfe85a076584</p>
                        <p className='w-full'>Order On : 06-01-2024</p>
                        <p>Status :-
                            <select className=' bg-main-800 text-white outline-none rounded-md ml-2 cursor-pointer px-2' >
                                <option value={"Processing"}>Processing</option>
                                <option value={"Confirmed"}>Confirmed</option>
                                <option value={"Shipped"}>Shipped</option>
                                <option value={"Out For Delivery"}>Out For Delivery</option>
                                <option value={"Delivered"}>Delivered</option>
                                <option value={"Cancelled"}>Cancelled</option>
                            </select>
                        </p>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default page
