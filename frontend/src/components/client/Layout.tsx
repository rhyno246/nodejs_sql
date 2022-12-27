import * as React from 'react'
import Footer from './Footer'
import Header from './Header'

interface Props {
    children : any
}

const Layout = ({ children } : Props) => {
  return (
    <div className="layout">
        <Header />
        <div className="main">
            {children}
        </div>
        <Footer />
    </div> 
  )
}

export default Layout