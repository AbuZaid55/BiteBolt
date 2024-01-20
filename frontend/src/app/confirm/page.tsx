"use client"
import React, { useEffect, useState } from 'react'
import AddressCard from '../components/AddressCard'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Roboto_Slab } from 'next/font/google'
import Link from 'next/link';
import { useAppSelector,useAppDispatch } from '../../../Redux/hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMyContext } from '../MyContextProvider';
import { CreatePayment, GetCartItems, Verifypayment } from '../../../Redux/asyncThunk';
import { toast } from 'react-toastify';
import Script from "next/script";


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
    const path = useSearchParams()
    const user = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()
    const {setLoader}=useMyContext()
    const [selectId,setSelectId]=useState('')
    const [items,setItems]=useState<Items>({items:[],totalAmount:0})

    const getItems = async()=>{
        setLoader(true)
        const result = await dispatch(GetCartItems())
        if(result.payload && result.payload.data.items.length<=0){
            toast.error("No cart items!")
            router.push('/cart')
        }else{
            setItems(result.payload.data)
        }
        setLoader(false)
    }
    const createPayment = async()=>{
        setLoader(true)
        const result = await dispatch(CreatePayment(user.shippingDetails[Number(selectId)]))
        if(result.meta.requestStatus==="fulfilled"){
            verifyPayment(result.payload.data)
        }
        setLoader(false)
    }
    const verifyPayment = (data:any)=>{
        const options = {
            key: data.razorpay_key_id,
            amount: data.amount,
            currency: "INR",
            name:"BiteBolt Food Website",
            image: '/logo.png',
            order_id: data.id,
            handler:async function (response:any){
                const result = await dispatch(Verifypayment({...data,...response}))
                if(result.meta.requestStatus==="fulfilled"){
                    router.push('/welcome')
                }
            }
        }
        const rzp1 = new window.Razorpay(options);
        rzp1.open()
    }

    useEffect(()=>{
        const selectId = path.get("selectId")
        if(!user._id){
            router.push('/login')
        }else{
            if(!selectId || selectId==null){
                router.push('/shipping')
            }else{
                setSelectId(selectId)
                getItems()
            }
        }
    },[user,path])
    return (
       <>
       <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
        <div className='bg-slate-200 pb-[350px] mb-[-350px] pt-[75px]'>
            <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4'>Shipping Details</h1>
            <div className='my-2'><AddressCard data={user.shippingDetails[Number(selectId)]}/></div>
            <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4'>Your Cart Items</h1>
            <div className=' my-4'>
                {
                    items.items.map((item)=>{
                        return <div key={item.productId && item.productId._id} className='flex items-center bg-white border-2 border-slate-700 border-b-0'>
                        <img className='w-[100px] h-full p-2' src={item.productId && item.productId.thumbnail.secure_url} alt="" />
                        <div >
                            <Link href={`/details?_id=${item.productId && item.productId._id}`} className={`${robotoSlab.className} text-3xl`}>{item.productId && item.productId.name}</Link>
                            <h1 className={`flex items-center font-bold${robotoSlab.className}`}><FaIndianRupeeSign /> {item.productId && item.productId.price} <RxCross1 /> {item.qty} = {item.productId && item.productId.price*item.qty} </h1>
                        </div>
                    </div>
                    })
                }
                <h1 className={`border-2 text-xl border-slate-700 bg-white py-2 px-4 flex items-center ${robotoSlab.className}`}>Total Amount :  <span className="text-main-800 flex items-center"><FaIndianRupeeSign /> {items.totalAmount}</span></h1>
            </div>
            <div className='flex items-center justify-center'>
                <button onClick={()=>{createPayment()}} className=" text-center bg-main-800 shadow-lg text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Proceed to Payment</button>
            </div>
        </div>
       </>
    )
}

export default Page
