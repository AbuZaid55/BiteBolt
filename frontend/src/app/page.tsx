"use client"
import { useEffect, useState } from "react"
import Card1 from "../components/Card1"
import Card2 from "../components/Card2"
import { FaTruck } from "react-icons/fa"
import { FaDollarSign } from "react-icons/fa"
import { FaHeadset } from "react-icons/fa6"
import Link from "next/link"
import { useAppSelector } from "../Redux/hook"
import Image from "next/image"

export default function Home() {

  const state = useAppSelector((state)=>state.product)
  const products = state.product
  const popProduct = state.popularProduct
  const [showImg, setShowImg] = useState(1)
  const imgPath: string[] = ["/img/3.png", "/img/4.png", "/img/1.png", "/img/2.png"]
  useEffect(() => {
    const interval = setInterval(() => {
      if (showImg === 4) {
        setShowImg(1)
      } else {
        setShowImg(showImg + 1)
      }
    }, 4000)
    return () => {
      clearInterval(interval)
    }
  }, [showImg])

  
  return (
    <div className="overflow-hidden mb-[-350px]">
      <section className="h-[100vh] w-[100vw] overflow-hidden flex items-center justify-center">
        <div className="sm:w-1/2 px-10">
          <h1 className={`font-robotoSlab text-main-800 text-xl`}>ENJOY YOUR HEALTHY</h1>
          <h1 className="text-5xl font-bold text-slate-700 my-3"> DILICIOUS FOOD</h1>
          <p className=" text-slate-500 mb-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt itaque quidem atque quis accusamus placeat incidunt perferendis!</p>
          <Link href="/dishes" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Order Now</Link>
        </div>
        <div className="hidden sm:flex w-1/2 h-full items-center justify-center bg-slate-700" style={{ borderRadius: "44% 56% 0% 100% / 63% 0% 100% 37% " }}>
          <div className="w-[90%] md:w-[75%] h-full flex items-center justify-center relative">
            {imgPath.map((path: string, i: number) => (
              <div className={` aspect-square relative ${showImg === i + 1 ? "springAnimation" : "hidden"} w-full`} key={i}><Image fill={true} sizes="100%" priority={true} src={path} alt="Image" /></div>
            ))}
          </div>
        </div>
      </section>
      {/* Dishes Section  */}
      <section className=" bg-slate-200 pt-10">
        <h1 className={`font-robotoSlab text-main-800 text-xl text-center`}>Our Dishes</h1>
        <h1 className="text-4xl font-bold text-slate-700 my-3 text-center ">POPULAR DISHES</h1>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 lg:gap-10 mt-10 lg:max-w-[90%] xl:max-w-[70%] mx-auto px-3 pb-10 place-items-center">
              {
                popProduct.map((product:any,i)=>(i<6) && <Card1 key={product._id} product={product}/>)
              }
        </div>
        <div className="w-full flex itemc justify-center">
          <Link href="/popdishes" className="text-center bg-slate-700 text-white w-52 py-2 rounded-full my-4 cursor-pointer border-2 border-slate-700 hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out mb-10">See More</Link>
        </div>
      </section>
      {/* About Section  */}
      <section className="w-full mb-6">
        <h1 className={`font-robotoSlab text-main-800 text-xl text-center mt-10`}>About Us</h1>
        <h1 className="text-4xl font-bold text-slate-700 my-3 text-center ">WHY CHOOSE US?</h1>
        <div className="w-full flex items-center justify-center">
          <div className="w-1/2 hidden sm:block">
            <div className="w-[90%] lg:w-[70%] aspect-square relative" ><Image fill={true} sizes="100%" priority={true} src="/img/about.png" alt="Image" /></div>
          </div>
          <div className="sm:w-1/2 p-4  md:pr-20">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-700 my-3"> Best Food In The Country</h1>
            <p className=" text-slate-500 my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quas est nemo. Esse autem voluptatibus necessitatibus. Asperiores deleniti deserunt provident optio, voluptate quae ipsum possimus modi totam amet cum consequatur non qui at blanditiis? Eaque harum perspiciatis tenetur enim atque.</p>
            <div className="flex items-center flex-wrap mt-3">
              <button className="flex items-center justify-center text-lg gap-1 border border-slate-700 rounded-full w-44 cursor-pointer py-1 mt-1 mx-1 shadow-lg">
                <FaTruck className=" text-main-800" />
                Free Delivery
              </button>
              <button className="flex items-center justify-center text-lg gap-1 border border-slate-700 rounded-full w-44 cursor-pointer py-1 mt-1 mx-1 shadow-lg">
                <FaDollarSign className=" text-main-800" />
                Easy Payment
              </button>
              <button className="flex items-center justify-center text-lg gap-1 border border-slate-700 rounded-full w-44 cursor-pointer py-1 mt-1 mx-1 shadow-lg">
                <FaHeadset className=" text-main-800" />
                24/7 Service
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Menu Section  */}
      <section className=" pt-10 bg-slate-200 pb-80">
        <h1 className={`font-robotoSlab text-main-800 text-xl text-center`}>Our Menu</h1>
        <h1 className="text-4xl font-bold text-slate-700 my-3 text-center">TODAY&apos;S SPECIALITY</h1>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 lg:gap-10 mt-10 lg:max-w-[90%] xl:max-w-[70%] mx-auto px-3 pb-10 place-items-center">
          {
            products.map((product)=><Card2 key={product._id} product={product}/>)
          }
        </div>
        <div className="w-full flex itemc justify-center">
          <Link href="/dishes" className="text-center bg-slate-700 text-white w-52 py-2 rounded-full my-4 cursor-pointer border-2 border-slate-700 hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out mb-10">See More</Link>
        </div>
      </section>
    </div>
  )
}
