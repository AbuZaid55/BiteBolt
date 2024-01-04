"use client"
import React, { useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { FaAngleDown, FaAngleUp, FaStar, FaRupeeSign } from 'react-icons/fa';

const Aside = () => {
  const [showFilter, setShowFilter] = useState(false)
  const [showSubCat, setShowSubCat] = useState('')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [filterPrice, setFilterPrice] = useState(maxPrice)
  const [filterRating, setFilterRating] = useState(0)
  const [selectedCat,setSelectCat]=useState<string[]>([])

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
  const handleFilterCat = (e:any,cat:string)=>{
    if(e.target.checked){
      setSelectCat([...selectedCat,cat])
    }else{
      setSelectCat(selectedCat.filter((val) => val !== cat))
    }
  }
  return (
    <div className={`lg:left-0 w-[260px] xl:w-[300px] h-full bg-slate-400 fixed top-0 z-40 ${(showFilter) ? "left-[0]" : "left-[-260px] lg:left-0"} transition-all duration-300 ease-in-out`}>
      <div className='lg:hidden text-white p-2 text-2xl absolute left-full top-[75px] bg-slate-400 rounded-r-md cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' onClick={() => { setShowFilter(!showFilter) }}><FaFilter /></div>

      <div className='h-full pt-[75px] scrollbar-hide overflow-y-scroll'>

        <div className={`text-white mt-5 ${(selectedCat.length==0 && filterPrice===maxPrice && filterRating===0)?"hidden":""}`}>
          <h1 className='text-3xl font-bold px-4 mb-2'>Applied Filters</h1>
          {selectedCat.map((value,i)=><p key={i} className='mx-2 px-2 mt-1 bg-white py-1 rounded-full text-slate-700'>{value}</p>)}
          <p className={`items-center mx-2 px-2 mt-1 bg-white py-1 rounded-full text-slate-700 ${(filterRating===0)?"hidden":"flex"}`}>{filterRating} <FaStar className='mx-1 text-base' /> & above</p>
          <p className={`items-center mx-2 px-2 mt-1 bg-white py-1 rounded-full text-slate-700 ${(filterPrice===maxPrice)?"hidden":"flex"}`}><FaRupeeSign />{filterPrice}</p>
        </div>

        <div className='text-white '>
          <h1 className='text-3xl font-bold px-4 mt-3 mb-2'>Category</h1>
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
                        (showSubCat === key) && <label className='flex items-center bg-slate-300 text-xl text-slate-700 px-8 py-1 border-b border-slate-400 cursor-pointer' htmlFor={`checkbox${i}${index}`}>
                          <input onChange={(e)=>{handleFilterCat(e,`${key}.${value}`)}} checked={selectedCat.includes(`${key}.${value}`)?true:false} className='mr-2 text-3xl w-4 h-4' type="checkbox" id={`checkbox${i}${index}`} />
                          {value}
                        </label>
                      }
                    </div>
                  })
                }
              </div>
            })
          }
        </div>

        <div className='text-white'>
          <h1 className='text-2xl font-semibold px-3 py-2'>Price</h1>
          <div className='bg-white px-3 py-2'>
            <p className='flex items-center text-xl font-semibold text-slate-700'><FaRupeeSign />{filterPrice}</p>
            <input className=' w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' type="range" min={0} max={maxPrice} value={filterPrice} onChange={(e) => { setFilterPrice(parseInt(e.target.value, 10)) }} />
          </div>
        </div>

        <div className='text-white'>
          <h1 className='text-2xl font-semibold px-3  py-2'>Rating</h1>
          <div className='flex flex-col bg-white'>
            <label className='w-full px-4 py-1 border-t text-lg flex items-center cursor-pointer text-slate-700'><input className='mr-4 w-4 h-4' type="checkbox" checked={filterRating === 4} onChange={(e) => { (e.target.checked) ? setFilterRating(4) : setFilterRating(0) }} />4 <FaStar className='mx-1 text-base' /> & above</label>
            <label className='w-full px-4 py-1 border-t text-lg flex items-center cursor-pointer text-slate-700'><input className='mr-4 w-4 h-4' type="checkbox" checked={filterRating === 3} onChange={(e) => { (e.target.checked) ? setFilterRating(3) : setFilterRating(0) }} />3 <FaStar className='mx-1 text-base' /> & above</label>
            <label className='w-full px-4 py-1 border-t text-lg flex items-center cursor-pointer text-slate-700'><input className='mr-4 w-4 h-4' type="checkbox" checked={filterRating === 2} onChange={(e) => { (e.target.checked) ? setFilterRating(2) : setFilterRating(0) }} />2 <FaStar className='mx-1 text-base' /> & above</label>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <button className='bg-white px-20 text-xl border-2 border-white shadow-md rounded-md text-slate-700 py-1 mt-5 mb-20 hover:text-white hover:bg-[#ffffff2b] transition-all duration-300 ease-in-out' onClick={()=>{setSelectCat([]),setFilterPrice(maxPrice),setFilterRating(0)}}>Clear All</button>
        </div>

      </div>
    </div>
  )
}

export default Aside
