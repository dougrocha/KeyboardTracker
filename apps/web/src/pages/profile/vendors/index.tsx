import {
  AdjustmentsVerticalIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ListBulletIcon,
  PlusIcon,
} from "@heroicons/react/20/solid"
import { CheckBadgeIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import { Vendor } from "@meka/database"
import Link from "next/link"
import React from "react"

import Form from "../../../components/Forms/Form"
import Input from "../../../components/Forms/Input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeading,
  DialogTrigger,
  useDialogState,
} from "../../../components/ModalDialog"
import ProfileHeader from "../../../components/Profile/ProfileHeader"
import ProfileSection from "../../../components/Profile/ProfileSection"
import ProfileLayout from "../../../layouts/ProfileLayout"
import { useCreateVendor, useGetVendors } from "../../../libs/api/Vendor"

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

      <Dialog>
        <DialogTrigger className="flex w-min items-center justify-center space-x-2 rounded bg-indigo-500 px-3 py-1 text-white">
          <span className="whitespace-nowrap text-lg font-medium">
            Create Vendor
          </span>
          <PlusIcon className="h-6 w-6" />
        </DialogTrigger>
        <DialogContent className="m-4 max-w-4xl rounded bg-primary-light px-2 py-12 sm:px-8 lg:w-1/2">
          <DialogHeading className="text-3xl font-semibold">
            Create Vendor
          </DialogHeading>
          <DialogDescription className="mt-2 text-lg text-neutral-600">
            Sells your newest products to the world with us.
          </DialogDescription>
          <CreateVendorForm />
        </DialogContent>
      </Dialog>
    </>
  )
}

const CreateVendorForm = () => {
  const { setOpen } = useDialogState()

  const { createVendor, isSuccess, isLoading } = useCreateVendor()

  const onSubmit = (data: Partial<Vendor>) => {
    createVendor(data)
    setTimeout(() => setOpen(false), 1000)
  }

  return (
    <Form onSubmit={onSubmit} className="mt-4 flex flex-col gap-y-4">
      <Input
        id="name"
        label="Vendor Name"
        type="text"
        className="rounded border"
      />
      <div className="flex flex-row items-center justify-end gap-x-4">
        <DialogClose
          type="button"
          className="flex items-center gap-x-2 rounded-md bg-gray-300 px-4 py-2 text-gray-800 shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Cancel
        </DialogClose>

        <button
          type="submit"
          className="flex items-center gap-x-2 rounded-md bg-gray-800 px-4 py-2 text-white shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          {isLoading && !isSuccess ? (
            <span className="animate-spin">
              <ArrowPathIcon className="h-5 w-5" />
            </span>
          ) : (
            "Create"
          )}
          {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
        </button>
      </div>
    </Form>
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
