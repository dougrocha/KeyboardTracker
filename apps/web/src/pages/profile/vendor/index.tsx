import {
  AdjustmentsVerticalIcon,
  CheckBadgeIcon,
  GlobeAltIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import Input from "../../../components/Forms/Input"
import ProfileHeader from "../../../components/Profile/ProfileHeader"
import ProfileSection from "../../../components/Profile/ProfileSection"
import ProfileLayout from "../../../layouts/ProfileLayout"
import { UseGetVendors } from "../../../libs/api/Vendor"
import { Vendor } from "../../../types/image"

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
        <button className="flex items-center justify-center rounded bg-blue-700 px-4 py-2">
          <ListBulletIcon className="mr-2 h-6 w-6" />
          <span>Products</span>
        </button>
        <button className="flex items-center justify-center rounded bg-blue-700 px-4 py-2">
          <AdjustmentsVerticalIcon className="mr-2 h-6 w-6" />
          <span>Edit</span>
        </button>
        <button className="flex items-center justify-center rounded bg-blue-700 px-4 py-2">
          <AdjustmentsVerticalIcon className="h-6 w-6" />
          <span>Manage</span>
        </button>
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

const VendorSpecificPage = () => {
  const methods = useForm()
  const { handleSubmit, reset } = methods

  const { vendors } = UseGetVendors({
    onSuccess: (data) => {
      // On success, reset the form with the new data
      reset(data)
    },
  })

  const [readOnly, setReadOnly] = useState(true)

  const onSubmit = handleSubmit((e) => {
    console.log(e)
  })

  return (
    <ProfileSection>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="mt-8 max-w-sm space-y-4">
          <Input id="name" label="Name" readOnly={readOnly} />
          <Input id="username" label="Username" readOnly={readOnly} />
          <Input id="email" label="Email" readOnly={readOnly} />

          <div className="flex flex-col space-y-2 text-white sm:flex-row sm:justify-between sm:space-y-0">
            <button
              className="w-32 rounded bg-gray-600 px-4 py-2 text-center text-white"
              onClick={() => {
                setReadOnly(!readOnly)
                if (!readOnly) reset(vendors)
              }}
              type="button"
            >
              {readOnly ? "Edit" : "Cancel"}
            </button>
            {!readOnly && (
              <button
                className="w-32 cursor-pointer rounded bg-gray-600 px-4 py-2 text-white"
                value="Save"
                type="submit"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </ProfileSection>
  )
}

VendorPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default VendorPage
