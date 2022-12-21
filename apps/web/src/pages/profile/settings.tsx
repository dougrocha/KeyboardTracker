import { Theme } from "@meka/database"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import React, { MouseEvent, useEffect } from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeading,
  DialogTrigger,
} from "../../components/ModalDialog"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileSection from "../../components/Profile/ProfileSection"
import useAuth from "../../hooks/useAuth"
import ProfileLayout from "../../layouts/ProfileLayout"
import { UseDeleteProfile } from "../../libs/api/GetMe"

const SettingsPage = () => {
  const { theme, setTheme } = useTheme()

  const { user } = useAuth()

  return (
    <ProfileSection flex="col">
      <ProfileHeader title="Settings" />

      <div className="flex items-center">
        <div className="mr-10 flex w-56 flex-col space-y-2">
          <p className="font-bold text-gray-700">Theme</p>
          <p className="text-sm text-gray-500">
            Choose between light and dark mode.
          </p>
        </div>
        <DropdownSelect
          options={[Theme.LIGHT, Theme.DARK, Theme.SYSTEM]}
          defaultValue={user?.theme ?? theme}
          onChange={(e) => {
            setTheme(e.currentTarget.value.toLowerCase())
          }}
        />
        <button
          className="ml-4 rounded bg-gray-600 px-4 py-1.5 text-center text-white"
          onClick={() => {
            setTheme("system")
          }}
        >
          Reset
        </button>
      </div>

      <div className="flex items-center">
        <div className="mr-10 flex w-56 flex-col space-y-2">
          <p className="font-bold text-gray-700">Language</p>
          <p className="text-sm text-gray-500">
            Choose between English and Spanish.
          </p>
        </div>
        <DropdownSelect
          options={["English", "Spanish"]}
          defaultValue={"English"}
        />
      </div>

      <DeleteAccountButton />
    </ProfileSection>
  )
}

const DeleteAccountButton = () => {
  const router = useRouter()

  const [isReallySure, setIsReallySure] = React.useState(false)

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!isReallySure) {
      setIsReallySure(true)
      return
    }
    router.push(`${process.env.NEXT_PUBLIC_WEB_URL}/logout`)
  }

  useEffect(() => {
    if (isReallySure) {
      const timer = setTimeout(() => {
        setIsReallySure(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isReallySure])

  return (
    <Dialog>
      <DialogTrigger className="w-min whitespace-nowrap rounded bg-red-600 px-4 py-1.5 text-center text-white">
        Delete Account
      </DialogTrigger>
      <DialogContent className="m-4 max-w-2xl rounded bg-primary-light px-2 py-12 sm:px-8 lg:w-1/3">
        <DialogHeading className="text-3xl font-semibold">
          {isReallySure
            ? "No Going Back. Are you really sure?"
            : "Are you really sure?"}
        </DialogHeading>
        <DialogDescription className="mt-2 text-lg text-neutral-600">
          This action is irreversible. All your data will be deleted
          permanently.
        </DialogDescription>
        {/* Cancel deletion button */}
        <div className="mt-4 flex items-center justify-between gap-x-2">
          <DialogClose
            onClick={() => setIsReallySure(false)}
            className="rounded bg-gray-600 px-4 py-1.5 text-center text-white"
          >
            Cancel
          </DialogClose>
          {/* Confirm deletion button */}
          <button
            className="rounded bg-red-600 px-4 py-1.5 text-center text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Default Value will default to first item on options if not set.
 */
const DropdownSelect = ({
  options,
  onChange,
  defaultValue = options[0],
}: {
  options: string[]
  defaultValue?: string
  onChange?: (e: MouseEvent<HTMLOptionElement>) => void
}) => {
  return (
    <div className="relative">
      <select className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none">
        {options.map((option, i) => (
          <option key={i} defaultValue={defaultValue} onClick={onChange}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

SettingsPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default SettingsPage
