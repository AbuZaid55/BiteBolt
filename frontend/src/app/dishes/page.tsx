import React from 'react'
import Card2 from '../components/Card2'
import Aside from '../components/Aside'

const page = () => {
  return (
    <div className='w-full min-h-[100vh] relative bg-slate-200'>
      <div><Aside/></div>
      <div className=' grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-5 lg:gap-5 mx-auto pb-10 px-2 sm:px-5 md:pl-10 lg:pl-[300px] md:pr-10 xl:pr-0 pt-28 xl:w-[90%] place-items-center'>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
        <Card2/>
      </div>
    </div>
  )
}

export default page
