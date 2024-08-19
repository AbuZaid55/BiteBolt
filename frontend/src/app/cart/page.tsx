"use client"
import React, { useEffect, useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Roboto_Slab } from 'next/font/google'
import { GoTrash } from "react-icons/go";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../Redux/hook';
import { useRouter } from 'next/navigation';
import { DeleteCartItem, GetCartItems, UpdateQty } from '../../Redux/asyncThunk';
import { useMyContext } from '../MyContextProvider';
import Image from 'next/image';


const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: 'swap'
})

interface Items {
    items:{
        productId:{
            _id:string
            name:string,
            price:number,
            thumbnail:{secure_url:string}
        },
        qty:number
    }[],
    totalAmount:number,
}


const Page = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const {setLoader}=useMyContext()
    const user = useAppSelector((state)=>state.user)
    const [items,setItems]=useState<Items>({items:[],totalAmount:0})

    const getItems = async()=>{
        setLoader(true)
        const result = await dispatch(GetCartItems())
        if(result.payload && result.payload.data){
            setItems(result.payload.data)
        }
        setLoader(false)
    }
    const updateQty = async(opr:string,productId:string)=>{
        setLoader(true)
        await dispatch(UpdateQty({opr,productId}))
        const result = await dispatch(GetCartItems())
        if(result.payload && result.payload.data){
            setItems(result.payload.data)
        }
        setLoader(false)
    }
    const deleteCartItem = async(productId:string)=>{
        setLoader(true)
        await dispatch(DeleteCartItem({productId}))
        const result = await dispatch(GetCartItems())
        if(result.payload && result.payload.data){
            setItems(result.payload.data)
        }
        setLoader(false)
    }

    useEffect(()=>{
        if(!user._id){
            router.push('/login')
        }else{
            if(user._id!=="1"){
                getItems()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
    return (
        <div className='pt-[80px] bg-slate-200 text-slate-700 pb-[350px] mb-[-350px]'>
            <div className={`w-full ${(items.items.length<=0)?"flex":"hidden"} items-center justify-center flex-col h-full pt-52 `}>
                <h1 className="text-5xl font-bold text-main-800">No Cart Item</h1>
                <Link href="/dishes" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Go to Shopping</Link>
            </div>
            <div className=' my-4'>
                {
                    items.items.slice().reverse().map((item)=>{
                        return <div key={item.productId && item.productId._id} className='flex items-center bg-white border-2 border-slate-700 border-b-0 py-2'>
                        <Image width={100} height={100} priority={true} className='p-2' src={(item.productId)?item.productId.thumbnail.secure_url:'/img/5.jpg'} alt="Image" />
                        <div >
                            <Link href={`/details?_id=${item.productId && item.productId._id}`} className={`${robotoSlab.className} text-3xl`}>{item.productId && item.productId.name}</Link>
                            <h1 className={`flex items-center font-bold${robotoSlab.className}`}><FaIndianRupeeSign /> {item.productId && item.productId.price} <RxCross1 /> {item.qty} = {item.productId && item.qty*item.productId.price} </h1>
                            <div className="flex">
                                <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded' onClick={()=>{updateQty("sub",item.productId && item.productId._id)}}>-</span>
                                <span className='mr-1 sm:mr-3 border border-main-800 text-main-800 text-lg w-6 h-6 flex items-center justify-center rounded'>{item.qty}</span>
                                <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded' onClick={()=>{updateQty("add",item.productId && item.productId._id)}}>+</span>
                                <span className='text-red-800 border-2 border-red-800 w-6 h-6 rounded p-[2px] cursor-pointer' onClick={()=>{deleteCartItem(item.productId && item.productId._id)}}><GoTrash/></span>
                            </div>
                        </div>
                    </div>
                    })
                }
                <h1 className={`${(items.items.length==0)?"hidden":""} border-2 text-xl border-slate-700 bg-white py-2 px-4 flex items-center ${robotoSlab.className}`}>Total Amount :  <span className="text-main-800 flex items-center"><FaIndianRupeeSign /> {items.totalAmount}</span></h1>
            </div>
            <div className={`${(items.items.length==0)?"hidden":"flex"} items-center justify-end pr-4`}><Link href="/shipping" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out shadow-lg">CHECK OUT</Link></div>
        </div>
    )
}

export default Page
