import React from 'react'
import { Roboto_Slab } from "next/font/google"
import AdminSiderbar from '@/app/components/AdminSiderbar'

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
          <h1 className={`${robotoSlab.className} text-3xl sm:text-5xl text-center my-6 text-main-800`}>Add New Category</h1>

          <div >
            <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter Category Name</label>
            <input className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter Category Name" name='category' />
          </div>
          <div className='mt-4'>
            <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter SubCategory Name</label>
            <input className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter SubCategory Name" name='subCategory' />
          </div>
          <div className='flex items-center justify-between w-full gap-4'>
            <button className=" text-center bg-main-800 text-white px-4 py-2 rounded-md my-4 cursor-pointer border-2 w-full border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Add</button>
          </div>
        </div>

        <div>
          <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Add SubCategory</h1>

          <div >
            <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Select Category</label>
            <select className='block w-full text-slate-500 outline-none cursor-pointer bg-slate-200 border-b-2 border-main-800 text-xl'>
                <option value={"select"}>Select Category</option>
                <option value={"Electronics"}>Electronics</option>
                <option value={"TV's&Applications"}>TV's&Applications</option>
                <option value={"Man"}>Man</option>
                <option value={"Womend"}>Women</option>
                <option value={"Boys&Girls<"}>Boys&Girls</option>
            </select>
          </div>
          <div className='mt-4'>
            <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter SubCategory Name</label>
            <input className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter SubCategory Name" name='subCategory' />
          </div>
          <div className='flex items-center justify-between w-full gap-4'>
            <button className=" text-center bg-main-800 text-white px-4 py-2 rounded-md my-4 cursor-pointer border-2 w-full border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
