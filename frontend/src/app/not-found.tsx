import React from 'react'
import { Roboto_Slab } from 'next/font/google'
import Link from 'next/link'

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: 'swap'
  })

const NotFound = () => {
  return (
    <div className='bg-slate-200 flex items-center justify-center flex-col pb-[350px] mb-[-350px] pt-[150px]'>
      <div className='flex items-center justify-center'>
        <img className='w-[2.25rem]' src="/logo.png" alt="logo" />
        <h1 className={` text-xl sm:text-3xl text-slate-700 ${robotoSlab.className}`}>BiteBolt</h1>
      </div>

      <div className='text-center text-slate-700 -mt-3'>
        <h1 className={` text-9xl ${robotoSlab.className}`}>404</h1>
        <p className='text-slate-500 text-2xl -mt-3'>Page Not Found</p>
      </div>

      <Link href="/" className='text-center bg-main-800 px-4 py-2 text-white rounded-full mt-6 cursor-pointer border-2 border-main-800 hover:text-main-800  hover:bg-[#44b67721] transition-all duration-300 ease-in-out shadow-lg'>Go to Homepage</Link>
    </div>
  )
}

export default NotFound
