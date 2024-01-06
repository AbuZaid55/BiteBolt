import AdminSiderbar from '../../components/AdminSiderbar'
import React from 'react'
import { Roboto_Slab } from "next/font/google"

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
})

const page = () => {
    return (
        <div className='flex'>
            <AdminSiderbar />
            <div className='pl-20 sm:pl-24 pr-4 w-full min-h-[100vh] text-slate-700 bg-slate-200'>
                <div >
                    <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Update product</h1>

                    <div >
                        <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter Product Name</label>
                        <input className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter Name" name='name' />
                    </div>

                    <div className='w-full flex gap-4 mt-4 flex-col sm:flex-row'>
                        <div className='w-full sm:w-1/2'>
                            <label className=' text-xl text-main-800 font-semibold' htmlFor="stock">Enter Stock</label>
                            <input className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" id='stock' type="number" placeholder="Enter Stock" name='stock' />
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <label className=' text-xl text-main-800 font-semibold' htmlFor="sellprice">Enter Price</label>
                            <input className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" id='sellprice' type="number" placeholder="Enter Price" name='price' />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label className=' text-xl text-main-800 font-semibold' htmlFor="description">Enter Description</label>
                        <textarea className='block w-full outline-none bg-slate-200 border-2 border-main-800 mt-1 p-2 text-xl' id='description' style={{ minHeight: '250px', maxHeight: "250px", resize: 'none' }} placeholder="Enter Description" name='description' />
                    </div>

                    <div className='flex items-center justify-between w-full gap-4'>
                        <button className=" text-center bg-main-800 text-white px-4 py-2 rounded-md my-4 cursor-pointer border-2 w-full border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Update</button>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default page