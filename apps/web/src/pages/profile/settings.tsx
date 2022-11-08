import { useTheme } from "next-themes"
import React, { MouseEvent } from "react"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileSection from "../../components/Profile/ProfileSection"
import ProfileLayout from "../../layouts/ProfileLayout"

const SettingsPage = () => {
  const { theme, setTheme } = useTheme()

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
            options={["Light", "Dark"]}
            value={theme}
            onChange={(e) => {
              setTheme(e.currentTarget.value.toLowerCase())
            }}
          />

          <button
            className="rounded bg-gray-600 px-4 py-1.5 text-center text-white"
            onClick={() => {
              // TODO: If darkmode is good reset to light
              setTheme("light")
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
          <DropdownSelect options={["English", "Spanish"]} value={"English"} />
        </div>
      </div>
    </ProfileSection>
  )
}

const DropdownSelect = ({
  value,
  options,
  onChange,
}: {
  options: string[]
  value?: string
  onChange?: (e: MouseEvent<HTMLOptionElement>) => void
}) => {
  return (
    <div className="relative">
      <select className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none">
        {options.map((option) => (
          <option defaultValue={value} onClick={onChange}>
            {option}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 7l3-3 3 3v2H7V7zm0 6h6v2H7v-2z" />
        </svg>
      </div>
    </div>
  )
}

SettingsPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default SettingsPage
