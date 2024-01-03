import React from 'react'
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
        <div className='pt-[80px] bg-slate-200 text-slate-700 pb-96'>
            <div className={`w-full hidden items-center justify-center flex-col h-full min-h-[100vh]`}>
                <h1 className="text-5xl font-bold text-main-800">No Cart Item</h1>
                <Link href="/dishes" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Go to Shopping</Link>
            </div>
            <div className='border-t-2 my-4 border-slate-400'>
                <div className='flex items-center'>
                    <img className='w-[100px] h-full p-2' src="/img/1.png" alt="" />
                    <div>
                        <Link href="/details" className={`${robotoSlab.className} text-3xl`}>Testy Food</Link>
                        <h1 className={`flex items-center font-bold${robotoSlab.className}`}><FaIndianRupeeSign /> 199 <RxCross1 /> 5 = 1000 </h1>
                        <div className="flex">
                            <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded'>-</span>
                            <span className='mr-1 sm:mr-3 border border-main-800 text-main-800 text-lg w-6 h-6 flex items-center justify-center rounded'>{20}</span>
                            <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded'   >+</span>
                            <span className='text-red-800 border-2 border-red-800 w-6 h-6 rounded p-[2px] cursor-pointer'><GoTrash/></span>
                        </div>
                    </div>
                </div>
                <h1 className={`border-y-2 text-xl border-slate-400 py-2 px-4 flex items-center ${robotoSlab.className}`}>Total Amount :  <span className="text-main-800 flex items-center"><FaIndianRupeeSign /> 1000</span></h1>
                <div className="flex items-center justify-end pr-4"><Link href="/dishes" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">CHECK OUT</Link></div>
            </div>
        </div>
    )
}

export default page
