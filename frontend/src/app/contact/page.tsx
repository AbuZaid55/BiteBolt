import React from 'react'

const page = () => {
  return (
    <div className='pt-[75px] bg-slate-200 pb-80 sm:pb-72 lg:pb-52'>
      <div className='flex w-full m-auto border sm:mt-0 mt-5 '>
        <div className='hidden md:flex w-1/2 p-4 items-center justify-center'><img className='w-[90%]' src="/img/about.png" alt="Pic" /></div>
        <form className='w-full md:w-1/2 p-4 flex flex-col'>
          <h1 className='text-3xl text-center font-bold text-main-800 mb-3 mt-2'>Contact Us</h1>
          <label className='mt-3 text-main-800' htmlFor="name">Name</label>
          <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='name' type="text" placeholder='Enter your Name' id='name' />
          <label className='mt-3 text-main-800' htmlFor="phone">Phone</label>
          <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='phone' type="text" placeholder='Enter phone no' id='phone' />
          <label className='mt-3 text-main-800' htmlFor="email">Email</label>
          <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='email' type="text" placeholder='Enter your email' id='email'/>
          <label className='mt-3 text-main-800' htmlFor="subject">Subject</label>
          <input className='w-full border-b border-main-800 mb-3 text-slate-700 outline-none bg-slate-200' name='subject' type="text" placeholder='Enter subject' id='subject' />
          <label className='mt-3 text-main-800' htmlFor="massage">Massage</label>
          <textarea className='w-full border-b border-main-800 mb-3 text-slate-700 resize-none outline-none bg-slate-200' name='massage' placeholder='Massage' id='massage' />
          <button className='  bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out text-xl' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default page
