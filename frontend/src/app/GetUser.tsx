"use client"
import React, { useEffect } from "react"
import { useAppDispatch } from "../../Redux/hook"
import { GetUser } from "../../Redux/asyncThunk"

const getUser = () => {
  const dispatch = useAppDispatch()
  const getUser = () => {
    dispatch(GetUser())
  }
  useEffect(() => {
    getUser()
  }, [])
  return <></>
}

export default getUser
