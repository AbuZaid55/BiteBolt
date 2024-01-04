import React from 'react'
import AddressCard from '../components/AddressCard'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Roboto_Slab } from 'next/font/google'
import { GoTrash } from "react-icons/go";
import Link from 'next/link';


const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: 'swap'
})

const page = () => {
    return (
        <div className='bg-slate-200 pb-[350px] mb-[-350px] pt-[75px]'>
            <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4'>Shipping Details</h1>
            <div className='my-2'><AddressCard /></div>
            <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4'>Your Cart Items</h1>
            <div className=' my-4'>
                <div className='flex items-center bg-white border-2 border-slate-700 border-b-0'>
                    <img className='w-[100px] h-full p-2' src="/img/1.png" alt="" />
                    <div >
                        <Link href="/details" className={`${robotoSlab.className} text-3xl`}>Testy Food</Link>
                        <h1 className={`flex items-center font-bold${robotoSlab.className}`}><FaIndianRupeeSign /> 199 <RxCross1 /> 5 = 1000 </h1>
                    </div>
                </div>
                <h1 className={`border-2 text-xl border-slate-700 bg-white py-2 px-4 flex items-center ${robotoSlab.className}`}>Total Amount :  <span className="text-main-800 flex items-center"><FaIndianRupeeSign /> 1000</span></h1>
            </div>
            <div className='flex items-center justify-center'>
                <button className=" text-center bg-main-800 shadow-lg text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Proceed to Payment</button>
            </div>
        </div>
    )
}

export default page
