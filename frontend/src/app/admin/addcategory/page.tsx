"use client"
import React, { useEffect, useState } from 'react'
import AdminSiderbar from '../../../components/AdminSiderbar'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { useMyContext } from '@/app/MyContextProvider'
import { AddNewCategory, AddSubCategory } from '../../../Redux/asyncThunk'
import { useRouter } from 'next/navigation'

const Page = () => {
  const {setLoader}=useMyContext()
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state)=>state.category.categories)
  const [category,setCategory] = useState('')
  const [selectedCat,setSelectedCat]=useState('')
  const [subCategory,setSubCategory]=useState('')
  const user = useAppSelector((state)=>state.user)
  const router = useRouter()

  const submitCategory = async() =>{
    setLoader(true)
    const result = await dispatch(AddNewCategory({category}))
    if(result.meta.requestStatus==="fulfilled"){
      setCategory('')
    }
    setLoader(false)
  }

  const submitSubCategory = async() =>{
    setLoader(true)
    const result = await dispatch(AddSubCategory({category:selectedCat,subCategory:subCategory}))
    if(result.meta.requestStatus==="fulfilled"){
      setSelectedCat('')
      setSubCategory('')
    }
    setLoader(false)
  }
  useEffect(()=>{
      if(user._id!=="1" && !user.admin){
        router.push('/login')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  return (
    <div className='flex'>
      <AdminSiderbar />
      <div className='pl-20 sm:pl-24 pr-4 w-full min-h-[100vh] text-slate-700 bg-slate-200'>
        <div >
          <h1 className={`font-robotoSlab text-3xl sm:text-5xl text-center my-6 text-main-800`}>Add Category</h1>

          <div >
            <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter Category Name</label>
            <input value={category} onChange={(e)=>{setCategory(e.target.value)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter Category Name" name='category' />
          </div>
          <div className='flex items-center justify-between w-full gap-4'>
            <button onClick={()=>{submitCategory()}} className=" text-center bg-main-800 text-white px-4 py-2 rounded-md my-4 cursor-pointer border-2 w-full border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Add</button>
          </div>
        </div>

        <div>
          <h1 className={`font-robotoSlab text-4xl sm:text-5xl text-center my-6 text-main-800`}>Add SubCategory</h1>

          <div >
            <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Select Category</label>
            <select value={selectedCat} onChange={(e)=>{setSelectedCat(e.target.value)}} className='block w-full text-slate-500 outline-none cursor-pointer bg-slate-200 border-b-2 border-main-800 text-xl'>
                <option value="" onChange={()=>{setSelectedCat('')}}>Select Category</option>
                {
                  categories.map((object)=>{
                    return <option key={object._id} value={object.name}>{object.name}</option>
                  })
                }
            </select>
          </div>
          <div className='mt-4'>
            <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter SubCategory Name</label>
            <input value={subCategory} onChange={(e)=>{setSubCategory(e.target.value)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter SubCategory Name" name='subCategory' />
          </div>
          <div className='flex items-center justify-between w-full gap-4'>
            <button onClick={()=>{submitSubCategory()}} className=" text-center bg-main-800 text-white px-4 py-2 rounded-md my-4 cursor-pointer border-2 w-full border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
