"use client"
import React, { useEffect, useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Roboto_Slab } from 'next/font/google'
import { IoLocation } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { useRouter } from 'next/navigation';
import { useMyContext } from '../MyContextProvider';
import { GetOrders } from '../../../Redux/asyncThunk';

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: 'swap'
})



const page = () => {

    const user = useAppSelector((state)=>state.user)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {setLoader}=useMyContext()
    const [orders,setOrders]=useState([])

    const getOrders = async()=>{
        setLoader(true)
        const result = await dispatch(GetOrders())
        if(result.payload.data){
            setOrders(result.payload.data)
        }
        setLoader(false)
    }
    
    useEffect(()=>{
        if(!user._id){
            router.push('/login')
        }else{
            if(user._id!="1"){
                getOrders()
            }
        }
    },[user])
    return (
        <div className='bg-slate-200 text-slate-700 pb-[350px] mb-[-350px]'>
            <div className={`w-full ${(orders.length<=0)?"flex":"hidden"} items-center justify-center flex-col pt-52`}>
                <h1 className="text-5xl font-bold text-main-800">No Orders</h1>
                <Link href="/dishes" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Go to Shopping</Link>
            </div>
            <div className={`pt-[80px] ${(orders.length<=0)?"hidden":""} border-2 my-4 shadow-lg`}>
               {
                orders.map((order:any)=>{
                    return  <div key={order._id} className='bg-white mt-5'>
                    <div className='bg-main-800 py-2 px-4 text-white flex items-center justify-between'>
                        <h1>Order Id: {order._id}</h1>
                        <Link href={`/traking?_id=${order._id}`} className='flex items-center border py-1 px-4 gap-1'><IoLocation /> Track</Link>
                    </div>
                    {
                        order.item.map((item:any)=>{
                            return <div  key={item._id} className='flex items-center border-x-2 border-slate-700'>
                            <img className='w-[100px] h-full p-2' src={item.productId.thumbnail.secure_url} alt="Image" />
                            <div>
                                <Link href={`/details?_id=${item.productId._id}`} className={`${robotoSlab.className} text-3xl`}>{item.productId.name}</Link>
                                <h1 className={`flex items-center font-bold${robotoSlab.className} mt-2`}><FaIndianRupeeSign /> {item.productId.price} <RxCross1 /> {item.qty} = {item.productId.price*item.qty} </h1>
                            </div>
                        </div>
                        })
                    }
                    <div className='flex items-center gap-3 border-2 border-b-0  border-slate-700 py-2 px-4'>
                        <Link className='flex items-center border-2 border-main-800 text-main-800 rounded-md px-3' href="/editorder"><CiEdit /> Edit</Link>
                        <button className='flex items-center border-2 border-red-800 text-red-800 rounded-md px-3'><RxCross1 /> Cancle</button>
                    </div>
                    <h1 className={`border-2 text-xl border-slate-700 py-2 px-4 flex items-center ${robotoSlab.className}`}>Total Paid Amount :  <span className="text-main-800 flex items-center"><FaIndianRupeeSign /> {order.totalPaidAmount}</span></h1>
                </div>
                })
               }
            </div>
        </div>
    )
}

export default page
