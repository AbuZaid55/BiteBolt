"use client"
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState, useContext } from "react"

interface MyContextType {
  setLoader: Dispatch<SetStateAction<boolean>>
}

const MyContext = createContext<MyContextType | null>(null)

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider")
  }
  return context
}

const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [loader, setLoader] = useState<boolean>(false)
  return <MyContext.Provider value={{ setLoader }}>
    <div className={`${(loader)?"flex":"hidden"} fixed z-[100] top-0 left-0 w-full h-full bg-[#47484f67] items-center justify-center`}><div className='loader'></div></div>
    {children}
    </MyContext.Provider>
}

export default MyContextProvider
