"use client"
import { useEffect, useState } from "react"
import {Roboto_Slab} from 'next/font/google'
import Card1 from "./components/Card1"

const robotoSlab = Roboto_Slab({
  weight:"500",
  subsets:["greek"],
  display:'swap'
})

export default function Home() {
  const [showImg,setShowImg]=useState(1)
  const imgPath:string[] = ['./img/3.png','./img/4.png','./img/1.png','./img/2.png']
  useEffect(()=>{
    const interval = setInterval(() => {
      if(showImg===4){
        setShowImg(1)
      }else{
        setShowImg(showImg+1)
      }
    }, 4000);
    return () => {
      clearInterval(interval)
    }
  },[showImg])
  return (
    <div className="overflow-hidden">
      <div className='h-[100vh] w-[100vw] overflow-hidden flex items-center justify-center'>
      <div className='sm:w-1/2 px-10'>
        <h1 className={`${robotoSlab.className} text-main-800 text-xl`}>ENJOY YOUR HEALTHY</h1>
        <h1 className="text-5xl font-bold text-slate-700 my-3"> DILICIOUS FOOD</h1>
        <p className=" text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt itaque quidem atque quis accusamus placeat incidunt perferendis!</p>
        <button className=" bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Order Now</button>
      </div>
      <div className="hidden sm:flex w-1/2 h-full items-center justify-center bg-slate-700" style={{borderRadius:"44% 56% 0% 100% / 63% 0% 100% 37% "}}>
        <div className="w-[95%] md:w-[75%] h-full flex items-center justify-center relative">
          {imgPath.map((path:string,i:number)=><img className={`${(showImg===i+1)?"springAnimation":'hidden'} w-full`} src={path} alt="Image" />)}
        </div>
      </div>
    </div>
    <div className=" bg-slate-100 pt-10">
      <h1 className={`${robotoSlab.className} text-main-800 text-xl text-center`}>Our Dishes</h1>
      <h1  className="text-4xl font-bold text-slate-700 my-3 text-center ">POPULAR DISHES</h1>
      <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 lg:gap-10 mt-10 max-w-[1000px] mx-auto px-3 pb-10">
          <Card1/>
          <Card1/>
          <Card1/>
          <Card1/>
          <Card1/>
          <Card1/>
      </div>
    </div>
    </div>
  )
}
