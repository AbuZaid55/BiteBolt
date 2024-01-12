"use client"
import React, {useEffect, useState} from 'react'
import Card1 from '../components/Card1'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { setPage } from '../../../Redux/Slice/productSlice'

const page = () => {
  const dispatch = useAppDispatch()
  const [hashMore,setHashMore]=useState(true)
  const products = useAppSelector((state)=>state.product.popularProduct)
  const page = useAppSelector((state)=>state.product.pageforpopularProduct)

  const setNextPage = async() => {
    if(page!=-1){
      dispatch(setPage(page+1))
    }else{
      setHashMore(false)
    }
  }

  useEffect(()=>{
    if(page==-1){
      setHashMore(false)
    }
  },[page])
  return (
    <>
    <InfiniteScroll className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 lg:gap-10 mt-10 mx-auto px-3 bg-slate-200 pt-[75px] pb-[350px] mb-[-350px] place-items-center w-full"
    dataLength={products.length} next={setNextPage} hasMore={hashMore} loader={<></>}>
      {
        products.map((product)=><Card1 key={product._id} product={product}/>)
      }
    </InfiniteScroll>
    <div className={` pt-8 ${(hashMore)?"":"hidden"}`}><div className='flex items-center justify-center'><span className="loader2"></span></div></div>
    </>
  )
}

export default page
