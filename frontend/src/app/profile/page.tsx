"use client"
import React, { useState } from 'react'
import { BsFillCameraFill } from 'react-icons/bs'
import { MdOutlineEditNote } from 'react-icons/md'
import Link from 'next/link'
import { Roboto_Slab } from "next/font/google"
import AddressCard from '../components/AddressCard'

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
  })

const page = () => {
    const [showNameForm, setShowNameForm] = useState(false)
    const [showAddressForm,setShowAddressForm]=useState(false)
    return (
        <div className='bg-slate-200 pb-[350px] mb-[-350px] text-slate-700 '>
            <div className=' relative flex items-center justify-center h-[100vh] w-full border-b-2 border-main-800'>
                <div className='w-1/2 h-full bg-main-800 flex items-center justify-center'></div>
                <div className=' absolute pt-[75px]'>
                    <div className=' shadow-2xl w-72 h-72 md:w-96 md:h-96 rounded-2xl  hover:scale-110 transition ease-in-out duration-300 cursor-pointer bg-center bg-cover bg-no-repeat' style={{ backgroundImage: `url('/img/5.jpg')` }}></div>
                    <div className='flex items-center justify-between mt-20'>
                        <input type="file" className='hidden' id='file' />
                        <label htmlFor='file' className={` bg-slate-200 text-4xl px-10 py-2 border-2 shadow-lg border-main-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><BsFillCameraFill /></label>
                        <button className={` bg-slate-200 text-4xl px-10 py-2 border-2 shadow-lg border-main-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`} onClick={()=>{setShowNameForm(true)}}><MdOutlineEditNote /></button>
                    </div>
                </div>
                <div className='w-1/2 overflow-y-auto h-full'></div>
            </div>
            <div className='flex items-center justify-center flex-col py-10'>
                <h1 className={`text-4xl md:text-6xl font-semibold text-main-800 ${robotoSlab.className}`}>Abu Zaid</h1>
                <h1 className='md:text-xl mt-2'>zaid70979@gmail.com</h1>
                <div className='flex items-center justify-center'>
                    <Link href="/orders" className=' w-36 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>My Orders</Link>
                    <Link href="/sendlink" className=' w-36 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>Change Password</Link>
                </div>
                <button className=' w-36 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>Log Out</button>
            </div>
            <div className={` ${(showNameForm)?"flex":"hidden"} fixed top-0 left-0 w-[100%] h-[100vh] bg-[#0000008d] overflow-hidden items-center justify-center`}>
                <div className='flex flex-col w-96 shadow-2xl p-4 bg-white rounded'>
                    <p className='text-end cursor-pointer text-xl text-main-800' onClick={()=>{setShowNameForm(false)}}>X</p>
                    <label className='mt-2 text-xl' htmlFor="name">Change your name:- </label>
                    <input value="Abu Zaid" className='border-2 border-main-800 px-4  py-2' type="text" id='name' />
                    <button className=" mt-4 bg-main-800 text-white text-md font-semibold py-2 transition duration-300 ease-in-out border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] rounded">Submit</button>
                </div>
            </div>
            <h1 className={`bg-main-800 text-xl py-2 px-4 text-white ${robotoSlab.className}`}>Shipping Details</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 p-4 gap-4'>
                <AddressCard/>
                <AddressCard/>
                <AddressCard/>
                <AddressCard/>
            </div>
            <div className=' flex items-center justify-end pr-4'><button onClick={()=>{setShowAddressForm(!showAddressForm)}} className=' w-48 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>Add Shipping Details</button></div>
            <div className={`${(showAddressForm) ? 'flex' : 'hidden'} items-center justify-center w-full`}>
            <div className='flex justify-center flex-col w-full'>
              <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4 my-5'>Add Shipping Details</h1>
              <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="name">Name</label>
              <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='name' placeholder='Enter your name' type="text" id='name' />
              <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="houseNo">House No</label>
              <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='houseNo' placeholder='Enter House No' type="text" id='houseNo'  />
              <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="address">Address</label>
              <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='address' placeholder='Enter Address' type="text" id='address'  />
              <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="pinCode">Pin Code</label>
              <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='pinCode' placeholder='Enter Pincode' type="number" id='pinCode'/>
              <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="city">City</label>
              <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='city' placeholder='Enter City' type="text" id='city'  />
              <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="state">State</label>
              <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='state' placeholder='Enter State' type="text" id='state'  />
              <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="phoneNo">Phone No</label>
              <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='phoneNo' placeholder='Enter Phone No' type="number" id='phoneNo'  />
              <button className=' bg-main-800 text-white text-xl font-semibold py-2 mt-4 hover:text-main-800 hover:bg-[#44b67721] border-2 border-main-800 transition-all duration-300 ease-in-out' >Submit</button>
            </div>
          </div>
        </div>
    )
}

export default page
