"use client"
import React, { useEffect, useState } from 'react'
import AdminSiderbar from '../../components/AdminSiderbar';
import { Roboto_Slab } from "next/font/google"
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';
import { useMyContext } from '@/app/MyContextProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeStatus, GetAdminOrders } from '../../../../Redux/asyncThunk';

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
})

const Page = () => {

    const path = useSearchParams()
    const user = useAppSelector((state)=>state.user)
    const {setLoader}=useMyContext()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [search,setSearch]=useState('')
    const [handleSearch,setHandleSearch]=useState('')
    const [timeId,setTimeId]=useState<any>(0)
    const [searchType,setSearchType]=useState('false')
    const [orders,setOrders]=useState([])

    const getOrders = async(searchType:string)=>{
        if(user._id && user.admin){
            setLoader(true)
            const result = await dispatch(GetAdminOrders({search,searchType:searchType}))
            if(result.meta.requestStatus==="fulfilled"){
                setOrders(result.payload.data)
            }
            setLoader(false)
        }
    }
    const handleSearchfun = (e:any)=>{
        setHandleSearch(e.target.value)
        clearTimeout(timeId)
        const id = setTimeout(() => {
            setSearch(e.target.value)
        }, 1000);
        setTimeId(id)
    }
    const changeStatus = async(id:string,value:string)=>{
        setLoader(true)
        await dispatch(ChangeStatus({orderId:id,value:value}))
        const result = await dispatch(GetAdminOrders({search,searchType}))
        if(result.meta.requestStatus==="fulfilled"){
            setOrders(result.payload.data)
        }
        setLoader(false)
    }
        
    useEffect(()=>{
        if(user._id!=="1" && !user.admin){
            router.push('/login')
        }else{
            if(searchType!=="false"){
                getOrders(searchType)
            }
        }
    },[user,search,searchType])
    useEffect(()=>{
        const status = path.get('status')
        if(status){
            setSearchType(status)
        }else{
            setSearchType('')
        }
    },[path])
    return (
        <div className='flex bg-slate-200'>
            <AdminSiderbar />
            <div className='pl-16 sm:pl-20 w-full min-h-[100vh] overflow-hidden overflow-y-scroll text-slate-700' >
                <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Orders</h1>
                <div className='w-full flex flex-col items-start p-4'>
                    <input value={handleSearch} onChange={(e)=>{handleSearchfun(e)}} className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md rounded-bl-none shadow-md max-w-[600px]" type="search" placeholder='Search Orders' />
                    <label className='bg-main-800 text-white py-1 px-2 sm:px-4 rounded-b-md sm:text-xl shadow-md'>Search Type:-
                        <select value={searchType} onChange={(e)=>{setSearchType(e.target.value)}} className='text-slate-500 sm:px-4 ml-2 outline-none rounded-md cursor-pointer'>
                            <option value={""}>All</option>
                            <option value={"Placed"}>Placed</option>
                            <option value={"Confirmed"}>Confirmed</option>
                            <option value={"Processing"}>Processing</option>
                            <option value={"Ready to Pickup"}>Ready to Pickup</option>
                            <option value={"Delivered"}>Delivered</option>
                            <option value={"Cancelled"}>Cancelled</option>
                            <option value={"Refund"}>Refund</option>
                        </select>
                    </label>
                </div>

                <div className='flex items-center justify-end w-full px-6'><span className='bg-main-800 text-white text-xl py-1 px-4 rounded-md shadow-md'>Total Orders: {orders.length}</span></div>


                {/* order  */}
               {
                orders.map((order:any)=>{
                    return  <div key={order._id} className=" mx-2 sm:mx-4 my-5 border-2 border-main-800 rounded-xl overflow-hidden relative">
                        <div className=' bg-main-800 text-white p-2 text-lg'>
                            <div>Razorpay Payment Id: {order.razorpay_payment_id}</div>
                            <div>Razorpay Order Id:  {order.razorpay_order_id}</div>
                        </div>

                    {/* item  */}

                    {
                        order.item.map((item:any,i:number)=>{
                            return <div key={(item.productId)?item.productId._id:i} className="flex item  items-center">
                            <img className="m-2 border-2 border-main-800" style={{ width: "80px", height: "80px" }} src={item.productId && item.productId.thumbnail.secure_url} alt="Image" />
                            <div className='w-full'>
                                <Link href={`/details?_id=${item.productId && item.productId._id}`}><h1 className='h-7 overflow-hidden lg:text-2xl'>{item.productId  && item.productId.name} </h1></Link>
                                <p className="flex items-center lg:text-xl mx-2">Quentity: {item.qty}</p>
                            </div>
                        </div>
                        })
                    }

                    {/* item end  */}
                    <div className='p-2 text-main-800 border-t-2 border-main-800 text-lg'>
                        <p>Order Id: {order._id}</p>
                        <p className='w-full'>Order On : {order.createdAt.slice(0, 10).split("-").reverse().join("-")}</p>
                        <p>Status :-
                            <select value={order.status} onChange={(e)=>{changeStatus(order._id,e.target.value)}} className=' bg-main-800 text-white outline-none rounded-md ml-2 cursor-pointer px-2' >
                                <option value={"Placed"}>Placed</option>
                                <option value={"Confirmed"}>Confirmed</option>
                                <option value={"Processing"}>Processing</option>
                                <option value={"Ready to Pickup"}>Ready to Pickup</option>
                                <option value={"Delivered"}>Delivered</option>
                                <option value={"Cancelled"}>Cancelled</option>
                                <option value={"Refund"}>Refund</option>
                            </select>
                        </p>
                    </div>

                </div>
                })
               }
                {/* order end */}
            </div>

        </div>
    )
}

export default Page
