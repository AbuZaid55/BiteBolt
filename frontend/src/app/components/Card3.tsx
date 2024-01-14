import React from 'react'
import { FaStar } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdShoppingCart } from "react-icons/md"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { GoTrash } from "react-icons/go";
import Link from 'next/link'
import { useMyContext } from '../MyContextProvider'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { AddToCart} from '../../../Redux/asyncThunk'

interface Product {
    _id: string,
    name: string,
    description: string,
    rating: number,
    price: number,
    thumbnail: { secure_url: string }
}

const Card3 = ({ product,removeItem }: { product: Product ,removeItem:any}) => {

    const router = useRouter()
    const dispatch = useAppDispatch()
    const {setLoader} = useMyContext()
    const user = useAppSelector((state)=>state.user)

    const addToCart = async()=>{
        if(!user._id){ 
          router.push('/login')
        }else{
          setLoader(true)
          await dispatch(AddToCart({productId:product._id,qty:1}))
          setLoader(false)
        }
    }
    return (
        <div className=" bg-white shadow-lg relative rounded-lg p-4 max-w-[300px] w-full">
            <div className="absolute top-0 left-0 p-2 text-xl w-full flex items-center justify-end">
                <span className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out shadow-md">
                    <Link href={`/details?_id=${product._id}`}><MdOutlineRemoveRedEye /></Link>
                </span>
            </div>
            <img className="w-full h-[140px] sm:h-[190px]" src={product.thumbnail.secure_url} alt="Image" />
            <div className='flex items-center justify-between my-1'>
                <h1 className="flex items-center sm:text-2xl text-main-800">
                    <FaIndianRupeeSign />
                    <span className=" font-bold">{product.price}</span>
                </h1>
                <div className="flex items-center sm:text-xl">
                    <FaStar className={`${(product.rating >= 1) ? "text-main-800" : "text-slate-700"}`} />
                    <FaStar className={`${(product.rating >= 2) ? "text-main-800" : "text-slate-700"}`} />
                    <FaStar className={`${(product.rating >= 3) ? "text-main-800" : "text-slate-700"}`} />
                    <FaStar className={`${(product.rating >= 4) ? "text-main-800" : "text-slate-700"}`} />
                    <FaStar className={`${(product.rating >= 5) ? "text-main-800" : "text-slate-700"}`} />
                </div>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-700 h-[35px] overflow-hidden">{product.name}</h1>
            <p className="h-12 overflow-hidden text-xs sm:text-base">{product.description}</p>
            <div className='flex gap-1 sm:gap-2'>
                <button onClick={()=>{removeItem(product._id)}} className="text-xs sm:text-base bg-red-800 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-red-800  hover:text-red-800 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
                    <span className="mr-1 sm:mr-2">Remove</span>
                    <GoTrash />
                </button>
                <button onClick={()=>{addToCart()}} className="text-xs sm:text-base bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
                    <span className="mr-1 sm:mr-2">Add</span>
                    <MdShoppingCart />
                </button>
            </div>
        </div>
    )
}

export default Card3
