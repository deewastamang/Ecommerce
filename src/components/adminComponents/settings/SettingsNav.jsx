"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SettingsNav = () => {
    const pathname = usePathname();
    const settingLinks = [
        {
            title: "Featured Products",
            path: "/admin/settings",
        },
        {
            title: "Featured Banners",
            path: "/admin/settings/featuredBanner",
        },
    ]
  return (
    <div className='py-4 flex justify-center'>
        <ul className='flex gap-x-8'>
            {settingLinks?.map(item => (
                <li key={item.title}>
                    <Link href={item.path} className={pathname === item.path ? "pb-4 border-b-2 border-b-black": ""}>
                        {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default SettingsNav