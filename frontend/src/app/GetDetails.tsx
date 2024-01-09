"use client"
import React, { useEffect } from "react"
import { useAppDispatch } from "../../Redux/hook"
import { GetCategories, GetUser } from "../../Redux/asyncThunk"
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
  useEffect(() => {
    getUser()
    getCategories()
  }, [])
  return <></>
}

export default GetDetails;
