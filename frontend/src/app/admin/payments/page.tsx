"use client"
import React, { useState, useEffect } from 'react'
import { FaTrash } from "react-icons/fa";
import AdminSiderbar from '../../components/AdminSiderbar';
import { Roboto_Slab } from "next/font/google"
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';
import { useRouter } from 'next/navigation';
import { useMyContext } from '@/app/MyContextProvider';
import { DeletePayment, GetPayments } from '../../../../Redux/asyncThunk';
import InfiniteScroll from 'react-infinite-scroll-component'

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
})

const page = () => {
    const [showConfirm, setShowConfirm] = useState(false)
    const user = useAppSelector((state) => state.user)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { setLoader } = useMyContext()
    const [payments, setPayments] = useState<{[key:string]:string | number}[]>([])
    const [search, setSearch] = useState('')
    const [search1, setSeach1] = useState('')
    const [itemId, setTimeId] = useState<any>('')
    const [deletePaymentId, setDeletedPaymentId] = useState('')
    const [page,setPage]=useState(1)
    const [hashMore,setHashMore]=useState(true)

    const getPayments = async (search: string, page: number) => {
        const pageLimit = (process.env.NEXT_PUBLIC_PAGE_LIMIT)?process.env.NEXT_PUBLIC_PAGE_LIMIT:1000
        if (user._id && user._id !== "1" && user.admin) {
            const result = await dispatch(GetPayments({ search: search, page: page }))
            if (result.meta.requestStatus === "fulfilled") {
                if(page===1){
                    setPayments(result.payload.data)
                }else{
                    setPayments([...payments,...result.payload.data])
                }
                if(result.payload.data.length<pageLimit){
                    setHashMore(false)
                }
            }
            setPage(page+1)
        }
    }
    const handleSearch = async (e: any) => {
        setSeach1(e.target.value)
        clearTimeout(itemId)
        const newTimeId = setTimeout(() => {
            setSearch(e.target.value)
        }, 1000);
        setTimeId(newTimeId)
    }
    const deletePayment = async()=>{
        setShowConfirm(false)
        setLoader(true)
        const result = await dispatch(DeletePayment({_id:deletePaymentId}))
        if(result.meta.requestStatus==="fulfilled"){
            setHashMore(true)
            getPayments(search,1)
        }
        setLoader(false)
    }

    useEffect(() => {
        setPayments([])
        setPage(1)
        setHashMore(true)
        if (user._id !== "1" && !user.admin) {
            router.push('/login')
        } else {
            getPayments(search, 1)
        }
    }, [user, search])
    return (
        <div className='flex bg-slate-200'>
            <AdminSiderbar />
            <div className='pl-16 sm:pl-20 w-full min-h-[100vh] overflow-hidden overflow-y-scroll text-slate-700' >
                <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Payments</h1>
                <div className='w-full flex flex-col items-start p-4'>
                    <input value={search1} onChange={(e) => { handleSearch(e) }} className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md shadow-md max-w-[600px]" type="search" placeholder='Search Payments' />
                </div>

                <InfiniteScroll next={()=>{getPayments(search,page)}} dataLength={payments.length} hasMore={hashMore} loader={<></>}>
                    <table className='mt-4'>
                        <thead className='bg-main-800 border-main-800 border-2'>
                            <tr>
                                <th>Payment Id</th>
                                <th>Order Id</th>
                                <th>User Id</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                payments.map((payment: any) => {
                                    return <tr key={payment._id}>
                                        <td className='border border-main-800 text-base' aria-label={"Payment Id"}>{payment.razorpay_payment_id}</td>
                                        <td className='border border-main-800 text-base' aria-label={"Order Id"}>{payment.razorpay_order_id}</td>
                                        <td className='border border-main-800 text-base' aria-label={"User Id"}>{payment.userId}</td>
                                        <td className='border border-main-800 text-base' aria-label={"Amount"}>&#8377; {payment.totalPaidAmount}</td>
                                        <td className='border border-main-800 text-base' aria-label={"Date"}>{payment.createdAt.slice(0, 10).split("-").reverse().join("-")}</td>
                                        <td className='border border-main-800 text-base' aria-label={"Delete"}><FaTrash className='icon delete' onClick={() => { setShowConfirm(true), setDeletedPaymentId(payment._id) }} /></td>
                                    </tr>
                                })
                            }

                        </tbody>

                    </table>
                <div className={`md:pl-10 py-4 ${(hashMore)?"":"hidden"}`}><div className='flex items-center justify-center'><span className="loader2"></span></div></div>
                </InfiniteScroll>
            </div>
            <div className={`${(showConfirm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full h-full items-center justify-center bg-[#3341557f]`}>
                <div className=' w-56 h-56 border p-4  bg-white rounded  flex items-stretch justify-between flex-col border-main-800 shadow-lg'>
                    <h1 className=' text-center text-2xl'>Are your sure you want to delete?</h1>
                    <div className='flex items-center justify-between'>
                        <button onClick={()=>{deletePayment()}} className=' bg-red-700 text-white px-3 py-2 rounded hover:bg-[#3341551f] border-2 border-red-700 hover:text-red-700 transition-all duration-300 ease-in-out'>YES</button>
                        <button className=' bg-main-800 text-white px-3 py-2 rounded hover:bg-[#44b67721] border-2 border-main-800 hover:text-main-800 transition-all duration-300 ease-in-out' onClick={() => { setShowConfirm(false), setDeletedPaymentId('') }}>NO</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
