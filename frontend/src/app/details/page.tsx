"use client"
import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdShoppingCart } from "react-icons/md"
import ReviewCard from '../components/ReviewCard'
import Card2 from '../components/Card2'
import { Roboto_Slab } from 'next/font/google'

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: 'swap'
})

const page = () => {
  const [mainImgPath, setMainImgPath] = useState("/img/5.jpg")
  const [imgPath, setImgPath] = useState(["/img/5.jpg", "/img/1.png", "/img/2.png", "/img/blog1.jpg"])
  const [track, setTrack] = useState(0)

  return (
    <div className='pb-[350px] mb-[-350px] pt-[90px] bg-slate-200'>

      <section className='flex flex-col p-4 md:p-10 md:flex-row'>
        <div className='h-[50vh] md:h-auto md:w-1/2 flex items-center justify-center flex-col bg-cover bg-no-repeat bg-center relative md:mx-8' style={{ backgroundImage: `url(${mainImgPath})` }}>
          <div className='hidden md:flex items-center justify-center gap-3 absolute top-full flex-wrap'>
            {
              imgPath.map((path, index) => {
                return <img key={index} className={`${(path === mainImgPath) ? "border-main-800" : "border-slate-700"} w-[4rem] h-[4rem] object-contain border-2 mt-3 cursor-pointer`} onClick={() => { setMainImgPath(path) }} src={path} alt="Image" />
              })
            }
          </div>
        </div>
        <div className='flex md:hidden items-center justify-center gap-3 flex-wrap'>
          {
            imgPath.map((path, index) => {
              return <img key={index} className={`${(path === mainImgPath) ? "border-main-800" : "border-slate-700"} w-[4rem] h-[4rem] object-contain border-2 mt-3 cursor-pointer`} onClick={() => { setMainImgPath(path) }} src={path} alt="Image" />
            })
          }
        </div>
        <div className='md:w-1/2 mt-4 md:mt-auto'>
          <h1 className={`text-5xl font-bold text-slate-700 ${robotoSlab.className}`}>Testy Food</h1>
          <div className="flex items-center text-xl my-2">
            <FaStar className=" text-main-800" />
            <FaStar className=" text-main-800" />
            <FaStar className=" text-main-800" />
            <FaStar className=" text-main-800" />
            <FaStar className=" text-slate-700" />
          </div>
          <p className='text-slate-600'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestias nesciunt deserunt nihil accusantium deleniti quasi nostrum harum neque, necessitatibus, hic perspiciatis ea quis culpa. Repudiandae dolore laboriosam, adipisci asperiores quo quae facere quos, ratione nam voluptatem error deleniti illum voluptatum magnam in quasi facilis. Obcaecati quidem laborum consequuntur cumque!</p>
          <h1 className="flex items-center text-xl sm:text-4xl text-main-800 mt-4">
            <FaIndianRupeeSign />
            <span className=" font-bold">15.99</span>
          </h1>
          <div className="flex items-center">
            <h1 className=' font-bold text-slate-700 text-3xl mr-4 my-2'>Qty:- </h1>
            <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded'>-</span>
            <span className='mr-1 sm:mr-3 border border-main-800 text-main-800 text-lg w-6 h-6 flex items-center justify-center rounded'>{20}</span>
            <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded'   >+</span>
          </div>
          <button className=" bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
            <span className="mr-2">Add to Cart</span>
            <MdShoppingCart />
          </button>
        </div>
      </section>


      <section className='md:mt-20'>
        <div className='flex items-center justify-center translate-y-1/2 relative z-20'>
          <div className='border-2 border-slate-700 bg-white shadow-md rounded-md text-xl py-1 px-2'>
            <span className='relative '>
              <span className='px-4 cursor-pointer' onClick={() => { setTrack(0) }}>Details</span>
              <span className='px-4 cursor-pointer' onClick={() => { setTrack(50) }}>Reviews</span>
              <div className={`w-1/2 h-[2px] bg-main-800 relative bottom-1 transition-all duration-300 ease-in-out`} style={{ left: track + '%' }}></div>
            </span>
          </div>
        </div>

        <div className='w-full relative overflow-hidden z-10 border-t-2 border-slate-700 bg-slate-100'>
          <div className={`w-full p-8 text-xl text-slate-700 ${(track <= 25) ? "block" : "hidden"}`}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, hic aliquam? Ratione recusandae tempora sint fugit vero voluptatem, ut nesciunt unde, tempore eius debitis dolore aperiam ex minus excepturi natus odio deserunt ea. Quaerat non debitis cum totam unde nam commodi aperiam cumque necessitatibus deserunt ipsa, a optio animi cupiditate nemo earum, tempore ipsum aliquid doloremque accusantium repellat possimus culpa ab labore? Asperiores unde nam vero, facere alias voluptates nulla corporis, dolorum natus sapiente esse error maxime. Distinctio voluptates aspernatur illum rerum possimus alias dignissimos necessitatibus obcaecati perferendis mollitia quod laboriosam vero a minima excepturi, totam aliquid? Aliquid, quos deserunt quasi culpa adipisci fugit asperiores. Earum cupiditate quasi ut molestias totam iusto? Officiis ipsum mollitia impedit, molestias totam ad iste commodi dolore sit corporis id facilis accusamus dolores dolorum ducimus praesentium maxime consequatur autem atque minus, dicta reiciendis aut molestiae nam! Nulla perspiciatis dolore aut, dicta suscipit, laudantium ipsa accusamus quia eaque dolorum nihil id fugit ut cumque vel maxime qui doloribus rerum voluptatem excepturi! Deserunt officiis dolorum voluptas eum dolores repudiandae laudantium sed aliquam aut neque? Sit architecto dolorum perspiciatis, distinctio illo culpa fugiat ducimus quae quod natus, cumque placeat, facere possimus facilis? Aliquam vero maiores vel adipisci consectetur.
          </div>

          <div className={`w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-4 ${(track > 25) ? "block" : "hidden"}`} >
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
      </section>
      
      <section>
          <h1 className={`text-3xl font-bold text-slate-700 py-4 px-4 md:px-8 ${robotoSlab.className}`}>Similar Products</h1>
          <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 lg:gap-10 place-items-center px-4'>
            {/* <Card2/>
            <Card2/>
            <Card2/>
            <Card2/>
            <Card2/> */}
          </div>
      </section>
    </div>
  )
}

export default page
