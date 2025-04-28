"use client"
import React, { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import AdminSiderbar from "../../../components/AdminSiderbar"
import { FaAngleDown, FaAngleUp } from "react-icons/fa"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "../../../Redux/hook"
import { useMyContext } from "@/app/MyContextProvider"
import { DeleteCat, DeleteSubCat, GetCategories } from "../../../Redux/asyncThunk"
import { useRouter } from "next/navigation"


type DeleteCat = (value: { [key: string]: string }) => void

const Page = () => {
  const [showSubCat, setShowSubCat] = useState("")
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleteFun, setDeleteFun] = useState<DeleteCat | null>(null)
  const [value, setValue] = useState({})
  const categories = useAppSelector((state) => state.category.categories)
  const {setLoader}=useMyContext()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state)=>state.user)
  const router = useRouter()

  const deletCategory: DeleteCat = async (value) => {
    setLoader(true)
    const result = await dispatch(DeleteCat({_id:value._id}))
    if(result.meta.requestStatus==="fulfilled"){
      dispatch(GetCategories())
    }
    setShowConfirm(false)
    setLoader(false)
  }
  const deletSubCategory: DeleteCat = async (value) => {
    setLoader(true)
    const result = await dispatch(DeleteSubCat({subCatId:value.subCatId,catId:value.catId}))
    if(result.meta.requestStatus==="fulfilled"){
      dispatch(GetCategories())
    }
    setShowConfirm(false)
    setLoader(false)
  }
  useEffect(()=>{
    if(user._id!=="1" && !user.admin){
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  return (
    <div className="flex">
      <AdminSiderbar />
      <div className="w-full text-slate-700 bg-slate-200 min-h-[100vh] pl-20 sm:pl-24 pr-4">
        <h1 className={`font-robotoSlab text-4xl sm:text-5xl text-center my-6 text-main-800 `}>Category</h1>
        <div className="text-white ">
          {categories.map((object) => {
            return (
              <div key={object._id}>
                <h1
                  className="flex items-center justify-between bg-white text-slate-700 py-2 px-4 text-xl cursor-pointer border-b-2"
                  onClick={() => {
                    showSubCat === object._id ? setShowSubCat("") : setShowSubCat(object._id)
                  }}
                >
                  {object.name}
                  {object.subCategories.length == 0 ? (
                    <FaTrash
                      onClick={() => {
                        setShowConfirm(true), setDeleteFun(()=>deletCategory), setValue({ _id: object._id })
                      }}
                      className="text-red-700 hover:text-red-800 transition-all duration-300 ease-in-out"
                    />
                  ) : showSubCat === object._id ? (
                    <FaAngleDown />
                  ) : (
                    <FaAngleUp />
                  )}
                </h1>
                {object.subCategories.map((object2) => {
                  return (
                    <div key={object2._id}>
                      {showSubCat === object._id && (
                        <div className="flex items-center justify-between bg-slate-300 text-xl text-slate-700 px-8 py-1 border-b border-slate-400 cursor-pointer">
                          {object2.name}
                          <FaTrash
                            onClick={() => {
                              setShowConfirm(true), setDeleteFun(()=>deletSubCategory), setValue({ catId: object._id, subCatId: object2._id })
                            }}
                            className="text-red-700 hover:text-red-800 transition-all duration-300 ease-in-out"
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex items-center justify-end px-5">
          {" "}
          <Link href="/admin/addcategory" className=" text-center bg-main-800 text-white px-4 py-2 rounded-full my-4 cursor-pointer border-2 border-main-800 hover:text-main-800 hover:bg-[#44b67721] transition-all duration-300 ease-in-out">
            Add Category
          </Link>
        </div>

        <div className={`${showConfirm ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full items-center justify-center bg-[#3341557f]`}>
          <div className=" w-56 h-56 border p-4  bg-white rounded  flex items-stretch justify-between flex-col border-main-800 shadow-lg">
            <h1 className=" text-center text-2xl">Are your sure you want to delete?</h1>
            <p className="text-red-700 -mt-5">*All Products will be delete of this category</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  deleteFun && deleteFun(value)
                }}
                className=" bg-red-700 text-white px-3 py-2 rounded hover:bg-[#3341551f] border-2 border-red-700 hover:text-red-700 transition-all duration-300 ease-in-out"
              >
                YES
              </button>
              <button
                className=" bg-main-800 text-white px-3 py-2 rounded hover:bg-[#44b67721] border-2 border-main-800 hover:text-main-800 transition-all duration-300 ease-in-out"
                onClick={() => {
                  setShowConfirm(false)
                }}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
