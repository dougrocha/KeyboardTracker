import Link from 'next/link'
import React from 'react'

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

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Navbar = () => {
  const user = {
    name: 'Douglas Rocha',
  }
  return (
    <nav className="flex h-20 items-center justify-between font-rubik">
      <p className="text-5xl font-bold">KGT</p>
      <div className="flex items-center space-x-5">
        {NavLinks.map(link => (
          <Link key={link.name} href={link.href}>
            <a className="text-gray-300 transition-colors hover:text-blue-400">
              {link.name}
            </a>
          </Link>
        ))}
        {user ? (
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-blue-900">
            <span className="text-lg font-medium text-gray-300">
              {capitalizeFirstLetter(user.name).slice(0, 2)}
            </span>
          </div>
        ) : (
          <div className="relative flex h-12 items-center justify-center overflow-hidden rounded-lg bg-blue-900 px-4">
            <Link href={'/login'}>
              <a className="font-medium text-gray-300 transition-colors hover:text-blue-400">
                Login
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
