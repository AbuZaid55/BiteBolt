"use client"
import React, {useState} from 'react'
import { Roboto_Slab } from "next/font/google"
import { FaTrash} from "react-icons/fa";
import AdminSiderbar from '@/app/components/AdminSiderbar'
import { FaAngleDown, FaAngleUp} from 'react-icons/fa';
import Link from 'next/link';

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
})

const page = () => {
    const [showSubCat, setShowSubCat] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    type Catrgory = {
        [key: string]: string[];
    };
    const category: Catrgory = {
        Electorinc: ["Mobile", "Laptop", "Bluetooth"],
        Man: ["Mobile", "Laptop", "Bluetooth"],
        Women: ["Mobile", "Laptop", "Bluetooth"],
        "TV's&Application": ["Mobile", "Laptop", "Bluetooth"],
        "Sports&More": ["Mobile", "Laptop", "Bluetooth"],
        "Baby&Kids": ["Mobile", "Laptop", "Bluetooth"],
    }
  return (
    <div className='flex'>
      <AdminSiderbar/>
      <div className='w-full text-slate-700 bg-slate-200 min-h-[100vh] pl-20 sm:pl-24 pr-4'>
        <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800 `}>Category</h1>
        <div className='text-white '>
          {
            Object.keys(category).map((key: string, index: number) => {
              return <div key={index}>
                <h1 className='flex items-center justify-between bg-white text-slate-700 py-2 px-4 text-xl cursor-pointer border-b-2' onClick={() => { setShowSubCat((key === showSubCat) ? '' : key) }}>{key}
                  {(showSubCat === key) ? <FaAngleDown /> : <FaAngleUp />}
                </h1>
                {
                  category[key].map((value: string, i: number) => {
                    return <div key={i}>
                      {
                        (showSubCat === key) && <div className='flex items-center justify-between bg-slate-300 text-xl text-slate-700 px-8 py-1 border-b border-slate-400 cursor-pointer' >{value}<FaTrash onClick={()=>{setShowConfirm(true)}} className="text-red-700 hover:text-red-800 transition-all duration-300 ease-in-out"/></div>
                      }
                    </div>
                  })
                }
              </div>
            })
          }
        </div>
        <div className='mt-5 flex items-center justify-end px-5'> <Link href="/admin/addcategory" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Add Category</Link></div>

        <div className={`${(showConfirm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full h-full items-center justify-center bg-[#3341557f]`}>
        <div className=' w-56 h-56 border p-4  bg-white rounded  flex items-stretch justify-between flex-col border-main-800 shadow-lg'>
          <h1 className=' text-center text-2xl'>Are your sure you want to delete?</h1>
          <p className='text-red-700 -mt-5'>*All Products will be delete of this sub category</p>
          <div className='flex items-center justify-between'>
            <button className=' bg-red-700 text-white px-3 py-2 rounded hover:bg-[#3341551f] border-2 border-red-700 hover:text-red-700 transition-all duration-300 ease-in-out'>YES</button>
            <button className=' bg-main-800 text-white px-3 py-2 rounded hover:bg-[#44b67721] border-2 border-main-800 hover:text-main-800 transition-all duration-300 ease-in-out' onClick={()=>{setShowConfirm(false)}}>NO</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default page
