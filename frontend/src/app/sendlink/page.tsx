"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { SendLink } from '../../../Redux/asyncThunk'
import { useMyContext } from '../MyContextProvider'

const Page = () => {

  const { setLoader } = useMyContext()
  const dispatch = useAppDispatch()
  const [timer, setTimer] = useState(60)
  const [startTimer, setStartTimer] = useState(false)
  const [email, setEmail] = useState("")

  const submitForm = async () => {
    setLoader(true)
    const result = await dispatch(SendLink({ email }))
    if (result.meta.requestStatus === "fulfilled") {
      setEmail("")
      setStartTimer(true)
    }
    setLoader(false)
  }

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
    <div className='flex items-center justify-center flex-col bg-slate-200 pb-[350px] mb-[-350px] pt-[120px]'>
        <div className='w-full md:w-1/2 mx-auto p-4 flex flex-col'>
          <h1 className='text-3xl text-center font-bold text-main-800 mb-3 mt-2'>Send Reset Link</h1>
          <label className='mt-3 text-main-800 font-semibold' htmlFor="email">Email</label>
          <input onChange={(e)=>{setEmail(e.target.value)}} className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='email' type="text" placeholder='Enter your email' id='email'/>
          <p className='text-slate-700 -mt-2 mb-2'>Link is valid only for 2 minutes</p>
          <button className=" w-full bg-main-800 text-white py-2 rounded-full my-4  border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out text-xl" disabled={startTimer} onClick={()=>{submitForm()}}>{(startTimer)?timer:"Send Otp"}</button>
        </div>
        <div className='flex items-center justify-between w-full md:w-1/2 mx-auto px-4 pb-4'>
          <p className='text-slate-700 text-center'>New User? <Link className='text-main-800 font-semibold' href="/signup">Sign Up</Link></p>
          <p className='text-slate-700 text-center'>Have an account? <Link className='text-main-800 font-semibold' href="/login">Login</Link></p>
        </div>
      </div>
  )
}

export default Page

