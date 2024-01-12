"use client"
import React from 'react'
import Card2 from '../components/Card2'
import Aside from '../components/Aside'
import { useAppSelector } from '../../../Redux/hook'
import InfiniteScroll from 'react-infinite-scroll-component'

const page = () => {
  const products = useAppSelector((state)=>state.product.filterProducts)
  console.log(products)
  const fetchMoreDate = async() => {

  }
  return (
    <div className='w-full min-h-[100vh] relative bg-slate-200'>
      <div><Aside/></div>
        <InfiniteScroll className='grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-5 lg:gap-5 mx-auto pb-10 px-2 sm:px-5 md:pl-10 lg:pl-[300px] md:pr-10 xl:pr-0 pt-28 xl:w-[90%] place-items-center w-full' dataLength={products.length} next={fetchMoreDate} hasMore={true} loader={<h1>Loading...</h1>}>
          {products.map((product)=><Card2 key={product._id} product={product}/>)}
        </InfiniteScroll>
    </div>
  )
}

export default page
