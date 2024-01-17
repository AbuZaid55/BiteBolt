"use client"
import React, { useEffect, useState } from "react"
import { useAppDispatch,useAppSelector } from "../../Redux/hook"
import { GetCategories, GetFilterProducts, GetPopularProducts, GetProducts, GetUser } from "../../Redux/asyncThunk"
import { useMyContext } from "./MyContextProvider"
import { setHashMore, setPage } from "../../Redux/Slice/productSlice"
import { toast } from "react-toastify"

const GetDetails = () => {
  const { setLoader } = useMyContext()
  const dispatch = useAppDispatch()
  const appliedFilter = useAppSelector((state)=>state.product.appliedFilter)
  const pageforpopularProdct = useAppSelector((state)=>state.product.pageforpopularProduct)

  const getDetails = async() => {
    setLoader(true)
    await dispatch(GetUser())
    await dispatch(GetCategories())
    await dispatch(GetProducts())
    dispatch(setPage(1))
    setLoader(false)
  }

  const getFilterProduct = async() =>{
    setLoader(true)
    dispatch(setHashMore(true))
    const pageLimit = (process.env.NEXT_PUBLIC_PAGE_LIMIT)?process.env.NEXT_PUBLIC_PAGE_LIMIT:1000
    const result = await dispatch(GetFilterProducts({...appliedFilter,page:1}))
    if(result.payload && result.payload.data.length < pageLimit){
      dispatch(setHashMore(false))
    }
    if(result.payload && result.payload.data.length==0){
      toast.error("No product found!")
    }
    setLoader(false)
  }
  const getPopProduct=async()=>{
    await dispatch(GetPopularProducts({page:pageforpopularProdct}))
  }

  useEffect(() => {
   getDetails()
  }, [])
  useEffect(()=>{
    if(pageforpopularProdct!=0 && pageforpopularProdct!=-1){
      getPopProduct()
    }
  },[pageforpopularProdct])
  useEffect(()=>{
    if(appliedFilter.filterPrice!=0){
      getFilterProduct()
    }
  },[appliedFilter.selectedCat,appliedFilter.filterPrice,appliedFilter.filterRating,appliedFilter.search])
  return <></>
}

export default GetDetails;
