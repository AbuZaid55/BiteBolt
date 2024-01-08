import React from 'react'
import { Roboto_Slab } from "next/font/google"

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
  })

const AddressCard = (props:any) => {
    return (
        <div className='bg-white text-slate-700 border-2 border-slate-700 shadow-lg p-4 rounded-md'>
            <h1 className={`text-2xl font-bold ${robotoSlab.className}`}>{props.data.name}</h1>
            <p className='h-6 overflow-hidden  text-nowrap'>{props.data.address}</p>
            <p className='h-6 overflow-hidden  text-nowrap'>{props.data.city } { props.data.state}</p>
            <p className='h-6 overflow-hidden  text-nowrap'>{props.data.pinCode}</p>
            <p className={`h-6 overflow-hidden  text-nowrap font-semibold text-lg ${robotoSlab.className}`}>Phone No:- {props.data.phoneNo}</p>
        </div>
    )
}

export default AddressCard
