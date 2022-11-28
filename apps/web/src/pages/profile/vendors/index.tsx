import {
  AdjustmentsVerticalIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import React from "react"

import ProfileHeader from "../../../components/Profile/ProfileHeader"
import ProfileSection from "../../../components/Profile/ProfileSection"
import ProfileLayout from "../../../layouts/ProfileLayout"
import { UseGetVendors } from "../../../libs/api/Vendor"
import { Vendor } from "../../../types/vendor"

const VendorPage = () => {
  const { vendors } = UseGetVendors()

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

      <ProfileSection flex="row" className="gap-x-10">
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
      <div className="flex items-center justify-center space-x-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <GlobeAltIcon className="h-6 w-6 text-gray-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Vendor</span>
          <span className="text-lg font-bold text-gray-900">{vendor.name}</span>
        </div>
      </div>

      <h2 className="title-font text-lg font-medium text-gray-700">
        {vendor.name}
      </h2>
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

      <div className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-4 text-white">
        <Link
          href={{
            pathname: "/profile/vendors/[id]/products",
            query: { id: vendor.id },
          }}
        >
          <button className="flex items-center justify-center rounded bg-blue-700 px-4 py-2">
            <ListBulletIcon className="mr-2 h-6 w-6" />
            <span>Products</span>
          </button>
        </Link>
        <Link
          href={{
            pathname: "/profile/vendors/[id]",
            query: { id: vendor.id },
          }}
        >
          <button className="flex items-center justify-center rounded bg-blue-700 px-4 py-2">
            <AdjustmentsVerticalIcon className="h-6 w-6" />
            <span>Manage</span>
          </button>
        </Link>
        <Link
          href={{
            pathname: "/profile/vendors/[id]/settings",
            query: { id: vendor.id },
          }}
        >
          <button className="flex items-center justify-center rounded bg-blue-700 px-4 py-2">
            <AdjustmentsVerticalIcon className="mr-2 h-6 w-6" />
            <span>Edit</span>
          </button>
        </Link>
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

VendorPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default VendorPage
