import Head from 'next/head'
import React from 'react'

import Footer from './Footer'
import NavBar from './NavBar'


const Layout = ({children}: LayoutProps) => {
  return (
    <div className='layout'>
      <Head>
        <title> Amegakure no Sato Store</title>
        <link rel="icon" type="image/png" href="/index.png" />
      </Head>
      <header>
        <NavBar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export interface LayoutProps  { 
  children: React.ReactNode
}

export default Layout