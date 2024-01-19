"use client"
import AdminSiderbar from "../../components/AdminSiderbar"
import { Roboto_Slab } from "next/font/google"
import { HiOutlineClipboardList } from "react-icons/hi"
import { BiSolidCategory } from "react-icons/bi"
import { FaUserFriends, FaRupeeSign, FaNotesMedical, FaCcAmazonPay } from "react-icons/fa"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook"
import { useRouter } from "next/navigation"
import { useMyContext } from "@/app/MyContextProvider"
import { GetCategoriesLength, GetChartPayment, GetOrdersLength, GetProductsLength, GetTotalPayment, GetUsersLength } from "../../../../Redux/asyncThunk"

const BarChart = dynamic(() => import("../../../../chartJS/BarChart"), { ssr: false })
const LineChart = dynamic(() => import("../../../../chartJS/LineChart"), { ssr: false })

const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: "swap",
})

const page = () => {
  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { setLoader } = useMyContext()
  const [updatePage,setUpdatePage]=useState(true)
  const [page,setPage]=useState(1)
  const [data, setData] = useState({
    categories: 0,
    products: { inStock: 0, outStock: 0 },
    customers: { admin: 0, user: 0 },
    orders: {
      totalOrder:0,
      order:[
        { name: "Placed", count: 0 },
        { name: "Confirmed", count: 0 },
        { name: "Processing", count: 0 },
        { name: "Pickup", count: 0 },
        { name: "Delivered", count: 0 },
        { name: "Cancelled", count: 0 },
        { name: "Refund", count: 0 },
      ]
    },
    totalPayment:0,
    payments:[{totalPaidAmount:0}]
  })

  const handlePage = (opr:string)=>{
    if(opr==="add"){
        if(updatePage){
          setPage((pre)=>page+1)
        }
    }
    if(opr==="sub"){
      if(page>1){
        setUpdatePage(true)
        setPage(page-1)
      }
    }
  }
  const getDetails = async () => {
    if(user._id && user.admin){
      const result1 = await dispatch(GetCategoriesLength())
      if (result1.meta.requestStatus === "fulfilled") {
        setData((prevData) => ({ ...prevData, categories: result1.payload.data }));
      }
      const result2 = await dispatch(GetProductsLength())
      if (result2.meta.requestStatus === "fulfilled") {
         setData((prevData) => ({ ...prevData, products: result2.payload.data }));
      }
      const result3 = await dispatch(GetUsersLength())
      if (result3.meta.requestStatus === "fulfilled") {
         setData((prevData) => ({ ...prevData, customers: result3.payload.data }));
      }
      const result4 = await dispatch(GetOrdersLength())
      if(result4.meta.requestStatus==="fulfilled"){
         setData((prevData) => ({ ...prevData, orders: result4.payload.data }));
      }
      const result5 = await dispatch(GetTotalPayment())
      if(result5.meta.requestStatus==="fulfilled"){
         setData((prevData) => ({ ...prevData, totalPayment: result5.payload.data }));
      }
    }
  }
  const getChartPayment = async(page:number)=>{
    const result = await dispatch(GetChartPayment({page:page}))
    if(result.meta.requestStatus==="fulfilled"){
      setData((pre)=>({...pre,payments:result.payload.data}))
      if(result.payload.data.length<7){
        setUpdatePage(false)
      }
    }
  }

  useEffect(() => {
    if (user._id !== "1" && !user.admin) {
      router.push("/login")
    } else {
      getDetails()
    }
  }, [user])
  useEffect(()=>{
    if(user._id && user.admin){
      getChartPayment(page)
    }
  },[user,page])
  return (
    <div className="bg-slate-200 h-[100vh] w-full flex text-slate-700">
      <AdminSiderbar />
      <div className="pl-20 sm:pl-24 pr-4 w-full text-slate-700 overflow-x-hidden">
        <h1 className={`text-center text-4xl text-main-800 my-4 ${robotoSlab.className}`}>DASHBOARD</h1>

        <div className="grid grid-cols-6 gap-5">
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-2 text-white bg-cyan-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <h1>ORDERS</h1>
              <FaNotesMedical />
            </div>
            <h1 className="text-2xl font-bold mt-4">{data.orders.totalOrder}</h1>
          </div>
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-2 text-white bg-orange-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <h1>CATEGORIES</h1>
              <BiSolidCategory />
            </div>
            <h1 className="text-2xl font-bold mt-4">{data.categories}</h1>
          </div>
          <div className="p-2 col-span-6 sm:col-span-6 lg:col-span-2 text-white bg-pink-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <h1>PAYMENTS</h1>
              <FaCcAmazonPay />
            </div>
            <h1 className="text-2xl font-bold mt-4 flex items-center justify-start">
              <FaRupeeSign size={21} />
              {data.totalPayment}
            </h1>
          </div>
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-3 text-white bg-blue-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <h1>PRODUCTS</h1>
              <HiOutlineClipboardList />
            </div>
            <h1 className="text-2xl font-bold mt-4">{data.products.inStock + data.products.outStock}</h1>
            <p className="flex items-center justify-between text-base border-t mt-2 pt-2">
              <span>In Stock:- {data.products.inStock}</span>
              <span>Out Of Stock:- {data.products.outStock}</span>
            </p>
          </div>
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-3 text-white bg-green-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between">
              <h1>CUSTOMERS</h1>
              <FaUserFriends />
            </div>
            <h1 className="text-2xl font-bold mt-4">{data.customers.admin + data.customers.user}</h1>
            <p className="flex items-center justify-between text-base border-t mt-2 pt-2">
              <span>Admin:- {data.customers.admin}</span>
              <span>User:- {data.customers.user}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 h-[400px] my-4">
          <div className="h-full">
            <BarChart order={data.orders.order}/>
          </div>
          <div className="h-full relative">
            <LineChart payments={data.payments}/>
            <div className="absolute bottom-10 right-10 flex">
              <button onClick={()=>{handlePage("add")}} className=" bg-slate-700 text-xl rounded-md w-8 h-6 text-white m-1 flex items-center justify-center"> &#x2190; </button>
              <button onClick={()=>{handlePage("sub")}} className=" bg-slate-700 text-xl rounded-md w-8 h-6 text-white m-1 flex items-center justify-center">  &#x2192; </button></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
