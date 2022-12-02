import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import dynamic from "next/dynamic"
import Link from "next/link"
import React from "react"

import useAuth from "../../hooks/useAuth"

const Avatar = dynamic(() => import("./Avatar"), { ssr: false })

const NavLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Resources",
    href: "/resources",
  },
]

const Navbar = () => {
  const { user, isLoading } = useAuth()

  return (
    <nav className="container mx-auto mb-5 flex h-20 w-full items-center justify-between py-8 px-4 sm:px-6 lg:px-8">
      <Link href="/" className="text-3xl font-bold text-black dark:text-white">
        MEKA
      </Link>

      <div className="flex items-center space-x-5 text-gray-200">
        <ol className="hidden space-x-5 md:flex">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-black transition-colors hover:text-blue-400 dark:text-white dark:hover:text-gray-400"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ol>
        {user ? (
          <div className="flex w-full items-center gap-3">
            <Avatar user={user} />
            <MagnifyingGlassIcon className="icon cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400" />
            <HeartIcon className="icon cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400" />
          </div>
        ) : null}
        {!user && !isLoading ? (
          <Link
            href={"/login"}
            className="flex h-12 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-gray-200 transition-colors hover:bg-blue-900 hover:text-black dark:text-white"
          >
            Login
          </Link>
        ) : null}
      </div>
    </nav>
  )
}

const HamMenu = () => {
  return <></>
}

export default Navbar
