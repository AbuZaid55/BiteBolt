import type { Metadata } from 'next'
import { Mukta } from 'next/font/google'
import './globals.css'
import './CSS/table.css'
import Header from './components/Header'
import Footer from './components/Footer'

import Providers from './Providers'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mukta = Mukta({ weight: '400', subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: 'BiteBolt',
  description: 'Food Website',
  keywords: ["Bite", "Bolt", "Food"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${mukta.className} select-none`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
