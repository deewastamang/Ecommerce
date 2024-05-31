"use client"
import { useSession } from 'next-auth/react'
import React from 'react'


const DashboardPage = () => {
    const {data: session} = useSession();
  return (
    <div className='h-full'>
        <p className='text-2xl px-4 py-3 mx-4 text-center font-medium tracking-wide border-b-[1px] border-b-slate-300'>Welcome, <span className='text-orange-600'>{session?.user.name}</span> to the admin panel</p>
    </div>
  )
}

export default DashboardPage