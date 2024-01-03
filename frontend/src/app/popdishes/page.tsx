import React from 'react'
import Card1 from '../components/Card1'

const page = () => {
  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 lg:gap-10 mt-10 mx-auto px-3 bg-slate-200 pt-[75px] pb-[22rem] sm:pb-[20rem] place-items-center w-full">
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
      <Card1/>
    </div>
  )
}

export default page
