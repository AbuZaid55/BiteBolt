import React from 'react'
import Card3 from '../components/Card3'
import Link from 'next/link'

const page = () => {
  return (
    <div className='mt-10 mx-auto px-3 bg-slate-200 pb-[350px] mb-[-350px]'>
      <div className={`w-full hidden items-center justify-center flex-col h-full pt-52`}>
        <h1 className="text-5xl font-bold text-main-800 text-center">No Items</h1>
        <Link href="/dishes" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Go to Shopping</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 lg:gap-10  place-items-center pt-[80px]">
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
        <Card3 />
      </div>
    </div>
  )
}

export default page
