"use client"
import React, { useState } from 'react'
import AddressCard from '../components/AddressCard'
import AddAddressForm from '../components/AddAddressForm'

const page = () => {
    const [address, setAddress] = useState([1, 2, 3, 4])
    const [selected, setSelected] = useState(0)
    
    return (
        <div className='pb-[350px] mb-[-350px] bg-slate-200 pt-[75px]'>
            <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4'>Change Shipping Details</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 p-4 gap-4'>
                {address.map((value: number, i: number) => {
                    return <span key={i} onClick={() => { setSelected(i) }} className={`${(selected === i) ? " border-4" : ""} cursor-pointer border-main-800 rounded-xl`}><AddressCard /></span>
                })}
            </div>
            <div className='flex items-center justify-center'>
                <button className=" text-center bg-main-800 shadow-lg text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Update</button>
            </div>
            <AddAddressForm/>
        </div>
    )
}

export default page
