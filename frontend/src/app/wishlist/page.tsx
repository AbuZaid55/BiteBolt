"use client"
import React, { useEffect, useState } from 'react'
import Card3 from '../components/Card3'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { GetWishListItems, RemoveWishlistItem } from '../../../Redux/asyncThunk'
import { useMyContext } from '../MyContextProvider'

interface Product {
  _id:string,
  name:string,
  description:string,
  rating:number,
  price:number,
  thumbnail:{secure_url:string}
}

const page = () => {
  
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {setLoader}=useMyContext()
  const user = useAppSelector((state)=>state.user)
  const [item,setItems]=useState<Product[]>([])

  const getWishListItems = async()=>{
    setLoader(true)
    const result = await dispatch(GetWishListItems())
    if(result.payload && result.payload.data){
      setItems(result.payload.data)
    }
    setLoader(false)
  }

  const removeItem = async(productId:string)=>{
    setLoader(true)
    const result = await dispatch(RemoveWishlistItem({productId}))
    if(result.meta.requestStatus==="fulfilled"){
      const result = await dispatch(GetWishListItems())
      if(result.payload && result.payload.data){
        setItems(result.payload.data)
      }
    }
    setLoader(false)
}

  useEffect(()=>{
      if(!user._id){
        router.push('/login')
      }else{
        getWishListItems()
      }
  },[user])
  return (
    <div className='mt-10 mx-auto px-3 bg-slate-200 pb-[350px] mb-[-350px]'>
      <div className={`w-full ${(item.length<=0)?'flex':"hidden"} items-center justify-center flex-col h-full pt-52`}>
        <h1 className="text-5xl font-bold text-main-800 text-center">No Items</h1>
        <Link href="/dishes" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Go to Shopping</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 lg:gap-10  place-items-center pt-[80px]">
          {item.slice().reverse().map((product)=><Card3 key={product._id} product={product} removeItem={removeItem}/>)}
      </div>
    </div>
  )
}

export default page
