"use client";

import React from 'react'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { usePathname } from 'next/navigation';

const GeneralLayout = ({children}) => {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");
  return (
    <React.Fragment>
        {!isAdminPage && <Header />}
        {children}
        {!isAdminPage && <Footer />}
    </React.Fragment>
  )
}   

export default GeneralLayout