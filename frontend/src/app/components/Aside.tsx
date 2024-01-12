"use client"
import React, { useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { FaAngleDown, FaAngleUp, FaStar, FaRupeeSign } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { clearAllFilter, setFilterDetails } from '../../../Redux/Slice/productSlice';

interface GET_FILTERPRODUCT {
  page:number,
  selectedCat:{
      category:string,
      subCategory:string,
  }[]
  filterPrice:number,
  filterRating:number,
}

const Aside = () => {

  const dispatch = useAppDispatch()
  const category = useAppSelector((state)=>state.category)
  const categories = category.categories
  const highestPrice = category.highestPrice
  const [showFilter, setShowFilter] = useState(false)
  const [showSubCat, setShowSubCat] = useState('')
  const [filterPrice, setFilterPrice] = useState(0)
  const [filterRating, setFilterRating] = useState(0)
  const [controlChange,setControlChage]=useState(0)
  const [itemId,setTimeId]=useState<any>('')
  const [selectedCat,setSelectCat]=useState<{category:string;subCategory:string}[]>([])

  const handleFilterCat = (e:any,object:{category:string;subCategory:string})=>{
    if(e.target.checked){
      setSelectCat([...selectedCat,object])
    }else{
      const newList = selectedCat.filter((currVal)=>(!(currVal.category===object.category && currVal.subCategory===object.subCategory)))
      setSelectCat(newList)
      }
  }

  const clearFilters = ()=>{
    setSelectCat([]),
    setFilterPrice(highestPrice),
    setControlChage(highestPrice),
    setFilterRating(0),
    setShowSubCat('')
    dispatch(clearAllFilter())
  }

  useEffect(()=>{
    if(highestPrice!=0 && controlChange!=highestPrice){
      setControlChage(highestPrice)
    }
  },[highestPrice])
  useEffect(()=>{
    clearTimeout(itemId)
    const timeId = setTimeout(()=>{
      setFilterPrice(controlChange)
    },1000)
    setTimeId(timeId)
  },[controlChange])
  useEffect(()=>{
    const appliedFilters = {page:1,selectedCat,filterPrice,filterRating}
    if(highestPrice!=0 ){
      dispatch(setFilterDetails(appliedFilters))
    }
  },[selectedCat,filterRating,filterPrice])
  return (
    <div className={`lg:left-0 w-[260px] xl:w-[300px] h-full bg-slate-400 fixed top-0 z-40 ${(showFilter) ? "left-[0]" : "left-[-260px] lg:left-0"} transition-all duration-300 ease-in-out`}>
      <div className='lg:hidden text-white p-2 text-2xl absolute left-full top-[75px] bg-slate-400 rounded-r-md cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out' onClick={() => { setShowFilter(!showFilter) }}><FaFilter /></div>

      <div className='h-full pt-[75px] scrollbar-hide overflow-y-scroll'>

        <div className={`text-white mt-5 ${(selectedCat.length==0 && controlChange===highestPrice && filterRating===0)?"hidden":""}`}>
          <h1 className='text-3xl font-bold px-4 mb-2'>Applied Filters</h1>
          {selectedCat.map((object,i)=><p key={i} className='mx-2 px-2 mt-1 bg-white py-1 rounded-full text-slate-700'>{object.subCategory}</p>)}
          <p className={`items-center mx-2 px-2 mt-1 bg-white py-1 rounded-full text-slate-700 ${(filterRating===0)?"hidden":"flex"}`}>{filterRating} <FaStar className='mx-1 text-base' /> & above</p>
          <p className={`items-center mx-2 px-2 mt-1 bg-white py-1 rounded-full text-slate-700 ${(controlChange===highestPrice)?"hidden":"flex"}`}><FaRupeeSign />{filterPrice}</p>
        </div>

        <div className={`text-white ${(categories.length==0)?"hidden":''}`}>
          <h1 className='text-3xl font-bold px-4 mt-3 mb-2'>Category</h1>
          {
            categories.map((object) => {
              return object.subCategories.length>0 && <div key={object._id}>
                <h1 className='flex items-center justify-between bg-white text-slate-700 py-2 px-4 text-xl cursor-pointer border-b-2' onClick={() => { setShowSubCat((object.name === showSubCat) ? '' : object.name) }}>{object.name}
                  {(showSubCat === object.name) ? <FaAngleDown /> : <FaAngleUp />}
                </h1>
                {
                  object.subCategories.map((object2) => {
                    return <div key={object2._id}>
                      {
                        (showSubCat === object.name) && <label className='flex items-center bg-slate-300 text-xl text-slate-700 px-8 py-1 border-b border-slate-400 cursor-pointer' htmlFor={`checkbox${object._id}${object2._id}`}>
                          <input onChange={(e)=>{handleFilterCat(e,{category:object.name,subCategory:object2.name})}} checked={selectedCat.some(item=>item.category===object.name && item.subCategory===object2.name)} className='mr-2 text-3xl w-4 h-4' type="checkbox" id={`checkbox${object._id}${object2._id}`} />
                          {object2.name}
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
            <input className=' w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer' type="range" min={0} max={highestPrice} value={controlChange} onChange={(e) => { setControlChage(parseInt(e.target.value, 10)) }} />
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
          <button className='bg-white px-20 text-xl border-2 border-white shadow-md rounded-md text-slate-700 py-1 mt-5 mb-20 hover:text-white hover:bg-[#ffffff2b] transition-all duration-300 ease-in-out' onClick={()=>{clearFilters()}}>Clear All</button>
        </div>

      </div>
    </div>
  )
}

export default Aside
