"use client"
import Container from '@/components/header/Container';
import { useSession } from 'next-auth/react'
import React from 'react'


const DashboardPage = () => {
  document.title = "Admin | Dashboard"
    const {data: session} = useSession();
  return (
    <Container className="sm:py-4">
        <p className='font-semibold text-sm text-gray-400 tracking-wider flex flex-col'>Welcome, <span className='text-black/70 text-2xl'>{session?.user?.name}</span></p>
    </Container>
  )
}

export default DashboardPage