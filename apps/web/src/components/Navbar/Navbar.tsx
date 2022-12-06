import {
  Bars3BottomRightIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { atom, useAtom } from "jotai"
import dynamic from "next/dynamic"
import Link from "next/link"
import React, { useEffect } from "react"
import { useMedia } from "react-use"

import useAuth from "../../hooks/useAuth"

const Avatar = dynamic(() => import("./Avatar"))

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

// make jotai atom for storing hamburger menu state
export const hamMenuAtom = atom(false)

const Navbar = () => {
  const { user, isLoading } = useAuth()

  const [isHamOpen, setHamOpen] = useAtom(hamMenuAtom)

  const isDesktop = useMedia("(min-width: 768px)", true)

  useEffect(() => {
    // Close hamburger menu on desktop
    if (isDesktop) {
      setHamOpen(false)
    }
  }, [isDesktop, setHamOpen])

  return (
    <nav className="container relative mx-auto mb-5 flex h-20 w-full items-center justify-between py-8 px-4 sm:px-6 lg:px-8">
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

        {!user && !isLoading ? (
          <Link
            href={"/login"}
            className="flex h-12 items-center justify-center rounded-lg bg-blue-600 px-4 font-medium text-gray-200 transition-colors hover:bg-blue-900 hover:text-black dark:text-white"
          >
            Login
          </Link>
        ) : null}

        <div className="flex w-full items-center gap-3">
          {user ? (
            <>
              <Avatar user={user} />
              <MagnifyingGlassIcon className="icon cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400" />
              <HeartIcon className="icon cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-gray-400" />
            </>
          ) : null}

          <button
            className="icon cursor-pointer text-gray-800 hover:text-indigo-500 dark:text-white dark:hover:text-indigo-400 md:hidden"
            onClick={() => setHamOpen(!isHamOpen)}
          >
            <Bars3BottomRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* make hamburger menu for mobile */}
      {isHamOpen ? <HamMenu /> : null}
    </nav>
  )
}

const HamMenu = () => {
  return (
    <div className="absolute inset-x-0 top-20 z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <ol>
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
    </div>
  )
}

export default Navbar
