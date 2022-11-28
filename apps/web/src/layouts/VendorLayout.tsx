import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { PropsWithChildren, useEffect } from "react"

import MainViewLayout from "./MainViewLayout"

import { UseGetVendor } from "../libs/api/Vendor"

const VendorLayout = ({ children }: PropsWithChildren) => {
  const {
    query: { id },
    asPath,
    push,
    isReady,
  } = useRouter()

  useEffect(() => {
    if (isReady && !id) {
      push("/profile/vendors")
    }
  }, [isReady, push, id])

  const { vendor } = UseGetVendor(id as string)

  if (!isReady || !id || !vendor) return null

  const isActive = (path: string) =>
    asPath === `/profile/vendors/${id}${path ? `/${path}` : ""}`

  return (
    <MainViewLayout hideFooter>
      <div className="mb-10 w-full border-b border-b-gray-700 p-2">
        <ul className="flex space-x-5">
          {VendorTabs.map((tab) => (
            <li key={`dashboard-tab-${tab.name}`}>
              <Link
                href={{
                  pathname: `/profile/vendors/[id]/${tab.href}`,
                  query: { id },
                }}
                className={classNames(
                  "rounded px-4 py-1 text-sm tracking-wide transition-colors",
                  isActive(tab.href) && "bg-gray-600 text-white",
                  !isActive(tab.href) && "hover:bg-gray-300"
                )}
              >
                {tab.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* This children element will always take in a vendor object */}
      <div className={"mx-auto flex w-full flex-col space-y-5 px-2"}>
        {React.cloneElement(children as React.ReactElement, { vendor })}
      </div>
    </MainViewLayout>
  )
}

const VendorTabs: {
  name: string
  href: string
  position?: "left" | "right"
}[] = [
  {
    name: "Dashboard",
    href: "",
  },
  {
    name: "Products",
    href: "products",
  },
  {
    name: "Settings",
    href: "settings",
  },
]

export default VendorLayout
