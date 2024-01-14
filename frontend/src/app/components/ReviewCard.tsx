"use client"
import React from "react"
import { FaStar } from "react-icons/fa"
import { GoTrash } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { useMyContext } from "../MyContextProvider";
import { DeleteReview } from "../../../Redux/asyncThunk";

type review={
  userId:{
    _id:string,
    name:string,
    profile:{secure_url:string}
  },
  rating:number,
  comment:string,
}

const ReviewCard = (props:{review:review,deleteReview:any}) => {

  const user = useAppSelector((state)=>state.user)
  const review = props.review

  return (
    <div className="flex bg-white rounded-md shadow-lg border-2 border-slate-700 relative">
      <div className={`${(review.userId._id===user._id)?'':'hidden'} absolute top-0 right-0 p-2 text-red-700 cursor-pointer`} onClick={()=>{props.deleteReview()}}><GoTrash/></div>
      <div className="min-w-36 flex items-center justify-center">
        <div className="bg-cover bg-no-repeat bg-center w-3/4 h-3/4 rounded-full" style={{ backgroundImage: `url(${review.userId.profile.secure_url})` }}></div>
      </div>
      <div className="h-36 p-4 overflow-y-auto scrollbar-hide">
        <h1 className="text-xl text-slate-700 font-bold pt-3">{review.userId.name}</h1>
        <div className="flex items-center text-xl my-2">
          <FaStar className={`${(review.rating>=1)?"text-main-800":"text-slate-700"}`} />
          <FaStar className={`${(review.rating>=2)?"text-main-800":"text-slate-700"}`} />
          <FaStar className={`${(review.rating>=3)?"text-main-800":"text-slate-700"}`} />
          <FaStar className={`${(review.rating>=4)?"text-main-800":"text-slate-700"}`} />
          <FaStar className={`${(review.rating>=5)?"text-main-800":"text-slate-700"}`} />
        </div>
        <p className="text-slate-700">{review.comment}</p>
      </div>
    </div>
  )
}

export default ReviewCard
