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
            <h1 className={`text-2xl font-bold ${robotoSlab.className}`}>Abu Zaid</h1>
            <p className='h-6 overflow-hidden  text-nowrap'>171/A Chittan pura mau near nai eidgha Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos nam iste nobis.</p>
            <p className='h-6 overflow-hidden  text-nowrap'>Mau Uttar Pardesh</p>
            <p className='h-6 overflow-hidden  text-nowrap'>275101</p>
            <p className={`h-6 overflow-hidden  text-nowrap font-semibold text-lg ${robotoSlab.className}`}>Phone No:- +91 8005263514</p>
            <p className={`h-6 overflow-hidden text-nowrap  font-semibold text-lg ${robotoSlab.className}`}>Email:- zaid70979@gmail.com</p>
        </div>
    )
}

export default AddressCard
