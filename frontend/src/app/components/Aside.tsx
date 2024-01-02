"use client"
import React, { useState } from 'react'
import { FaFilter } from "react-icons/fa";

const Aside = () => {
  const [showFilter,setShowFilter]=useState(false)
  return (
    <div className={`lg:left-0 w-[260px] xl:w-[300px] h-full bg-slate-400 fixed top-0 z-40 ${(showFilter)?"left-[0]":"left-[-260px] lg:left-0"} transition-all duration-300 ease-in-out`}>
        <div className='lg:hidden mt-[75px] text-white p-2 text-2xl absolute left-full bg-slate-400 -ml-1 rounded-r-md cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' onClick={()=>{setShowFilter(!showFilter)}}><FaFilter/></div>
    </div>
  )
}

export default Aside
