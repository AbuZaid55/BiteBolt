"use client"
import React, { useEffect, useState } from 'react'
import { BsFillCameraFill } from 'react-icons/bs'
import { MdOutlineEditNote } from 'react-icons/md'
import Link from 'next/link'
import { Roboto_Slab } from "next/font/google"
import AddressCard from '../../components/AddressCard'
import AddAddressForm from '../../components/AddAddressForm'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { useRouter } from 'next/navigation'
import { ChangeName, GetUser, LogOut, UploadFile } from '../../Redux/asyncThunk'
import { useMyContext } from '../MyContextProvider'

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
  })

const Page = () => {
    const router = useRouter()
    const {setLoader} = useMyContext()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state)=>state.user)
    const [showNameForm, setShowNameForm] = useState(false)
    const [name,setName]=useState('')

    const submitForm = async() =>{
        setLoader(true)
        const result = await dispatch(ChangeName({_id:user._id,name}))
        if(result.meta.requestStatus==="fulfilled"){
            await dispatch(GetUser())
            setShowNameForm(false)
        }
        setLoader(false)
    }

    const uploadFile = async(e:React.ChangeEvent<HTMLInputElement>) =>{
        setLoader(true)
        const file = e.target.files? e.target.files[0]:null
        if(file){
            const formdata = new FormData()
            formdata.append("_id",user._id) 
            formdata.append("file",file)
            await dispatch(UploadFile(formdata))
        }
        setLoader(false)
    }

    const logOut = async() => {
        setLoader(true)
        const result = await dispatch(LogOut())
        if(result.meta.requestStatus==="fulfilled"){
            router.push('/')
        }
        setLoader(false)
    }
    useEffect(()=>{
        if(!user._id){
            router.push('/login')
        }else{
            if(user._id!=="1"){
                setName(user.name)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
    return (
        <div className='bg-slate-200 pb-[350px] mb-[-350px] text-slate-700 '>
            <div className=' relative flex items-center justify-center h-[100vh] w-full border-b-2 border-main-800'>
                <div className='w-1/2 h-full bg-main-800 flex items-center justify-center'></div>
                <div className=' absolute pt-[75px]'>
                    <div className=' shadow-2xl w-72 h-72 md:w-96 md:h-96 rounded-2xl  hover:scale-110 transition ease-in-out duration-300 cursor-pointer bg-center bg-cover bg-no-repeat bg-slate-300' style={{ backgroundImage: `url('${user.profile.secure_url}')` }}></div>
                    <div className='flex items-center justify-between mt-20'>
                        <input onChange={(e)=>{uploadFile(e)}}  type="file" className='hidden' id='file' />
                        <label htmlFor='file' className={` bg-slate-200 text-4xl px-10 py-2 border-2 shadow-lg border-main-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`}><BsFillCameraFill /></label>
                        <button className={` bg-slate-200 text-4xl px-10 py-2 border-2 shadow-lg border-main-800 my-5 rounded-md cursor-pointer hover:scale-110 transition ease-in-out duration-300`} onClick={()=>{setShowNameForm(true)}}><MdOutlineEditNote /></button>
                    </div>
                </div>
                <div className='w-1/2 overflow-y-auto h-full'></div>
            </div>
            <div className='flex items-center justify-center flex-col py-10'>
                <h1 className={`text-4xl md:text-6xl font-semibold text-main-800 ${robotoSlab.className}`}>{user.name}</h1>
                <h1 className='md:text-xl mt-2'>{user.email}</h1>
                <div className='flex items-center justify-center'>
                    <Link href="/orders" className=' w-36 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>My Orders</Link>
                    <Link href="/sendlink" className=' w-36 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>Change Password</Link>
                </div>
                <button onClick={()=>{logOut()}} className=' w-36 mx-2 bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>Log Out</button>
            </div>
            <div className={` ${(showNameForm)?"flex":"hidden"} fixed top-0 left-0 w-[100%] h-[100vh] bg-[#0000008d] overflow-hidden items-center justify-center`}>
                <div className='flex flex-col w-96 shadow-2xl p-4 bg-white rounded'>
                    <p className='text-end cursor-pointer text-xl text-main-800' onClick={()=>{setShowNameForm(false)}}>X</p>
                    <label className='mt-2 text-xl' htmlFor="name">Change your name:- </label>
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} className='border-2 border-main-800 px-4  py-2' type="text" id='name' />
                    <button onClick={()=>{submitForm()}} className=" mt-4 bg-main-800 text-white text-md font-semibold py-2 transition duration-300 ease-in-out border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] rounded">Submit</button>
                </div>
            </div>
            <h1 className={`bg-main-800 text-xl py-2 px-4 text-white ${robotoSlab.className}`}>Shipping Details</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 p-4 gap-4'>
               {user.shippingDetails.map((data:any,i:number)=><span key={i}><AddressCard data={data}/></span>)}
            </div>
           <AddAddressForm/>
        </div>
    )
}

export default Page
