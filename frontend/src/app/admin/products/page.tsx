"use client"
import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit, FaStar } from "react-icons/fa";
import Link from 'next/link';
import AdminSiderbar from '../../components/AdminSiderbar';
import { Roboto_Slab } from "next/font/google"
import { useAppDispatch, useAppSelector } from '../../../../Redux/hook';
import { useMyContext } from '@/app/MyContextProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { DeleteProduct, GetAdminProducts } from '../../../../Redux/asyncThunk';
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image';

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: "swap",
})

const Page = () => {

  const path = useSearchParams()
  const [showConfirm, setShowConfirm] = useState(false)
  const user = useAppSelector((state)=>state.user)
  const dispatch = useAppDispatch()
  const {setLoader}=useMyContext()
  const router = useRouter()
  const [search,setSearch]=useState('')
  const [search1,setSearch1]=useState('')
  const [searchType,setSearchType]=useState('false')
  const [page,setPage]=useState(1)
  const [timeId,setTimeId]=useState<any>(0)
  const [items,setItems]=useState<any>([])
  const [hashMore,setHashMore]=useState(true)
  const [deleteItemId,setDeleteItemId]=useState('')

  const handleSearch = (e:any)=>{
    setSearch1(e.target.value)
    clearTimeout(timeId)
    const id = setTimeout(() => {
      setSearch(e.target.value)
    }, 1000);
    setTimeId(id)
  }
  const getProducts = async(pageNo:number,item:any[])=>{
    const pageLimit = (process.env.NEXT_PUBLIC_PAGE_LIMIT)?process.env.NEXT_PUBLIC_PAGE_LIMIT:1000
    if(user.admin){
      const result = await dispatch(GetAdminProducts({search,searchType,page:pageNo}))
      if(result.meta.requestStatus==="fulfilled"){
        setItems([...item,...result.payload.data])
        if(result.payload.data.length < pageLimit){
          setHashMore(false)
        }
      }
      setPage(pageNo+1)
    }
  }
  const fetchMore = async()=>{
    getProducts(page,items)
  }
  const deleteProduct = async()=>{
    setLoader(true)
    await dispatch(DeleteProduct({productId:deleteItemId}))
    getProducts(1,[])
    setHashMore(true)
    setShowConfirm(false)
    setLoader(false)
  }

  useEffect(()=>{
    if(user._id!=="1" && !user.admin){
      router.push('/login')
    }else{
     if(searchType!=='false' && user._id && user.admin){
      setHashMore(true)
      getProducts(1,[])
     }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user,search,searchType])
  useEffect(()=>{
    const stock = path.get('stock')
    if(stock){
      setSearch1('0')
      setSearch('0')
      setSearchType('stock')
    }else{
      setSearchType('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[path])
  return (
    <div className='flex bg-slate-200'>
      <AdminSiderbar />
      <div className='pl-16 sm:pl-20 w-full min-h-[100vh] overflow-x-hidden overflow-y-auto text-slate-700 ' >
        <h1 className={`${robotoSlab.className} text-4xl sm:text-5xl text-center my-6 text-main-800`}>Products</h1>
            <div className='w-full flex flex-col items-start p-4'>
              <input value={search1} onChange={(e)=>{handleSearch(e)}} className=" outline-none w-full py-1 px-4 text-xl border-2 border-main-800 rounded-md rounded-bl-none shadow-md max-w-[600px]" type="search"  placeholder='Search Products' />
              <label className='bg-main-800 text-white py-1 px-2 sm:px-4 rounded-b-md sm:text-xl shadow-md'>Search Type:- 
                <select value={searchType} onChange={(e)=>{setSearchType(e.target.value)}} className='text-slate-700 sm:px-4 ml-2 outline-none rounded-md cursor-pointer'>
                  <option value={""}>Default</option>
                  <option value={"stock"}>Stock</option>
                  <option value={"price"}>Price</option>
                  <option value={"rating"}>Rating</option>
                  <option value={"category"}>Category</option>
                  <option value={"subCategory"}>SubCategory</option>
                </select>
              </label>
            </div>

           <InfiniteScroll className='' next={fetchMore} dataLength={items.length} hasMore={hashMore} loader={<></>}>
        <table className='mt-4'>
          <thead className='bg-main-800 border-main-800 border-2'>
            <tr>
              <th>Thumbnail</th>
              <th className='name'>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
           {
            items.map((item:any)=>{
              return  <tr key={item._id}>
              <td className='border border-main-800' aria-label='Thumbnail'><Image height={60} width={60} className=' rounded-[8px] mx-auto' style={{width:'auto',height:'auto'}} priority={true} src={item.thumbnail.secure_url} alt="Pic" /></td>
              <td className='name border border-main-800' aria-label={"Name"}>
                <Link href={`/details?_id=${item._id}`}><p className='w-full max-h-28 overflow-hidden'>{item.name}</p></Link>
              </td>
              <td className='border border-main-800' aria-label={"Stock"}>{item.stock}</td>
              <td className='border border-main-800' aria-label={"Price"}>&#8377; {item.price}</td>
              <td className='border border-main-800' aria-label={"Rating"}>
                <span className={`${(item.rating > 3) ? 'bg-green-700' : ""} ${(item.rating <= 3 && item.rating > 1) ? 'bg-yellow-500' : ""} ${(item.rating <= 1) ? 'bg-red-700' : ""} text-white flex m-auto items-center justify-evenly`} style={{ width: '50px', height: "30px", borderRadius: '8px' }}>{item.rating}<FaStar /></span>
              </td>
              <td className='border border-main-800' aria-label={"Edit"}><Link href={`/admin/updateproduct?_id=${item._id}`}><FaEdit className='icon edit' /></Link></td>
              <td className='border border-main-800' aria-label={"Delete"}><FaTrash className='icon delete' onClick={() => {setDeleteItemId(item._id), setShowConfirm(true) }} /></td>
            </tr>
            })
           }
          </tbody>
            
        </table>
           </InfiniteScroll>
          <div className={`md:pl-10 py-4 ${(hashMore)?"":"hidden"}`}><div className='flex items-center justify-center'><span className="loader2"></span></div></div>
      </div>
      <div className={`${(showConfirm) ? 'flex' : 'hidden'} fixed top-0 left-0 w-full h-full items-center justify-center bg-[#3341557f]`}>
        <div className=' w-56 h-56 border p-4  bg-white rounded  flex items-stretch justify-between flex-col border-main-800 shadow-lg'>
          <h1 className=' text-center text-2xl'>Are your sure you want to delete?</h1>
          <div className='flex items-center justify-between'>
            <button onClick={()=>{deleteProduct()}} className=' bg-red-700 text-white px-3 py-2 rounded hover:bg-[#3341551f] border-2 border-red-700 hover:text-red-700 transition-all duration-300 ease-in-out'>YES</button>
            <button className=' bg-main-800 text-white px-3 py-2 rounded hover:bg-[#44b67721] border-2 border-main-800 hover:text-main-800 transition-all duration-300 ease-in-out' onClick={()=>{setShowConfirm(false), setDeleteItemId('')}}>NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
