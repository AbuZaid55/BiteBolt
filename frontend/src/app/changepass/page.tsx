"use client"
import React, { useEffect,useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch } from '../../../Redux/hook'
import { ChangePass } from '../../../Redux/asyncThunk'
import { useMyContext } from '../MyContextProvider'

const Page = () => {

  const router = useRouter()
  const { setLoader } = useMyContext()
  const dispatch = useAppDispatch()
  const search = useSearchParams()
  const [input, setInput] = useState({ password: "", confirm_pass: "", token: "" })

  const submitForm = async () => {
    setLoader(true)
    const result = await dispatch(ChangePass(input))
    if (result.meta.requestStatus === "fulfilled") {
      setInput({ password: "", confirm_pass: "", token: "" })
      router.push('/')
    }
    setLoader(false)
  }

  useEffect(() => {
    const tokenn = search.get("token")
    if (search && tokenn) {
      setInput({ ...input, token: tokenn })
    }
  }, [])
  return (
    <div className='pt-[120px] bg-slate-200 pb-[350px] mb-[-350px] '>
        <div className='w-full md:w-1/2 p-4 flex flex-col mx-auto'>
          <h1 className='text-3xl text-center font-bold text-main-800 mb-3 mt-2'>Change Password</h1>
          <label className='mt-3 text-main-800 font-semibold' htmlFor="password">New Password (between 8 to 12 character)</label>
            <input onChange={(e)=>{setInput({...input,password:e.target.value})}} className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' type="text" placeholder='Enter your new password' id='password'/>
            <label className='mt-3 text-main-800 font-semibold' htmlFor="confirm_pass">Confirm Password</label>
            <input onChange={(e)=>{setInput({...input,confirm_pass:e.target.value})}} className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' type="text" placeholder='Enter confirm password' id='confirm_pass' />
          <button onClick={()=>{submitForm()}}  className='  bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out text-xl'>Submit</button>
        </div>
    </div>
  )
}

export default Page
