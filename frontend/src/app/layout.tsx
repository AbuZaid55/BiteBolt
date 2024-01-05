import type { Metadata } from 'next'
import { Mukta } from 'next/font/google'
import './globals.css'
import './CSS/table.css'
import Header from './components/Header'
import Footer from './components/Footer'

const mukta = Mukta({ weight:'400', subsets:["latin"], display:"swap" })

export const metadata: Metadata = {
  title: 'BiteBolt',
  description: 'Food Website',
  keywords:["Bite","Bolt","Food"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mukta.className} select-none`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
