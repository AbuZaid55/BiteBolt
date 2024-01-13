"use client"
import React, { useEffect, useState } from 'react'
import Card2 from '../components/Card2'
import Aside from '../components/Aside'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import InfiniteScroll from 'react-infinite-scroll-component'
import { GetFilterProducts } from '../../../Redux/asyncThunk'
import { setHashMore } from '../../../Redux/Slice/productSlice'

const page = () => {

  const dispatch = useAppDispatch()
  const products = useAppSelector((state)=>state.product.filterProducts)
  const appliedFilter = useAppSelector((state)=>state.product.appliedFilter)
  const [page,setPage]=useState(1)
  const hashMore = useAppSelector((state)=>state.product.hashMore)

  const fetchMoreDate = async() => {
    const pageLimit = (process.env.NEXT_PUBLIC_PAGE_LIMIT)?process.env.NEXT_PUBLIC_PAGE_LIMIT:1000
    const result = await dispatch(GetFilterProducts({...appliedFilter,page:page+1}))
    if(result.payload.data.length < pageLimit){
      dispatch(setHashMore(false))
    }
    setPage(page+1)
  }

  useEffect(()=>{
    setPage(1)
  },[appliedFilter])

  
  return (
    <div className='w-full min-h-[100vh] relative bg-slate-200'>
      <div><Aside/></div>
        <InfiniteScroll className={`grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-5 lg:gap-5 mx-auto pb-10 px-2 sm:px-5 md:pl-10 lg:pl-[300px] md:pr-10 xl:pr-0 ${(products.length!=0)?'pt-28':'pt-10'} xl:w-[90%] place-items-center w-full`} dataLength={products.length} next={fetchMoreDate} hasMore={hashMore} loader={<></>}>
          {products.map((product)=><Card2 key={product._id} product={product}/>)}
        </InfiniteScroll>
        <div className={`md:pl-10 lg:pl-[300px] py-4 ${(hashMore)?"":"hidden"}`}><div className='flex items-center justify-center'><span className="loader2"></span></div></div>
    </div>
  )
}

export default page
