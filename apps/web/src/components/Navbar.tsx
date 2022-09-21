import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { capitalizeFirstLetter } from '../utils/string'

const NavLinks = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'My Favorites',
    href: '/user/liked',
  },
]

const Navbar = () => {
  const { data, isLoading, error } = useAuth()

  return (
    <nav className="flex h-20 items-center justify-between font-rubik">
      <p className="text-5xl font-bold">KGT</p>
      <div className="flex items-center space-x-5">
        {NavLinks.map(link => (
          <Link key={link.name} href={link.href}>
            <a className="text-gray-200 transition-colors hover:text-blue-400">
              {link.name}
            </a>
          </Link>
        ))}
        {data ? (
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-blue-900">
            <span className="text-lg font-medium text-gray-200">
              {capitalizeFirstLetter(
                data?.user?.name ?? data?.user?.username ?? ''
              ).slice(0, 2)}
            </span>
          </div>
        ) : (
          <Link href={'/login'}>
            <a className="flex h-12 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-gray-200 transition-colors hover:bg-blue-900 hover:text-white">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
