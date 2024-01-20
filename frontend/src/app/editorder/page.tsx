"use client"
import React, { useEffect, useState } from 'react'
import AddressCard from '../components/AddressCard'
import AddAddressForm from '../components/AddAddressForm'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMyContext } from '../MyContextProvider'
import { UpdateDetails } from '../../../Redux/asyncThunk'

const Page = () => {
    const [selected, setSelected] = useState(0)
    const user = useAppSelector((state)=>state.user)
    const path = useSearchParams()
    const router = useRouter()
    const [orderId,setOrderId]=useState('')
    const [addressId,setAddressId]=useState('')
    const dispatch = useAppDispatch()
    const {setLoader}= useMyContext()

    const updateDetails = async()=>{
        setLoader(true)
        await dispatch(UpdateDetails({...user.shippingDetails[selected],orderId}))
        setLoader(false)
    }

    useEffect(()=>{
        const orderid = path.get("orderId")
        const addressid = path.get("addressId")
        if(!user._id){
            router.push('/login')
        }else if(!orderid || !addressid){
            router.push('/')
        }else{
            setOrderId(orderid)
            setAddressId(addressId)
            user.shippingDetails.map((object:any,i:number)=>{
                if(object._id==addressid){
                    setSelected(i)
                }
            })
        }
    },[user,path])
    return (
        <div className='pb-[350px] mb-[-350px] bg-slate-200 pt-[75px]'>
            <h1 className=' bg-main-800 text-white font-semibold text-xl py-2 px-4'>Change Shipping Details</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 p-4 gap-4'>
                {user.shippingDetails.map((value: number, i: number) => {
                    return <span key={i} onClick={() => { setSelected(i) }} className={`${(selected === i) ? " border-4" : ""} cursor-pointer border-main-800 rounded-xl`}><AddressCard data={value}/></span>
                })}
            </div>
            <div className='flex items-center justify-center'>
                <button onClick={()=>{updateDetails()}} className={`${(user.shippingDetails.length<=0)?"hidden":""} text-center bg-main-800 shadow-lg text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out`}>Update</button>
            </div>
            <AddAddressForm/>
        </div>
    )
}

export default Page
