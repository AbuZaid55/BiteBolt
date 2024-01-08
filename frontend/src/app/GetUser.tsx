"use client"
import React, { useEffect } from "react"
import { useAppDispatch } from "../../Redux/hook"
import { GetUser } from "../../Redux/asyncThunk"
import { useMyContext } from "./MyContextProvider"

const getUser = () => {
  const { setLoader } = useMyContext()
  const dispatch = useAppDispatch()
  const getUser = async() => {
    setLoader(true)
    await dispatch(GetUser())
    setLoader(false)
  }
  useEffect(() => {
    getUser()
  }, [])
  return <></>
}

export default getUser
