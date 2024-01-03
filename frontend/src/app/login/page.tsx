import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='flex items-center justify-center flex-col bg-slate-200 pb-[350px] mb-[-350px] pt-[90px]'>
        <div className='w-full md:w-1/2 mx-auto p-4 flex flex-col'>
          <h1 className='text-3xl text-center font-bold text-main-800 mb-3 mt-2'>Login</h1>
          <label className='mt-3 text-main-800 font-semibold' htmlFor="name">Name</label>
          <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='name' type="text" placeholder='Enter your Name' id='name' />
          <label className='mt-3 text-main-800 font-semibold' htmlFor="email">Email</label>
          <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='email' type="text" placeholder='Enter your email' id='email'/>
          <button className='  bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out text-xl' type='submit'>Submit</button>
        </div>
        <div className='flex items-center justify-between w-full md:w-1/2 mx-auto px-4 pb-4'>
          <p className='text-slate-700 text-center'>Forgot Password? <Link className='text-main-800 font-semibold' href="/sendlink">Click</Link></p>
          <p className='text-slate-700 text-center'>New User? <Link className='text-main-800 font-semibold' href="/signup">Sign Up</Link></p>
        </div>
      </div>
  )
}

export default page
