"use client"
import React, { useState } from 'react'
import { useAppDispatch } from '../../../Redux/hook'
import { useMyContext } from '../MyContextProvider'
import { Contact } from '../../../Redux/asyncThunk'
import Image from 'next/image'

const Page = () => {
  const [data,setData]=useState({name:'',email:'',phoneNo:'',subject:'',message:''})
  const dispatch =useAppDispatch()
  const {setLoader}=useMyContext()
  const handleInput = (e:any)=>{
    setData((pre)=>({...pre,[e.target.name]:e.target.value}))
  }
  const submitForm = async(e:any)=>{
    e.preventDefault()
    setLoader(true)
    const result = await dispatch(Contact(data))
    if(result.meta.requestStatus==="fulfilled"){
      setData({name:'',email:'',phoneNo:'',subject:'',message:''})
    }
    setLoader(false)
  }
  return (
    <div className='pt-[75px] bg-slate-200 pb-[350px] mb-[-350px]'>
      <div className='flex w-full m-auto border sm:mt-0 mt-5 '>
        <div className='hidden md:flex w-1/2 p-4 items-center justify-center mt-4'><div className=' w-full md:w-[90%] lg:w-[80%] aspect-square relative'><Image fill={true} sizes='100%' priority={true}  src="/img/about.png" alt="Pic" /></div></div>
        <form className='w-full md:w-1/2 p-4 flex flex-col justify-center' onSubmit={(e)=>{submitForm(e)}}>
          <h1 className='text-3xl text-center font-bold text-main-800 mb-3 mt-2'>Contact Us</h1>
          <label className='mt-3 text-main-800 font-semibold' htmlFor="name">Name</label>
          <input value={data.name} onChange={(e)=>{handleInput(e)}} className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='name' type="text" placeholder='Enter your Name' id='name' />
          <label className='mt-3 text-main-800 font-semibold' htmlFor="email">Email</label>
          <input value={data.email} onChange={(e)=>{handleInput(e)}} className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='email' type="text" placeholder='Enter your email' id='email'/>
          <label className='mt-3 text-main-800 font-semibold' htmlFor="phone">Phone</label>
          <input value={data.phoneNo} onChange={(e)=>{handleInput(e)}} className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='phoneNo' type="text" placeholder='Enter phone no' id='phone' />
          <label className='mt-3 text-main-800 font-semibold' htmlFor="subject">Subject</label>
          <input value={data.subject} onChange={(e)=>{handleInput(e)}} className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='subject' type="text" placeholder='Enter subject' id='subject' />
          <label className='mt-3 text-main-800 font-semibold' htmlFor="massage">Massage</label>
          <textarea value={data.message} onChange={(e)=>{handleInput(e)}} className='w-full border-b border-main-800 mb-3 text-slate-700 resize-none outline-none bg-slate-200' name='message' placeholder='Massage' id='massage' />
          <button className=' bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out text-xl' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Page
