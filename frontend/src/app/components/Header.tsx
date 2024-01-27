"use client"
import React, { RefObject, useEffect, useRef, useState } from "react"
import { IoSearchSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Roboto_Slab } from 'next/font/google'
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from "../../../Redux/hook";
import Image from "next/image";

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: 'swap'
})

const Header = () => {

  const ref:RefObject<HTMLUListElement> = useRef(null)
  const router = useRouter()
  const path = usePathname()
  const hidePath:string = "/admin/"
  const [openNav, setOpenNev] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [search,setSearch]=useState('')
  const user = useAppSelector((state)=>state.user)

  const submitForm = async(e:any) => {
    e.preventDefault()
    router.push(`/dishes?search=${search}`);
    setShowSearch(false)
    setSearch('')
  }
  const handleNavigate = async(path:string)=>{
    router.push(path)
    setOpenNev(false)
  }
  const handleClickOutside = (e:any) => {
      if (ref.current &&!ref.current.contains(e.target)) {
        setOpenNev(false)
      }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => removeEventListener('click', handleClickOutside)
  }, [])

  return (
   <div className=" select-none">
    {
      (!path.includes(hidePath) &&  <div className="h-[70px] shadow-md p-3 overflow-x-hidden fixed top-0 left-0 w-full bg-white z-50 ">
      <div className={`fixed ${(showSearch)?'top-0':'-top-full'} left-0 w-full h-[100vh] bg-[#3341557f] flex items-center justify-center transition-all duration-500 ease-in-out`}>
        <span className="text-white text-2xl absolute right-20 top-20 cursor-pointer bg-main-800 p-2 rounded-full hover:bg-[#399663] transition-all duration-300 ease-in-out shadow-lg" onClick={()=>{setShowSearch(false)}}><RxCross1/></span>
        <form className="w-full flex items-center justify-center" onSubmit={(e)=>{submitForm(e)}}>
        <input className="outline-none py-2 px-4 text-slate-700 text-xl max-w-[30rem] w-[50%] rounded-l-full shadow-2xl" type="text" placeholder="Search..." value={search} onChange={(e)=>{setSearch(e.target.value)}}/> 
        <button className="bg-main-800 text-white py-2 px-8 rounded-r-full text-xl hover:bg-[#399663] transition-all duration-300 ease-in-out shadow-lg" type="submit">Search</button> 
        </form>
      </div>
      <div className="h-full flex items-center justify-between">
        <div className="h-full flex items-center">
          <div className="w-[30px] h-[70%] sm:h-[80%] relative" > <Image fill={true} priority={true} sizes="100%" src="/logo.png" alt="logo" /></div>
          <Link href="/"><h1 className={`text-2xl sm:text-3xl text-slate-700 ${robotoSlab.className}`}>BiteBolt</h1></Link>
        </div>

        <div>
          <ul className="hidden lg:flex items-center justify-center text-xl">
            <Link href="/"><li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Home</li></Link>
            <Link href="/dishes"><li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Dishes</li></Link>
            <Link href="/orders"><li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Order</li></Link>
            <Link href="/contact"><li className=" hover:bg-main-800 hover:text-white cursor-pointer w-28 border-2 border-slate-700 hover:border-main-800 text-center py-2 mx-2 rounded-md transition-all duration-200 ease-in-out">Contact</li></Link>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-5 sm:text-xl">
          <span className=" hover:scale-125 bg-slate-200   hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md ">
            <IoSearchSharp onClick={() => { setShowSearch(!showSearch) }} />
          </span>
          <span className=" hover:scale-125 bg-slate-200 font-bold  hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md ">
            <Link href="wishlist"><FaRegHeart /></Link>
          </span>
          <span className=" hover:scale-125 bg-slate-200 font-bold  hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md ">
            <Link href="/cart"><MdOutlineShoppingCart /></Link>
          </span>
          <span className=" hover:scale-125 bg-slate-200 font-bold  hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md ">
            <Link href="/profile"><MdOutlineAccountCircle /></Link>
          </span>
          <span className={` ${(user.admin)?"hidden lg:block":"hidden"} hover:scale-125 bg-slate-200 font-bold  hover:bg-main-800 hover:text-white text-slate-700 p-2 rounded-full cursor-pointer transition-all duration-200 ease-in-out shadow-md `}>
            <Link href="/admin/dashboard"><RxDashboard /></Link>
          </span>
          <span className={`lg:hidden ${openNav ? "flex flex-col items-center justify-center rotate-90" : ""} cursor-pointer transition-all duration-200 ease-in-out`} onClick={() => { setOpenNev(!openNav) }}>
            <div className={`${openNav ? ' rotate-45' : "my-1"} h-[3px] sm:h-1 w-7 bg-slate-700 transition-all ease-in-out duration-200`}></div>
            <div className={`${openNav ? "hidden" : ""} h-[3px] sm:h-1 w-7 bg-slate-700 my-1`}></div>
            <div className={`${openNav ? '-my-1 -rotate-45' : "my-1"} h-[3px] sm:h-1 w-7 bg-slate-700 transition-all ease-in-out duration-200`}></div>
          </span>
        </div>
      </div>
      <ul ref={ref} className={`lg:hidden text-white fixed ${openNav ? 'right-0' : '-right-52'} z-50 top-[70px] bg-slate-700 shadow-lg mt-[2px] w-48 h-[calc(100vh-70px-2px)] flex flex-col items-center justify-center text-xl transition-all ease-in-out duration-300`}>
        <li onClick={()=>{handleNavigate('/')}} className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Home</li>
        <li onClick={()=>{handleNavigate('/dishes')}} className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Dishes</li>
        <li onClick={()=>{handleNavigate('/orders')}} className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Order</li>
        <li onClick={()=>{handleNavigate('/admin/dashboard')}} className={`${(user.admin)?"":"hidden"} w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out`}>Dashboard</li>
        <li onClick={()=>{handleNavigate('/contact')}} className="w-full text-center py-2 cursor-pointer hover:text-main-800 hover:scale-125 transition-all duration-200 ease-in-out">Contact</li>
      </ul>
    </div>)
    }
   </div>
  )
}

export default Header
