"use client"
import React, { useEffect } from "react"
import { useAppDispatch } from "../../Redux/hook"
import { GetCategories, GetProducts, GetUser } from "../../Redux/asyncThunk"
import { useMyContext } from "./MyContextProvider"

const GetDetails = () => {
  const { setLoader } = useMyContext()
  const dispatch = useAppDispatch()

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
  const getProduct = async() =>{
    setLoader(true)
    await dispatch(GetProducts())
    setLoader(false)
  }
  useEffect(() => {
    getUser()
    getCategories()
    getProduct()
  }, [])
  return <></>
}

export default GetDetails;
