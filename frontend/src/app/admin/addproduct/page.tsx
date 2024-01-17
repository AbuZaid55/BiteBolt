"use client"
import AdminSiderbar from '../../components/AdminSiderbar'
import React, { useEffect, useState } from 'react'
import { Roboto_Slab } from "next/font/google"
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook'
import { useMyContext } from '@/app/MyContextProvider'
import { AddProduct } from '../../../../Redux/asyncThunk'
import { useRouter } from 'next/navigation'

const robotoSlab = Roboto_Slab({
    weight: "500",
    subsets: ["greek"],
    display: "swap",
})

interface API_ADD_PRODUCT {
    name:string,
    stock:number,
    price:number,
    category:string,
    subCategory:string,
    description:string,
    thumbnail:File,
    images:File[]
}

const page = () => {

    const {setLoader} = useMyContext()
    const dispatch = useAppDispatch()
    const [clearForm,setClearForm]=useState(false)
    const categories = useAppSelector((state) => state.category.categories)
    const [input,setInput] = useState<API_ADD_PRODUCT>({name:"",stock:0,price:0,category:"",subCategory:"",description:"",thumbnail:{} as File,images:[]})
    const user = useAppSelector((state)=>state.user)
    const router = useRouter()

    const handleInput = (e:any) => {
        setInput({...input,[e.target.name]:e.target.value})
    }
    const handleFiles = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.name==="thumbnail"){
            const thumbnailFile = e.target.files[0] as File
            setInput({...input,"thumbnail":thumbnailFile})
        }
        if(e.target.files && e.target.name==="images"){
            const img = []
            for(let i=0; i<e.target.files.length; i++){
                img.push(e.target.files[i])
            }
            setInput({...input,"images":img})
        }
    }
    const resetForm = () => {
        setInput({name:"",stock:0,price:0,category:"",subCategory:"",description:"",thumbnail:{} as File,images:[]})
    }
    const submitForm = async() => {
        setLoader(true)
        const formdata = new FormData()
        formdata.append("name",input.name)
        formdata.append("stock",input.stock.toString())
        formdata.append("price",input.price.toString())
        formdata.append("category",input.category)
        formdata.append("subCategory",input.subCategory)
        formdata.append("description",input.description)
        formdata.append("thumbnail",input.thumbnail)
        for(let i=0; i<input.images.length; i++){
            formdata.append("images",input.images[i])
        }
        const result = await dispatch(AddProduct(formdata))
        if(result.meta.requestStatus==="fulfilled" && clearForm){
            resetForm()
        }
        setLoader(false)
    }
    useEffect(()=>{
        if(user._id!=="1" && !user.admin){
            router.push('/login')
        }
    },[user])
    return (
        <div className='flex'>
            <AdminSiderbar />
            <div className='pl-20 sm:pl-24 pr-4 w-full text-slate-700 bg-slate-200 min-h-[100vh]'>
                <div >
                    <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Add product</h1>

                    <div >
                        <label className=' text-xl text-main-800 font-semibold' htmlFor="name">Enter Product Name</label>
                        <input value={input.name} onChange={(e)=>{handleInput(e)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" type="text" id='name' placeholder="Enter Name" name='name' />
                    </div>

                    <div className='w-full flex gap-4 mt-4 flex-col sm:flex-row'>
                        <div className='w-full sm:w-1/2'>
                            <label className=' text-xl text-main-800 font-semibold' htmlFor="stock">Enter Stock</label>
                            <input value={(input.stock)?input.stock:""}  onChange={(e)=>{handleInput(e)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" id='stock' type="number" placeholder="Enter Stock" name='stock' />
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <label className=' text-xl text-main-800 font-semibold' htmlFor="sellprice">Enter Price</label>
                            <input value={(input.price)?input.price:""} onChange={(e)=>{handleInput(e)}} className=" block w-full outline-none bg-slate-200 border-b-2 border-main-800 text-xl" id='sellprice' type="number" placeholder="Enter Price" name='price' />
                        </div>
                    </div>

                    <div className='w-full flex gap-4 mt-4 flex-col sm:flex-row'>
                        <div className='w-full sm:w-1/2'>
                            <label className='block w-full text-xl text-main-800 font-semibold' htmlFor="category">Select Category</label>
                            <select value={input.category} onChange={(e)=>{handleInput(e)}} className='block w-full text-slate-500 outline-none cursor-pointer bg-slate-200 border-b-2 border-main-800 text-xl' name='category'>
                                <option value="">Select Category</option>
                                {
                                    categories.map((object) => {
                                        return object.subCategories.length>0 && <option key={object._id} value={object.name}>{object.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <label className='block w-full text-xl text-main-800 font-semibold' htmlFor="subCategory">Select SubCategory</label>
                            <select value={input.subCategory} onChange={(e)=>{handleInput(e)}} className='block w-full text-slate-500 outline-none cursor-pointer bg-slate-200 border-b-2 border-main-800 text-xl' name='subCategory'>
                                <option value="">Select SubCategory</option>
                                {
                                    categories.map((object) => {
                                        const option = object.subCategories.map((object2)=>{
                                            return input.category===object.name && <option key={object2._id} value={object2.name}>{object2.name}</option>
                                        })
                                        return option
                                    })
                                }
                            </select>
                        </div>
                    </div>


                    <div className='w-full flex gap-4 mt-4 flex-col sm:flex-row'>
                        <div className='w-full sm:w-1/2'>
                            <label className="block w-full text-xl text-main-800 font-semibold" htmlFor="thumbnail">Select Thumbnail</label>
                            <label className="block w-full bg-main-800 text-white py-1 px-4 text-xl mt-1" htmlFor="thumbnail">Select Thumbnail</label>
                            <input onChange={(e)=>{handleFiles(e)}} className="hidden" id='thumbnail' type="file" placeholder="select Thumbnail" name='thumbnail' />
                        </div>

                        <div className='w-full sm:w-1/2'>
                            <label className="block w-full text-xl text-main-800 font-semibold" htmlFor="images">Select Images</label>
                            <label className="block w-full bg-main-800 text-white py-1 px-4 text-xl mt-1" htmlFor="images">Select Images</label>
                            <input onChange={(e)=>{{handleFiles(e)}}} className="hidden" id='images' type="file" multiple name='images' />
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label className=' text-xl text-main-800 font-semibold' htmlFor="description">Enter Description</label>
                        <textarea value={input.description} onChange={(e)=>{handleInput(e)}} className='block w-full outline-none bg-slate-200 border-2 border-main-800 mt-1 p-2 text-xl' id='description' style={{ minHeight: '250px', maxHeight: "250px", resize: 'none' }} placeholder="Enter Description" name='description' />
                    </div>

                    <div className='flex items-center justify-between w-full gap-4'>
                        <button onClick={()=>{resetForm()}} className=' bg-red-800 text-white py-2 rounded-md flex items-center justify-center w-1/2 border-2 border-red-800  hover:text-red-800 hover:bg-[#3341551f] transition-all duration-300 ease-in-out'>Reset</button>
                        <button onClick={()=>{submitForm()}} className=" text-center bg-main-800 text-white px-4 py-2 rounded-md my-4 cursor-pointer border-2 w-1/2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">Submit</button>
                    </div>
                    <label className='flex items-center gap-1 mt-10' htmlFor="emptyFormInput"><input checked={clearForm} onChange={()=>{setClearForm(!clearForm)}} type="checkbox" id='emptyFormInput' />Clear From After Submit</label>
                </div>
            </div>
        </div>
    )
}

export default page
