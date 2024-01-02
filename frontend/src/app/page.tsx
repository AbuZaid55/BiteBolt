"use client"
import { useEffect, useState } from "react"
import { Roboto_Slab } from "next/font/google"
import Card1 from "./components/Card1"
import Card2 from "./components/Card2"
import { FaTruck } from "react-icons/fa"
import { FaDollarSign } from "react-icons/fa"
import { FaHeadset } from "react-icons/fa6"
import Link from "next/link"

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: "swap",
})

export default function Home() {
  const [showImg, setShowImg] = useState(1)
  const imgPath: string[] = ["./img/3.png", "./img/4.png", "./img/1.png", "./img/2.png"]
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
    <div className="overflow-hidden">
      <section className="h-[100vh] w-[100vw] overflow-hidden flex items-center justify-center">
        <div className="sm:w-1/2 px-10">
          <h1 className={`${robotoSlab.className} text-main-800 text-xl`}>ENJOY YOUR HEALTHY</h1>
          <h1 className="text-5xl font-bold text-slate-700 my-3"> DILICIOUS FOOD</h1>
          <p className=" text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt itaque quidem atque quis accusamus placeat incidunt perferendis!</p>
          <button className=" bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Order Now</button>
        </div>
        <div className="hidden sm:flex w-1/2 h-full items-center justify-center bg-slate-700" style={{ borderRadius: "44% 56% 0% 100% / 63% 0% 100% 37% " }}>
          <div className="w-[90%] md:w-[75%] h-full flex items-center justify-center relative">
            {imgPath.map((path: string, i: number) => (
              <img className={`${showImg === i + 1 ? "springAnimation" : "hidden"} w-full`} src={path} alt="Image" />
            ))}
          </div>
        </div>
      </section>
      {/* Dishes Section  */}
      <section className=" bg-slate-200 pt-10">
        <h1 className={`${robotoSlab.className} text-main-800 text-xl text-center`}>Our Dishes</h1>
        <h1 className="text-4xl font-bold text-slate-700 my-3 text-center ">POPULAR DISHES</h1>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 lg:gap-10 mt-10 lg:max-w-[90%] xl:max-w-[70%] mx-auto px-3 pb-10">
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
          <Card1 />
        </div>
        <div className="w-full flex itemc justify-center">
          <Link href="/populardishes" className="text-center bg-slate-700 text-white w-52 py-2 rounded-full my-4 cursor-pointer border-2 border-slate-700 hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out mb-10">See More</Link>
        </div>
      </section>
      {/* About Section  */}
      <section className="w-full mb-6">
        <h1 className={`${robotoSlab.className} text-main-800 text-xl text-center mt-10`}>About Us</h1>
        <h1 className="text-4xl font-bold text-slate-700 my-3 text-center ">WHY CHOOSE US?</h1>
        <div className="w-full flex items-center justify-center">
          <div className="w-1/2 hidden sm:block">
            <img className="w-[90%] lg:w-[70%]" src="./img/about.png" alt="Image" />
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
      <section className=" pt-10 bg-slate-200 pb-80 sm:pb-64 md:pb-56 lg:pb-44">
        <h1 className={`${robotoSlab.className} text-main-800 text-xl text-center`}>Our Menu</h1>
        <h1 className="text-4xl font-bold text-slate-700 my-3 text-center">TODAY'S SPECIALITY</h1>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-5 lg:gap-10 mt-10 lg:max-w-[90%] xl:max-w-[70%] mx-auto px-3 pb-10">
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
          <Card2 />
        </div>
        <div className="w-full flex itemc justify-center">
          <Link href="/dishes" className="text-center bg-slate-700 text-white w-52 py-2 rounded-full my-4 cursor-pointer border-2 border-slate-700 hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out mb-10">See More</Link>
        </div>
      </section>
    </div>
  )
}
