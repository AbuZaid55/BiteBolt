import AdminSiderbar from "../../components/AdminSiderbar";
import { Roboto_Slab } from "next/font/google"
import { HiOutlineClipboardList } from "react-icons/hi";
import { BiSolidCategory } from "react-icons/bi";
import {FaUserFriends,FaRupeeSign,FaNotesMedical,FaCcAmazonPay, FaAmazonPay} from "react-icons/fa";


const robotoSlab = Roboto_Slab({
  weight: "500",
  subsets: ["greek"],
  display: "swap",
})

const page = () => {
  return (
    <div className='bg-slate-200 h-[100vh] w-full flex text-slate-700'>
      <AdminSiderbar/>
      <div className='pl-20 sm:pl-24 pr-4 w-full text-slate-700 overflow-x-hidden'>
        <h1 className={`text-center text-4xl text-main-800 my-4 ${robotoSlab.className}`}>DASHBOARD</h1>

        <div className="grid grid-cols-6 gap-5">
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-2 text-white bg-cyan-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between"><h1>ORDERS</h1><FaNotesMedical/></div>
            <h1 className="text-2xl font-bold mt-4">259</h1>
          </div>
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-2 text-white bg-orange-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between"><h1>CATEGORIES</h1><BiSolidCategory/></div>
            <h1 className="text-2xl font-bold mt-4">259</h1>
          </div>
          <div className="p-2 col-span-6 sm:col-span-6 lg:col-span-2 text-white bg-pink-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between"><h1>PAYMENTS</h1><FaCcAmazonPay/></div>
            <h1 className="text-2xl font-bold mt-4 flex items-center justify-start"><FaRupeeSign/>259</h1>
          </div>
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-3 text-white bg-blue-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between"><h1>PRODUCTS</h1><HiOutlineClipboardList/></div>
            <h1 className="text-2xl font-bold mt-4">259</h1>
            <p className="flex items-center justify-between text-base border-t mt-2 pt-2"><span>Stock:- 34</span><span>Out Of Stock:- 200</span></p>
          </div>
          <div className="p-2 col-span-6 sm:col-span-3 lg:col-span-3 text-white bg-green-500 text-xl rounded-md shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between"><h1>COUSTOMERS</h1><FaUserFriends/></div>
            <h1 className="text-2xl font-bold mt-4">259</h1>
            <p className="flex items-center justify-between text-base border-t mt-2 pt-2"><span>Admin:- 1</span><span>User:- 200</span></p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page;
