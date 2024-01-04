import React from "react"
import { FaStar } from "react-icons/fa"

const ReviewCard = () => {
  return (
    <div className="flex bg-white rounded-md shadow-lg border-2 border-slate-700">
      <div className="min-w-36 flex items-center justify-center">
        <div className="bg-cover bg-no-repeat bg-center w-3/4 h-3/4 rounded-full" style={{ backgroundImage: `url('/img/1.png')` }}></div>
      </div>
      <div className="h-36 p-4 overflow-y-auto scrollbar-hide">
        <h1 className="text-xl text-slate-700 font-bold pt-3">Abu Zaid</h1>
        <div className="flex items-center text-xl my-2">
          <FaStar className=" text-main-800" />
          <FaStar className=" text-main-800" />
          <FaStar className=" text-main-800" />
          <FaStar className=" text-main-800" />
          <FaStar className=" text-slate-700" />
        </div>
        <p className="text-slate-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium culpa obcaecati adipisci?</p>
      </div>
    </div>
  )
}

export default ReviewCard
