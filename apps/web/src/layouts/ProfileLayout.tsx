import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { atom, useAtom, useSetAtom } from "jotai"
import { NextSeo } from "next-seo"
import type { NextSeoProps } from "next-seo"
import Link from "next/link"
import React, { useEffect } from "react"
import { useMedia } from "react-use"

import MainViewLayout from "./MainViewLayout"

import { useGetMyDesigner } from "../libs/api/Designer"
import { useGetVendors } from "../libs/api/Vendor"

export const profileMenuAtom = atom(false)

const ProfileLayout = ({
  children,
  seo,
}: {
  children: React.ReactNode
  seo?: NextSeoProps
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(profileMenuAtom)

  const isDesktop = useMedia("(min-width: 1024px)", true)

  useEffect(() => {
    // Close profile menu on desktop
    if (isDesktop) {
      setIsSidebarOpen(false)
    }
  }, [isDesktop, setIsSidebarOpen])

  return (
    <>
      <NextSeo {...seo} />
      <MainViewLayout
        className="relative flex flex-shrink flex-col pb-10 lg:flex-row"
        hideFooter
      >
        {/* Sidebar Button */}

        {isDesktop ? null : (
          <button
            className={classNames(
              "fixed top-16 left-0 z-20 flex h-16 w-16 items-center justify-center rounded-r-full bg-white text-gray-600 shadow-lg lg:hidden"
            )}
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <Bars3BottomLeftIcon className="h-6 w-6" />
          </button>
        )}

        {/* Sidebar */}
        <div
          className={classNames(
            isSidebarOpen
              ? "fixed left-10 z-10 block rounded-md bg-primary-light shadow-lg shadow-indigo-400"
              : `hidden lg:inline-block`,
            "lg:sticky lg:top-10 lg:h-full lg:w-52 lg:shadow-none"
          )}
        >
          <ProfileSidebar />
        </div>

        {/* Main content */}
        <div className="min-h-full w-full overflow-auto px-4 pt-10 dark:bg-zinc-700">
          {children}
          <footer className="mt-10">
            <ProfileFooter />
          </footer>
        </div>
      </MainViewLayout>
    </>
  )
}

const ProfileSidebar = () => {
  const vendors = useGetVendors()
  const designer = useGetMyDesigner()

  const setSidebarMenu = useSetAtom(profileMenuAtom)

  return (
    <section className="flex h-full w-full flex-col justify-between gap-y-2 p-4 transition-colors lg:h-[calc(100vh_-_150px)]">
      <ul className="flex flex-col">
        {SidebarTags.map((tag) => (
          <li
            key={tag.name}
            className="relative flex h-12 w-full flex-row items-center justify-start rounded px-4 text-sm font-medium text-gray-800 hover:bg-indigo-200 hover:text-gray-900 lg:hover:bg-gray-200 "
            onClick={() => setSidebarMenu(false)}
          >
            {tag.type === "vendors" &&
              (vendors ? (
                <SidebarRow
                  name={vendors ? "Your Vendors" : "Create Vendor"}
                  href={tag.href}
                />
              ) : null)}
            {tag.type === "designer" &&
              (vendors ? (
                <SidebarRow
                  name={designer ? "Designer" : "Join as a Designer"}
                  href={tag.href}
                />
              ) : null)}
            {!tag.type ? <SidebarRow name={tag.name} href={tag.href} /> : null}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col">
        {SidebarFooterTags.map((tag) => (
          <li
            key={tag.name}
            className="relative flex h-12 w-full flex-row items-center justify-start whitespace-nowrap rounded px-4 text-sm font-medium text-gray-800 hover:bg-indigo-200 hover:text-gray-900 lg:hover:bg-gray-200 "
            onClick={() => setSidebarMenu(false)}
          >
            <SidebarRow name={tag.name} href={tag.href} />
          </li>
        ))}
      </ul>
    </section>
  )
}

const ProfileFooter = () => {
  return (
    <div className="container mb-2 flex flex-wrap justify-center px-2 text-sm text-gray-700 sm:mx-auto sm:px-6 xl:justify-between">
      <p className="text-center">
        &copy; {new Date().getFullYear()} Modified by Meka Group Buys. All
        rights reserved.
      </p>
      <p className="text-center">
        By accessing this page, you agree to our Terms.
      </p>
    </div>
  )
}

const SidebarRow = ({
  name,
  href,
}: {
  name: string
  href: string
}): JSX.Element => (
  <Link
    href={href}
    className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0"
  >
    {name}
  </Link>
)

const SidebarTags = [
  {
    name: "My Profile",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile`,
  },
  {
    type: "designer",
    name: "Join Designer",
    active: "My Designs",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/designer`,
  },
  {
    type: "vendors",
    name: "Create Vendor",
    active: "My Products",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/vendors`,
  },
  {
    name: "Favorites",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/favorites`,
  },
  {
    name: "Settings",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/settings`,
  },
]

const SidebarFooterTags = [
  {
    name: "Help",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/resources`,
  },
  {
    name: "Data & Privacy",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/privacy`,
  },
  {
    name: "Terms of Service",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/terms`,
  },
  {
    name: "Log Out",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/logout`,
  },
]

export default ProfileLayout
