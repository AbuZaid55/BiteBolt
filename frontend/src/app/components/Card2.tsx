import React from 'react'
import { FaStar } from "react-icons/fa"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { MdShoppingCart } from "react-icons/md"
import { FaRegHeart } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import Link from 'next/link'
import { useMyContext } from '../MyContextProvider'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../../Redux/hook'
import { AddToCart, AddToWishlist } from '../../../Redux/asyncThunk'
import Image from 'next/image'

interface Product {
    _id: string,
    name: string,
    stock: number,
    price: number,
    category?: string,
    subCategory?: string,
    description: string,
    popularList?: boolean,
    thumbnail: { secure_url: string },
    images: { secure_url: string[] },
    rating: number,
    reviews: {
        userId: {
            _id: string,
            name: string,
            profile: { secure_url: string }
        }
        rating: number,
        comment: string,
    }[],
    createdAt?: Date,
}

const Card2 = ({ product }: { product: Product }) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { setLoader } = useMyContext()
    const user = useAppSelector((state) => state.user)

    const addToCart = async () => {
        if (!user._id) {
            router.push('/login')
        } else {
            setLoader(true)
            await dispatch(AddToCart({ productId: product._id, qty: 1 }))
            setLoader(false)
        }
    }
    const addToWishlist = async() => {
        setLoader(true)
        await dispatch(AddToWishlist({productId:product._id}))
        setLoader(false)
    }
    return (
        <div className=" bg-white shadow-lg relative rounded-lg p-4 max-w-[300px] w-full">
            <div className="absolute z-10 top-0 left-0 p-2 text-xl w-full flex items-center justify-between">
                <span onClick={()=>{addToWishlist()}} className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out shadow-md">
                    <FaRegHeart />
                </span>
                <span className=" cursor-pointer bg-slate-200 rounded-full p-2 hover:scale-125 hover:bg-main-800 hover:text-white text-slate-700 transition-all duration-200 ease-in-out shadow-md">
                    <Link href={`/details?_id=${product._id}`}><MdOutlineRemoveRedEye /></Link>
                </span>
            </div>
            <div className="w-full h-[140px] sm:h-[190px] relative"><Image className=" transition-opacity opacity-0 duration-[2s]" onLoadingComplete={(image)=>image.classList.remove('opacity-0')}  fill={true} sizes='100%' priority={true} src={product.thumbnail.secure_url} alt="Image" /></div>
            <div className="flex items-center text-xl mt-4 mb-1">
                <FaStar className={`${(product.rating >= 1) ? "text-main-800" : "text-slate-700"}`} />
                <FaStar className={`${(product.rating >= 2) ? "text-main-800" : "text-slate-700"}`} />
                <FaStar className={`${(product.rating >= 3) ? "text-main-800" : "text-slate-700"}`} />
                <FaStar className={`${(product.rating >= 4) ? "text-main-800" : "text-slate-700"}`} />
                <FaStar className={`${(product.rating >= 5) ? "text-main-800" : "text-slate-700"}`} />
            </div>
            <h1 className="text-2xl font-bold text-slate-700 h-[35px] overflow-hidden">{product.name}</h1>
            <p className="h-12 overflow-hidden">{product.description}</p>
            <h1 className="flex items-center text-lg sm:text-2xl text-main-800">
                <FaIndianRupeeSign />
                <span className=" font-bold">{product.price}</span>
            </h1>
            <button onClick={()=>{addToCart()}} className=" bg-slate-700 text-white py-1 sm:py-2 rounded-md flex items-center justify-center w-full mt-2 border-2 border-slate-700  hover:text-slate-700 hover:bg-[#3341551f] transition-all duration-300 ease-in-out">
                <span className="mr-2">Add to Cart</span>
                <MdShoppingCart />
            </button>
        </div>
    )
}

export default Card2
