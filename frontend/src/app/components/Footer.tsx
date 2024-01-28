"use client"
import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import Wave from '../../../svgs/Wave';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const path = usePathname()
  const hidePath:string[] = ["/dishes"]
  return (
    <div>
      {
        (!hidePath.includes(path)) && !path.includes('/admin/') && <div className='w-full overflow-hidden'>
        <div className='m-[-5px] sm:mb-[-20px]'><Wave/></div> 
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10  md:grid-cols-4 lg:px-20 mx-auto py-7 bg-white'>
          <div className='flex items-center flex-col'>
            <h1 className='text-xl text-slate-700 font-bold mb-2'>LOCATION</h1>
            <p className=' text-slate-500 text-nowrap'>Chittan Pura Mau</p>
            <p className=' text-slate-500 text-nowrap'>Uttar Pardesh</p>
            <p className=' text-slate-500'>India</p>
          </div>
          <div className='flex items-center flex-col'>
            <h1 className='text-xl text-slate-700 font-bold mb-2'>WORKING HOURS</h1>
            <p className=' text-slate-500 text-nowrap'>Mon-Fri: 9:00AM - 10:00PM</p>
            <p className=' text-slate-500 text-nowrap'>Saturday: 10:00AM - 8:30PM</p>
            <p className=' text-slate-500 text-nowrap'>Sunday: 12:00AM - 5:00PM</p>
          </div>
          <div className='flex items-center flex-col'>
            <h1 className='text-xl text-slate-700 font-bold mb-2'>ORDER NOW</h1>
            <p className=' text-slate-500 text-nowrap'>Lorem ipsum dolor sit.</p>
            <h1 className='text-2xl text-main-800 font-bold text-nowrap'>+91 8005263514</h1>
          </div>
          <div className='flex items-center flex-col'>
            <h1 className='text-xl text-slate-700 font-bold mb-2'>FOLLOW US</h1>
            <p className=' text-slate-500 text-nowrap'>Lorem ipsum dolor sit.</p>
            <div className='flex text-2xl gap-3 mt-2'>
                <Link className='text-slate-600' href="https://www.instagram.com/its_abuzaid786/"><AiFillInstagram/></Link>
                <Link className='text-slate-600' href="https://github.com/AbuZaid55"><FaGithub/></Link>
                <Link className='text-slate-600' href="https://www.linkedin.com/in/abuzaid55/5"><FaLinkedin/></Link>
                <Link className='text-slate-600' href="https://discord.com/users/1127760530120114238"><FaDiscord/></Link>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center border-t bg-white border-slate-500 py-1 text-xl text-slate-500'>&#169; 2024 <h1 className=' text-main-800 font-bold mx-1'>BiteBolt</h1> <p>All Rights Reserved</p></div></div>
      }
    </div>
  )
}

export default Footer
