"use client"
import React, { useEffect } from "react"
import { useAppDispatch,useAppSelector } from "../../Redux/hook"
import { GetCategories, GetFilterProducts, GetProducts, GetUser } from "../../Redux/asyncThunk"
import { useMyContext } from "./MyContextProvider"

const GetDetails = () => {
  const { setLoader } = useMyContext()
  const dispatch = useAppDispatch()
  const products = useAppSelector((state)=>state.product.filterProducts)
  const appliedFilter = useAppSelector((state)=>state.product.appliedFilter)

  const getUser = async() => {
    setLoader(true)
    await dispatch(GetUser())
    setLoader(false)
  }
  const getCategories = async() => {
    setLoader(true)
    await dispatch(GetCategories())
    setLoader(false)
  }
  // const getProduct = async() =>{
  //   setLoader(true)
  //   await dispatch(GetProducts())
  //   setLoader(false)
  // }
  const getFilterProduct = async() =>{
    setLoader(true)
    await dispatch(GetFilterProducts({...appliedFilter,page:1}))
    setLoader(false)
  }
  

  useEffect(() => {
    getUser()
    getCategories()
    // getProduct()
  }, [])
  useEffect(()=>{
    if(appliedFilter.filterPrice!=0){
      getFilterProduct()
    }
  },[appliedFilter.selectedCat,appliedFilter.filterPrice,appliedFilter.filterRating])
  return <></>
}

export default GetDetails;
