import { HeartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import useAuth from "../hooks/useAuth"
import { capitalizeFirstLetter } from "../utils/string"

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
  const { data, isLoading } = useAuth()

  return (
    <nav className="container mx-auto mb-5 flex h-20 w-full items-center justify-between px-2 py-8 sm:px-6">
      <Link href="/">
        <a className="text-3xl font-bold text-black dark:text-white">MEKA</a>
      </Link>
      <div className="flex items-center space-x-5 text-gray-200">
        <ol className="hidden space-x-5 md:flex">
          {NavLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <a className="text-black transition-colors hover:text-blue-400 dark:text-white dark:hover:text-gray-400">
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ol>
        {data && (
          <div className="flex w-full items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-900">
              {data.user?.avatar ? (
                <Image
                  src={`http://localhost:3001/users/avatars/${data?.user?.id}/${data?.user?.avatar}`}
                  alt="user profile imag"
                  fill
                />
              ) : (
                <span className="text-lg font-medium text-gray-200">
                  {capitalizeFirstLetter(
                    data?.user?.name ?? data?.user?.username ?? ""
                  ).slice(0, 2)}
                </span>
              )}
            </div>
            <MagnifyingGlassIcon className="icon cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400" />
            <HeartIcon className="icon cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400" />
          </div>
        )}
        {!data && (
          <Link href={"/login"}>
            <a className="flex h-12 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-gray-200 transition-colors hover:bg-blue-900 hover:text-black dark:text-white">
              Login
            </a>
          </Link>
        )}
        {isLoading && (
          <div className="flex items-center justify-center">
            <div
              className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const HamMenu = () => {
  return <></>
}

const UserMenu = () => {
  return <></>
}

export default Navbar
