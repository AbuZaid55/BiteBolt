"use client"
import React, { useState } from 'react'
import { FaTrash} from "react-icons/fa";
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
        <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Users</h1>
            <div className='w-full flex flex-col items-start p-4'>
              <input className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md rounded-bl-none shadow-md max-w-[600px]" type="search"  placeholder='Search Products' />
              <label className='bg-main-800 text-white py-1 px-2 sm:px-4 rounded-b-md sm:text-xl shadow-md'>Search Type:- 
                <select className='text-slate-700 sm:px-4 ml-2 outline-none rounded-md cursor-pointer'>
                  <option value={"All"}>All</option>
                  <option value={"User"}>User</option>
                  <option value={"Admin"}>Admin</option>
                </select>
              </label>
            </div>
            <div className='flex items-center justify-end w-full px-6'><span className='bg-main-800 text-white text-xl py-1 px-4 rounded-md shadow-md'>Total Users: 20</span></div>


        <table className='mt-4'>
          <thead className='bg-main-800 border-main-800 border-2'>
            <tr>
              <th>Profile</th>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className='border border-main-800' aria-label='Profile'><img style={{ height: "60px", width: "60px", margin: " 8px auto", borderRadius: '5px' }} src={'/img/5.jpg'} alt="Pic" /></td>
              <td className='border border-main-800' aria-label={"User Id"}>64fabc528eb710bd3d00f277</td>
              <td className='border border-main-800' aria-label={"Name"}>Abu Zaid</td>
              <td className='border border-main-800' aria-label={"Email"}>zaid70979@gmail.com</td>
              <td className='border border-main-800' aria-label={"Type"}>
                <select className='text-slate-700 sm:px-4 ml-2 outline-none rounded-md cursor-pointer border-2 border-main-800'>
                  <option value={"user"}>User</option>
                  <option value={"admin"}>Admin</option>
                </select>
              </td>
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
