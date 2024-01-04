"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const page = () => {
    const [timer,setTimer]=useState(60)
    const [startTimer,setStartTimer]=useState(false)
    useEffect(()=>{
        if(startTimer){
            const interval = setInterval(()=>{
                if(timer>0){
                    setTimer(timer-1)
                }else{
                    setStartTimer(false)
                    setTimer(60)
                }
            },1000)
            return ()=>{
                clearInterval(interval)
            }
        }
    },[startTimer,timer])
  return (
    <div className=' bg-slate-200 pb-[350px] mb-[-350px] pt-[90px]'>
      <div className='w-full md:w-1/2 mx-auto p-4 pb-0 flex flex-col'>
        <h1 className='text-3xl text-center font-bold text-main-800 mb-3 mt-2'>Sign Up</h1>
        <label className='mt-3 text-main-800 font-semibold' htmlFor="name">Name</label>
        <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='name' type="text" placeholder='Enter your Name' id='name' />
        <label className='mt-3 text-main-800 font-semibold' htmlFor="email">Email</label>
        <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='email' type="text" placeholder='Enter your email' id='email' />
        <label className='mt-3 text-main-800 font-semibold' htmlFor="password">Password (between 8 to 12 character)</label>
        <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='password' type="text" placeholder='Enter your password' id='password'/>
        <label className='mt-3 text-main-800 font-semibold' htmlFor="confirm_pass">Confirm Password</label>
        <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='confirm_pass' type="text" placeholder='Enter confirm password' id='confirm_pass' />
        <div className='mt-3 relative'>
            <label className='text-main-800 font-semibold' htmlFor="otp">Otp</label>
            <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='otp' type="text" placeholder='Enter otp' id='otp' />
            <p className='text-slate-700 -mt-2 mb-2'>Otp will be send on your email id and valid only for 2 minutes</p>
            <button className=" bg-slate-700 text-white py-1 sm:py-2 rounded-md w-28 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out absolute top-0 right-0" disabled={startTimer} onClick={()=>{setStartTimer(true)}}>{(startTimer)?timer:"Send Otp"}</button>
        </div>
        <button className=' bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out text-xl' type='submit'>Submit</button>
      </div>
      <p className='text-slate-700 text-center pb-4'>Have an account? <Link className='text-main-800 font-semibold' href="/login">Login</Link></p>
  </div>
  )
}

export default page