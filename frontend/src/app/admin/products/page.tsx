"use client"
import React, { useState } from 'react'
import { FaTrash, FaEdit, FaStar } from "react-icons/fa";
import Link from 'next/link';
import '../../CSS/table.css'
import AdminSiderbar from '@/app/components/AdminSiderbar';
import { Roboto_Slab } from "next/font/google"

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: "swap",
})

const page = () => {
  const [showConfirm, setShowConfirm] = useState(false)
  const rat = 5
  return (
    <div className='flex bg-slate-200'>
      <AdminSiderbar />
      <div className='pl-16 sm:pl-20 w-full min-h-[100vh] overflow-hidden overflow-y-scroll text-slate-700' >
        <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Products</h1>
            <div className='w-full flex flex-col items-start p-4'>
              <input className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md rounded-bl-none shadow-md max-w-[600px]" type="search"  placeholder='Search Products' />
              <label className='bg-main-800 text-white py-1 px-2 sm:px-4 rounded-b-md sm:text-xl shadow-md'>Search Type:- 
                <select className='text-slate-700 sm:px-4 ml-2 outline-none rounded-md cursor-pointer'>
                  <option value={"default"}>Default</option>
                  <option value={"stock"}>Stock</option>
                  <option value={"price"}>Price</option>
                  <option value={"rating"}>Rating</option>
                  <option value={"id"}>Product Id</option>
                </select>
              </label>
            </div>
            <div className='flex items-center justify-end w-full px-6'><span className='bg-main-800 text-white text-xl py-1 px-4 rounded-md shadow-md'>Total Products: 20</span></div>


        <table className='mt-4'>
          <thead className='bg-main-800 border-main-800 border-2'>
            <tr>
              <th>Thumbnail</th>
              <th className='name'>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className='border border-main-800' aria-label='Thumbnail'><img style={{ height: "60px", width: "60px", margin: " 8px auto", borderRadius: '5px' }} src={'/img/5.jpg'} alt="Pic" /></td>
              <td className='name border border-main-800' aria-label={"Name"}>
                <Link href={`/details`}><p className='w-full max-h-28 overflow-hidden'>Testy Food Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eligendi nisi earum?</p></Link>
              </td>
              <td className='border border-main-800' aria-label={"Stock"}>20</td>
              <td className='border border-main-800' aria-label={"Price"}>&#8377; 2000</td>
              <td className='border border-main-800' aria-label={"Rating"}>
                <span className={`${(rat > 3) ? 'bg-green-700' : ""} ${(rat <= 3 && rat > 1) ? 'bg-yellow-500' : ""} ${(rat <= 1) ? 'bg-red-700' : ""} text-white flex m-auto items-center justify-evenly`} style={{ width: '50px', height: "30px", borderRadius: '8px' }}>{rat}<FaStar /></span>
              </td>
              <td className='border border-main-800' aria-label={"Edit"}><Link href={`/admin/updateproduct`}><FaEdit className='icon edit' /></Link></td>
              <td className='border border-main-800' aria-label={"Delete"}><FaTrash className='icon delete' onClick={() => { setShowConfirm(true) }} /></td>
            </tr>
            
          </tbody>

        </table>
      </div>
      <div className={`${(showConfirm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full h-full items-center justify-center bg-[#3341557f]`}>
        <div className=' w-56 h-56 border p-4  bg-white rounded  flex items-stretch justify-between flex-col border-main-800 shadow-lg'>
          <h1 className=' text-center text-2xl'>Are your sure you want to delete?</h1>
          <div className='flex items-center justify-between'>
            <button className=' bg-red-700 text-white px-3 py-2 rounded hover:bg-[#3341551f] border-2 border-red-700 hover:text-red-700 transition-all duration-300 ease-in-out'>YES</button>
            <button className=' bg-main-800 text-white px-3 py-2 rounded hover:bg-[#44b67721] border-2 border-main-800 hover:text-main-800 transition-all duration-300 ease-in-out'>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
