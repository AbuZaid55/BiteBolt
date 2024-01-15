"use client"
import React from 'react'
import { Roboto_Slab } from "next/font/google"
import { GoTrash } from "react-icons/go";
import { usePathname } from 'next/navigation';

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
  })

const AddressCard = (props:any) => {
    const path = usePathname()
    return (
        <div className='bg-white text-slate-700 border-2 border-slate-700 shadow-lg p-4 rounded-md relative'>
            <span className={`${(path==="/confirm")?"hidden":""} absolute top-0 right-0 p-2 text-xl cursor-pointer text-red-700`}><GoTrash/></span>
            <h1 className={`text-2xl font-bold ${robotoSlab.className}`}>{props.data && props.data.name}</h1>
            <p className='h-6 overflow-hidden  text-nowrap'>{props.data && props.data.houseNo} {props.data && props.data.address}</p>
            <p className='h-6 overflow-hidden  text-nowrap'>{props.data && props.data.city } {props.data && props.data.state}</p>
            <p className='h-6 overflow-hidden  text-nowrap'>{props.data && props.data.pinCode}</p>
            <p className={`h-6 overflow-hidden  text-nowrap font-semibold text-lg ${robotoSlab.className}`}>Phone No:- {props.data && props.data.phoneNo}</p>
        </div>
    )
}

export default AddressCard
