import type { Metadata } from 'next'
import { Mukta } from 'next/font/google'
import './globals.css'
import Header from './components/Header'

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
      </body>
    </html>
  )
}
