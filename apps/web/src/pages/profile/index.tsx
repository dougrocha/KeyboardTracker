import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import React, { ChangeEvent, useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"

import Input from "../../components/Forms/Input"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileSection from "../../components/Profile/ProfileSection"
import ConnectionsSection from "../../components/Socials/ConnectionSection"
import useAuth from "../../hooks/useAuth"
import ProfileLayout from "../../layouts/ProfileLayout"
import { UseUpdateUser } from "../../libs/api/GetMe"
import { GetUserAvatar } from "../../libs/api/Images"
import { User } from "../../types/user"

const ProfilePage = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Not logged in</div>
  }

  return (
    <>
      <ProfileHeader
        title={
          <>
            <b>Welcome Back! </b>{" "}
            <span className="capitalize">{user.name ?? user.username}</span>
          </>
        }
      />
      <UserSection user={user} />
      <ConnectionsSection />
    </>
  )
}

const UserSection = ({ user }: { user: User }) => {
  const methods = useForm({
    defaultValues: user,
  })

  const { handleSubmit, reset } = methods

  const [readOnly, setReadOnly] = useState(true)

  const { mutate: updateUser } = UseUpdateUser()

  const queryClient = useQueryClient()

  const onSubmit = handleSubmit(
    (data) => {
      updateUser(data, {
        onSuccess: () => {
          queryClient.invalidateQueries(["user"])
          setReadOnly(true)
        },
      })
    },
    (errors, e) => {
      console.log(errors, e)
    }
  )

  return (
    <ProfileSection>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="mt-8 max-w-sm space-y-4">
          <Input id="username" label="Display Name" readOnly={readOnly} />
          <Input id="name" label="Name" readOnly={readOnly} />
          <Input id="email" label="Email" readOnly={readOnly} />

          <div className="flex flex-col space-y-2 text-white sm:flex-row sm:justify-between sm:space-y-0">
            <button
              className="w-32 rounded bg-gray-600 px-4 py-2 text-center text-white"
              onClick={() => {
                setReadOnly(!readOnly)
                if (!readOnly) reset(user)
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

        <ImageField src={GetUserAvatar(user.id, user.avatar)} />
      </FormProvider>
    </ProfileSection>
  )
}

const ImageField = ({
  src,
  alt,
  size = "lg",
}: {
  src?: string
  alt?: string
  size?: "sm" | "lg"
}) => {
  const { register } = useFormContext()

  const [previewImage, setPreviewImage] = useState<string | null>(src ?? null)

  return (
    <div>
      <h3 className="mt-10 text-xl font-medium">Avatar</h3>

      <form className="mt-5 flex items-start">
        <div className="flex cursor-pointer flex-col items-center">
          <div className="relative h-32 w-32 select-none rounded-full">
            {previewImage ? (
              <Image
                src={previewImage}
                alt={alt ?? "Profile Picture"}
                fill
                sizes="128px"
                className="rounded-full object-cover object-center"
              />
            ) : (
              <div className="h-32 w-32 rounded-full bg-gray-400" />
            )}
          </div>
        </div>

        {size === "lg" ? (
          <div className="ml-4 justify-between px-1.5">
            <p className="w-60 text-sm">
              We recommend using an image that is at least 48x48 in size.
            </p>

            <label
              htmlFor="avatar-upload"
              className="mt-5 inline-block w-full cursor-pointer border border-gray-800 bg-gray-300 px-2 py-2.5 text-center text-gray-900"
            >
              Upload Avatar
            </label>
            <input
              id="avatar-upload"
              className="hidden"
              type="file"
              accept="image/*"
              {...register("avatar", {
                validate: (file: FileList) => {
                  if (!file) return true
                  if (file.length != 1) return "Please upload an image"
                  if (file[0].size > 1000000) return "File too large"
                  return true
                },
              })}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e?.target?.files?.[0]) {
                  const file = e.target.files[0]
                  const reader = new FileReader()
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
          </div>
        ) : null}
      </form>
    </div>
  )
}

ProfilePage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout seo={{ title: "Profile", noindex: true }}>
    {page}
  </ProfileLayout>
)

export default ProfilePage
