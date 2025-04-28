"use client"
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdShoppingCart } from "react-icons/md"
import ReviewCard from '../../components/ReviewCard'
import Card2 from '../../components/Card2'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../Redux/hook'
import { AddToCart, DeleteReview, GetSingleProduct, SimilarProducts, SubmitReview } from '../../Redux/asyncThunk'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useMyContext } from '../MyContextProvider'
import Image from 'next/image'


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

  const router = useRouter()
  const dispatch = useAppDispatch()
  const {setLoader} = useMyContext()
  const path = useSearchParams()
  const [mainImgPath, setMainImgPath] = useState("")
  const [imgPath, setImgPath] = useState<string[]>([])
  const [track, setTrack] = useState(0)
  const [product,setProduct]=useState<productDetail>({_id:'',name:"",stock:0,price:0,description:"",thumbnail:{secure_url:""},images:{secure_url:[]},rating:0,reviews:[]})
  const [showReviewForm,setShowReviewForm]=useState(false)
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState('')
  const user = useAppSelector((state)=>state.user)
  const [simiProduct,setSimilarProduct]=useState<productDetail[]>([])
  const [page,setPage]=useState(1)
  const [hashMore,setHashMore]=useState(true)
  const [qty,setQty]=useState(1)

  const getProductDetails = async(_id:string)=>{
    setLoader(true)
    const result = await dispatch(GetSingleProduct({_id}))
    if(result.payload.data){
      setProduct(result.payload.data)
    }
    setLoader(false)
  }
  const submitReview = async()=>{
      if(!user._id){
        router.push('/login')
      }else{
        setLoader(true)
        await dispatch(SubmitReview({userId:user._id,rating,comment,productId:product._id}))
        const result = await dispatch(GetSingleProduct({_id:product._id}))
        if(result.payload.data){
          setProduct(result.payload.data)
        }
        setShowReviewForm(false)
        setLoader(false)
      }
  }
  const deleteReview = async()=>{
    setLoader(true)
    await dispatch(DeleteReview({userId:user._id,productId:product._id}))
    const result = await dispatch(GetSingleProduct({_id:product._id}))
    if(result.payload.data){
      setProduct(result.payload.data)
    }
    setLoader(false)
  }
  const similarProduct = async(_id:string)=>{
    const pageLimit = (process.env.NEXT_PUBLIC_PAGE_LIMIT)?process.env.NEXT_PUBLIC_PAGE_LIMIT:1000
    if(_id){
      const result = await dispatch(SimilarProducts({_id,page}))
      if(result.payload.data.length < pageLimit){
        setHashMore(false)
      }
      setSimilarProduct([...simiProduct,...result.payload.data])
      setPage(page+1)
    }
  }
  const addToCart = async()=>{
      if(!user._id){
        router.push('/login')
      }else{
        setLoader(true)
        await dispatch(AddToCart({productId:product._id,qty:qty}))
        setLoader(false)
      }
  }

  useEffect(()=>{
    const _id = path.get("_id")
    if(_id!=null){
      setPage(1)
      setSimilarProduct([])
      getProductDetails(_id)
      similarProduct(_id)
    }else{
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[path])
  useEffect(()=>{
    if(product._id){
      setMainImgPath(product.images.secure_url[0])
      setImgPath(product.images.secure_url)
      product.reviews.map((object)=>{
        if(object.userId){
          setComment(object.comment)
          setRating(object.rating)
        }
      })
    }
  },[product])
  return (
    <div className='pb-[350px] mb-[-350px] pt-[90px] bg-slate-200'>

      <section className='flex flex-col p-4 md:p-10 md:flex-row'>
        <div className='md:h-auto md:w-1/2 flex items-center justify-center flex-col relative md:mx-8'>
          <div className='aspect-square bg-cover bg-no-repeat bg-center h-72 sm:h-96 lg:h-full' style={{ backgroundImage: `url(${mainImgPath})` }}></div>
          <div className='hidden md:flex items-center justify-center gap-3 absolute top-full flex-wrap'>
            {
              imgPath.map((path, index) => {
                return <div key={index}  className='w-[3rem] h-[3rem] relative'>
                  <Image fill={true} priority={true} sizes='100%' className={` ${(path === mainImgPath) ? "border-main-800" : "border-slate-700"} object-contain border-2 mt-3 cursor-pointer`} onClick={() => { setMainImgPath(path) }} src={path} alt="Image" />
                </div>
              })
            } 
          </div>
        </div>
        <div className='flex md:hidden items-center justify-center gap-3 flex-wrap'>
          {
            imgPath.map((path, index) => {
              return <Image width={100} priority={true} height={100} key={index} className={`${(path === mainImgPath) ? "border-main-800" : "border-slate-700"} w-[4rem] h-[4rem] object-contain border-2 mt-3 cursor-pointer`} onClick={() => { setMainImgPath(path) }} src={path} alt="Image" />
            })
          }
        </div>
        <div className='md:w-1/2 mt-4 md:mt-auto'>
          <h1 className={`text-5xl font-bold text-slate-700 font-robotoSlab`}>{product.name}</h1>
          <div className="flex items-center text-xl my-2">
            <FaStar className={`${(product.rating>=1)?"text-main-800":"text-slate-700"}`} />
            <FaStar className={`${(product.rating>=2)?"text-main-800":"text-slate-700"}`} />
            <FaStar className={`${(product.rating>=3)?"text-main-800":"text-slate-700"}`} />
            <FaStar className={`${(product.rating>=4)?"text-main-800":"text-slate-700"}`} />
            <FaStar className={`${(product.rating>=5)?"text-main-800":"text-slate-700"}`} />
          </div>
          <p className='text-slate-600 h-[165px] overflow-hidden'> {product.description}</p>
          <h1 className="flex items-center text-xl sm:text-4xl text-main-800 mt-4">
            <FaIndianRupeeSign />
            <span className=" font-bold">{product.price}</span>
          </h1>
          <div className="flex items-center">
            <h1 className=' font-bold text-slate-700 text-3xl mr-4 my-2'>Qty:- </h1>
            <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded' onClick={()=>{setQty(()=>(qty>1)?qty-1:qty)}}>-</span>
            <span className='mr-1 sm:mr-3 border border-main-800 text-main-800 text-lg w-6 h-6 flex items-center justify-center rounded'>{qty}</span>
            <span className='mr-1 sm:mr-3 bg-main-800 text-white text-xl w-6 h-6 flex items-center justify-center cursor-pointer rounded'  onClick={()=>{setQty(()=>(qty<10 && qty<product.stock)?qty+1:qty)}} >+</span>
          </div>
          <button onClick={()=>{addToCart()}} className=" bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
            <span className="mr-2">Add to Cart</span>
            <MdShoppingCart />
          </button>
        </div>
      </section>


      <section className='md:mt-20'>
        <div className='flex items-center justify-center translate-y-1/2 relative z-20'>
          <div className='border-2 border-slate-700 bg-white shadow-md rounded-md text-xl py-1 px-2'>
            <span className='relative '>
              <span className='px-4 cursor-pointer' onClick={() => { setTrack(0) }}>Details</span>
              <span className='px-4 cursor-pointer' onClick={() => { setTrack(50) }}>Reviews</span>
              <div className={`w-1/2 h-[2px] bg-main-800 relative bottom-1 transition-all duration-300 ease-in-out`} style={{ left: track + '%' }}></div>
            </span>
          </div>
        </div>

        <div className='w-full relative overflow-hidden z-10 border-t-2 border-slate-700 bg-slate-100'>
          <div className={`w-full p-8 text-xl text-slate-700 ${(track <= 25) ? "block" : "hidden"}`}>{product.description}</div>

          <div className={`w-full p-8 ${(track > 25) ? "block" : "hidden"}`} >
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                  product.reviews.map((object,i)=><ReviewCard key={i} review={object} deleteReview={deleteReview}/>)
                }
            </div>
            <div className='flex items-center justify-end'><button className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out" onClick={()=>setShowReviewForm(true)}>Submit Review</button></div>
          </div>
        </div>
      </section>
      
      <section className={(simiProduct.length==0)?"hidden":""}>
          <h1 className={`text-3xl font-bold text-slate-700 py-4 px-4 md:px-8 font-robotoSlab`}>Similar Products</h1>
          <InfiniteScroll next={()=>{similarProduct(product._id)}} dataLength={simiProduct.length} hasMore={true} loader={<></>} className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-5 lg:gap-10 place-items-center px-4'>
                {simiProduct.map((product,i)=><Card2 key={i} product={product}/>)}
          </InfiniteScroll>
          <div className={`md:pl-10 lg:pl-[300px] py-4 ${(hashMore)?"":"hidden"}`}><div className='flex items-center justify-center'><span className="loader2"></span></div></div>
      </section>

      <div className={` ${(showReviewForm) ? "" : "hidden"} w-full h-full fixed top-0 left-0 z-50`} style={{ backgroundColor: "rgba(128, 128, 128, 0.653)" }}>
      <div className='w-full h-full flex items-center justify-center'>
        <form className='bg-white p-4 rounded' onSubmit={function (e) { e.preventDefault() }}>
          <h1 className='text-xl text-center font-semibold text-main-800'>Submit Review</h1>
          <div className='flex my-4'>
            <FaStar className={` text-3xl cursor-pointer mx-1 hover:text-hover-600 ${(rating >= 1) ? 'text-main-800' : 'text-gray-400'}`} onClick={() => { setRating(1) }} />
            <FaStar className={` text-3xl cursor-pointer mx-1 hover:text-hover-600 ${(rating >= 2) ? 'text-main-800' : 'text-gray-400'}`} onClick={() => { setRating(2) }} />
            <FaStar className={` text-3xl cursor-pointer mx-1 hover:text-hover-600 ${(rating >= 3) ? 'text-main-800' : 'text-gray-400'}`} onClick={() => { setRating(3) }} />
            <FaStar className={` text-3xl cursor-pointer mx-1 hover:text-hover-600 ${(rating >= 4) ? 'text-main-800' : 'text-gray-400'}`} onClick={() => { setRating(4) }} />
            <FaStar className={` text-3xl cursor-pointer mx-1 hover:text-hover-600 ${(rating >= 5) ? 'text-main-800' : 'text-gray-400'}`} onClick={() => { setRating(5) }} />
          </div>
          <textarea className=' border w-full resize-none' value={comment} onChange={(e) => { setComment(e.target.value) }} />
          <div className='flex items-center justify-between mt-2'>
            <button className=' text-red-700' onClick={(e) => { setShowReviewForm(false) }}>CANCLE</button>
            <button className=' text-green-700' onClick={(e) => { submitReview() }}>SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Page
