"use client"
import React, { useState } from 'react'
import AddressCard from '../components/AddressCard'

const page = () => {
    const [address, setAddress] = useState([1, 2, 3, 4])
    const [selected, setSelected] = useState(0)
    const [showAddressForm, setShowAddressForm] = useState(false)
    return (
        <div className='pb-[350px] mb-[-350px] bg-slate-200 pt-[75px]'>
            <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4'>Select Shipping Details</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 p-4 gap-4'>
                {address.map((value: number, i: number) => {
                    return <span key={i} onClick={() => { setSelected(i) }} className={`${(selected === i) ? " border-4" : ""} cursor-pointer border-main-800 rounded-xl`}><AddressCard /></span>
                })}
            </div>
            <div className='flex items-center justify-center'>
                <button className=" text-center bg-main-800 shadow-lg text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Continue</button>
            </div>

            <div className=' flex items-center justify-end pr-4'><button onClick={() => { setShowAddressForm(!showAddressForm) }} className=' w-48 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>Add Shipping Details</button></div>
            <div className={`${(showAddressForm) ? 'flex' : 'hidden'} items-center justify-center w-full`}>
                <div className='flex justify-center flex-col w-full'>
                    <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4 my-5'>Add Shipping Details</h1>
                    <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="name">Name</label>
                    <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='name' placeholder='Enter your name' type="text" id='name' />
                    <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="houseNo">House No</label>
                    <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='houseNo' placeholder='Enter House No' type="text" id='houseNo' />
                    <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="address">Address</label>
                    <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='address' placeholder='Enter Address' type="text" id='address' />
                    <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="pinCode">Pin Code</label>
                    <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='pinCode' placeholder='Enter Pincode' type="number" id='pinCode' />
                    <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="city">City</label>
                    <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='city' placeholder='Enter City' type="text" id='city' />
                    <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="state">State</label>
                    <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='state' placeholder='Enter State' type="text" id='state' />
                    <label className='text-lg px-4 font-semibold text-main-800 mt-2' htmlFor="phoneNo">Phone No</label>
                    <input className='border-b border-main-800 py-1 bg-slate-200 outline-none px-4' name='phoneNo' placeholder='Enter Phone No' type="number" id='phoneNo' />
                    <button className=' bg-main-800 text-white text-xl font-semibold py-2 mt-4 hover:text-main-800 hover:bg-[#44b67721] border-2 border-main-800 transition-all duration-300 ease-in-out' >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default page
