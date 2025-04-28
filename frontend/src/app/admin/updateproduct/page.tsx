"use client"
import AdminSiderbar from '../../../components/AdminSiderbar'
import React,{useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { GetSingleProduct, UpdateProduct } from '../../../Redux/asyncThunk'
import { useMyContext } from '@/app/MyContextProvider'


interface productDetail {
    _id:string,
    name:string,
    stock:number,
    price:number,
    category?:string,
    subCategory?:string,
    popularList?:boolean
    description:string,
    thumbnail:{secure_url:string},
    images:{secure_url:string[]},
    rating:number,
    reviews:{
      userId:{
        _id:string,
        name:string,
        profile:{secure_url:string}
      },
      rating:number,
      comment:string,
  }[],
    createdAt?:Date,
  }

const Page = () => {
    const path = useSearchParams()
    const user = useAppSelector((state)=>state.user)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const {setLoader}=useMyContext()
    const [product,setProduct]=useState<productDetail>({_id:'',name:"",stock:0,price:0,description:"",thumbnail:{secure_url:""},popularList:false,images:{secure_url:[]},rating:0,reviews:[]})


    const getProduct = async(_id:string)=>{
        setLoader(true)
        const result = await dispatch(GetSingleProduct({_id}))
        if(result.payload.data){
        setProduct(result.payload.data)
        }
        setLoader(false)
    }
    const handleInput = (e:any)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
    const updateProduct = async()=>{
        setLoader(true)
        await dispatch(UpdateProduct({_id:product._id,name:product.name,stock:product.stock,price:product.price,description:product.description,popularList:product.popularList}))
        setLoader(false)
    }
    const handleCheckbox = async(e:any)=>{
        if(e.target.checked){
            setProduct({...product,popularList:true})
        }else{
            setProduct({...product,popularList:false})
        }
    }

    useEffect(()=>{
        const id = path.get("_id")
        if(user._id!=="1" && !user.admin){
          router.push('/login')
        }else if(!id){
            router.back()
        }else{
            if(user._id && user.admin){
                getProduct(id)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[user])
    return (
        <div className='flex'>
            <AdminSiderbar />
            <div className='pl-20 sm:pl-24 pr-4 w-full min-h-[100vh] text-slate-700 bg-slate-200'>
                <div >
                    <h1 className={`font-robotoSlab text-4xl sm:text-5xl text-center my-6 text-main-800`}>Update product</h1>

                    <div >
                        <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter Product Name</label>
                        <input value={product.name} onChange={(e)=>{handleInput(e)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter Name" name='name' />
                    </div>

                    <div className='w-full flex gap-4 mt-4 flex-col sm:flex-row'>
                        <div className='w-full sm:w-1/2'>
                            <label className=' text-xl text-main-800 font-semibold' htmlFor="stock">Enter Stock</label>
                            <input value={product.stock} onChange={(e)=>{handleInput(e)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" id='stock' type="number" placeholder="Enter Stock" name='stock' />
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <label className=' text-xl text-main-800 font-semibold' htmlFor="sellprice">Enter Price</label>
                            <input value={product.price} onChange={(e)=>{handleInput(e)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" id='sellprice' type="number" placeholder="Enter Price" name='price' />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label className=' text-xl text-main-800 font-semibold' htmlFor="description">Enter Description</label>
                        <textarea value={product.description} onChange={(e)=>{handleInput(e)}} className='block w-full outline-none bg-slate-200 border-2 border-main-800 mt-1 p-2 text-xl' id='description' style={{ minHeight: '250px', maxHeight: "250px", resize: 'none' }} placeholder="Enter Description" name='description' />
                    </div>
                    <label className='flex items-center justify-start gap-2 py-1' htmlFor="checkbox"><input onChange={(e)=>{handleCheckbox(e)}} type="checkbox" id='checkbox' checked={product.popularList} />Add In Popular Products List</label>


                    <div className='flex items-center justify-between w-full gap-4'>
                        <button  onClick={()=>{updateProduct()}} className=" text-center bg-main-800 text-white px-4 py-2 rounded-md my-4 cursor-pointer border-2 w-full border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Update</button>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Page