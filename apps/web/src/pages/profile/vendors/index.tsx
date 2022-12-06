import {
  AdjustmentsVerticalIcon,
  ListBulletIcon,
} from "@heroicons/react/20/solid"
import { CheckBadgeIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import { Vendor } from "@meka/database"
import Link from "next/link"
import React from "react"

import ProfileHeader from "../../../components/Profile/ProfileHeader"
import ProfileSection from "../../../components/Profile/ProfileSection"
import ProfileLayout from "../../../layouts/ProfileLayout"
import { useGetVendors } from "../../../libs/api/Vendor"

const VendorPage = () => {
  const { vendors } = useGetVendors()

  if (vendors?.length === 0) return <CreateVendorPage />

  return (
    <>
      <ProfileHeader
        title={
          <>
            <b>Welcome Back! </b> <span>What will you make today?</span>
          </>
        }
      />

      <ProfileSection className="grid gap-10 xl:grid-cols-2">
        {vendors?.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </ProfileSection>
    </>
  )
}

const VendorCard = ({ vendor }: { vendor: Vendor }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 rounded-lg bg-white p-4 text-center shadow-md">
      <h2 className="text-xl font-bold text-gray-900">{vendor.name}</h2>

      <div className="mx-auto my-4 space-y-4">
        {/* Verified icon */}
        <div className="flex w-full items-center">
          {vendor.verified ? (
            <>
              <>
                <CheckBadgeIcon className="mr-2 h-6 w-6" />
                <span className="ml-2 text-sm text-gray-600">Verified</span>
              </>
            </>
          ) : (
            <>
              <ListBulletIcon className="mr-2 h-6 w-6" />
              <span className="ml-2 text-sm text-gray-600">Unverified</span>
            </>
          )}
        </div>

        <p className="flex w-full items-center text-base leading-relaxed">
          <GlobeAltIcon className="mr-2 h-6 w-6" />
          <span className="ml-2 text-sm text-gray-600">{vendor.country}</span>
        </p>
      </div>

      <div className="grid w-full min-w-full items-center gap-4 text-white lg:grid-cols-3">
        {VendorButtonsList.map((button) => (
          <Link
            key={button.text}
            href={{
              pathname: button.href,
              query: { id: vendor.id },
            }}
          >
            <button className="flex w-full items-center justify-center rounded bg-blue-700 px-4 py-2">
              <>
                {React.createElement(button.icon, {
                  className: "mr-2 h-6 w-6 flex-shrink-0",
                })}
                <span>{button.text}</span>
              </>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}

const CreateVendorPage = () => {
  return (
    <>
      <ProfileHeader title="Create your vendor account today!" />
    </>
  )
}

const VendorButtonsList = [
  {
    icon: AdjustmentsVerticalIcon,
    text: "Manage",
    href: "/profile/vendors/[id]",
  },
  {
    icon: ListBulletIcon,
    text: "Products",
    href: "/profile/vendors/[id]/products",
  },
  {
    icon: AdjustmentsVerticalIcon,
    text: "Edit",
    href: "/profile/vendors/[id]/settings",
  },
]

VendorPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default VendorPage
