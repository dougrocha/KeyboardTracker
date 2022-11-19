import { useTheme } from "next-themes"
import React, { MouseEvent } from "react"

import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileSection from "../../components/Profile/ProfileSection"
import useAuth from "../../hooks/useAuth"
import ProfileLayout from "../../layouts/ProfileLayout"
import { UserTheme } from "../../types/user"

const SettingsPage = () => {
  const { theme, setTheme } = useTheme()

  const { user } = useAuth()

  return (
    <ProfileSection>
      <ProfileHeader title="Settings" />

      <div className="flex flex-col space-y-5">
        <div className="flex items-center">
          <div className="mr-10 flex w-56 flex-col space-y-2">
            <p className="font-bold text-gray-700">Theme</p>
            <p className="text-sm text-gray-500">
              Choose between light and dark mode.
            </p>
          </div>
          <DropdownSelect
            options={[UserTheme.LIGHT, UserTheme.DARK, UserTheme.SYSTEM]}
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
      </div>
    </ProfileSection>
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
