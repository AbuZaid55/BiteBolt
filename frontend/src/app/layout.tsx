import type { Metadata } from "next"
import "../CSS/globals.css"
import "../CSS/table.css"
import "../CSS/loader.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import GetDetails from "./GetDetails"

import MyContextProvider from "./MyContextProvider"
import Providers from "./Providers"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export const metadata: Metadata = {
  title: "BiteBolt",
  description: "Food Website",
  keywords: ["Bite", "Bolt", "Food"],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-mukta`}>
       <link
          href="https://fonts.googleapis.com/css2?family=Mukta&family=Roboto+Slab:wght@500&display=swap&subset=greek"
          rel="stylesheet"
        />
        <MyContextProvider>
          <Providers>
            <GetDetails />
            <Header />
            {children}
            <Footer />
          </Providers>
          <ToastContainer position="bottom-right"/>
        </MyContextProvider>
      </body>
    </html>
  )
}
