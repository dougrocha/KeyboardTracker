import React, { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"

import Input from "../../../../components/Forms/Input"
import ProfileSection from "../../../../components/Profile/ProfileSection"
import VendorLayout from "../../../../layouts/VendorLayout"
import { Vendor } from "../../../../types/vendor"

const VendorSettingsPage = ({ vendor }: { vendor: Vendor }) => {
  return (
    <div>
      <VendorSpecificPage vendor={vendor} />
    </div>
  )
}

const VendorSpecificPage = ({ vendor }: { vendor: Vendor }) => {
  const methods = useForm()
  const { handleSubmit, reset } = methods

  useEffect(() => {
    // On mount, reset the form with the initial data
    reset(vendor)
  }, [vendor, reset])

  const [readOnly, setReadOnly] = useState(true)

  const onSubmit = handleSubmit((e) => {
    console.log(e)
  })

  return (
    <ProfileSection>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="mt-8 max-w-sm space-y-4">
          <Input
            id="name"
            label="Name"
            readOnly={readOnly}
            placeholder={vendor?.name}
          />
          <Input
            id="country"
            label="Origin Country"
            readOnly={readOnly}
            placeholder={vendor?.country}
          />
          <Input
            id="url"
            label="Website Url"
            readOnly={readOnly}
            placeholder={vendor?.url}
          />

          <div className="flex flex-col space-y-2 text-white sm:flex-row sm:justify-between sm:space-y-0">
            <button
              className="w-32 rounded bg-gray-600 px-4 py-2 text-center text-white"
              onClick={() => {
                setReadOnly(!readOnly)
                if (!readOnly) reset(vendor)
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

VendorSettingsPage.getLayout = (page: React.ReactNode) => (
  <VendorLayout>{page}</VendorLayout>
)

export default VendorSettingsPage
