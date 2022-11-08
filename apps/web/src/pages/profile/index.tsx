import Image from "next/image"
import React, { ChangeEvent, useEffect, useState } from "react"
import { FieldValues, useForm, UseFormRegister } from "react-hook-form"
import { IconType } from "react-icons"
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa"
import { GetProfileInformation } from "../../libs/api/GetMe"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileLayout from "../../layouts/ProfileLayout"
import classNames from "../../utils/classNames"
import { useQuery } from "@tanstack/react-query"
import { User } from "../../types/user"
import { GetUserConnections } from "../../libs/api/GetUserConnections"
import ProfileSection from "../../components/Profile/ProfileSection"

const ProfilePage = () => {
  const { data, isLoading } = useQuery(["profile"], GetProfileInformation)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>Not logged in</div>
  }

  return (
    <>
      <ProfileHeader
        title={
          <>
            <b>Welcome Back! </b>{" "}
            <span className="capitalize">{data.name ?? data.username}</span>
          </>
        }
      />
      <UserSection data={data} />
      <ConnectionsSection />
    </>
  )
}

const UserSection = ({ data }: { data: User }) => {
  const { register } = useForm()

  const [showPassword, setShowPassword] = useState(false)

  return (
    <ProfileSection>
      <InfoField title="Display Name" value={data.username} />
      <InfoField title="Name" value={data.name ?? "N/A"} />
      <InfoField title="Email" value={data.email} />
      <InfoField
        title="Password"
        value={
          data.password
            ? showPassword
              ? data.password
              : "*************"
            : "N/A"
        }
      />

      <ImageField register={register} src={data.avatar} />
    </ProfileSection>
  )
}

const ConnectionsSection = () => {
  const { data, isLoading } = useQuery(["connections"], GetUserConnections)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ProfileSection flex="row" className="mt-10">
      <SocialConnector
        name="Github"
        icon={FaGithub}
        connected={data["github"]}
      />
      <SocialConnector
        name="Discord"
        icon={FaDiscord}
        connected={data["discord"]}
      />
      <SocialConnector
        name="Google"
        icon={FaGoogle}
        connected={data["google"]}
      />
    </ProfileSection>
  )
}

interface SocialConnectorProps {
  name: string
  icon: IconType
  connected?: boolean
}

const SocialConnector = ({
  icon,
  name,
  connected = false,
}: SocialConnectorProps) => {
  let Icon = icon

  return (
    <div className="relative">
      <div className="group flex flex-col items-center justify-center space-y-2 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:cursor-pointer">
        <span className="sr-only">{name}</span>
        <Icon className="h-8 w-8" />
        <div
          className={classNames(
            connected && "bg-blue-500",
            !connected && "bg-gray-400",
            "rounded px-2 py-1 text-white"
          )}
        >
          {connected ? "Connected" : "Connect"}
        </div>
      </div>
    </div>
  )
}

const InfoField = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <p className="text-sm">{title}</p>
        <p className="font-medium">{value}</p>
      </div>
      <button className="rounded bg-gray-600 px-4 py-1.5 text-center text-white">
        Edit
      </button>
    </div>
  )
}

const ImageField = ({
  src,
  alt,
  size = "lg",
  register,
}: {
  src?: string
  alt?: string
  size?: "sm" | "lg"
  register: UseFormRegister<FieldValues>
}) => {
  const [previewImage, setPreviewImage] = useState<string>(src ?? "/hero.jpg")

  return (
    <div>
      <h3 className="mt-10 text-xl font-medium">Avatar</h3>

      <form className="mt-5 flex items-start">
        <div className="flex cursor-pointer flex-col items-center">
          <div className="relative h-32 w-32 select-none rounded-full">
            <Image
              src={previewImage}
              alt={alt ?? "Profile Picture"}
              fill
              sizes="128px"
              className="rounded-full object-cover object-center"
            />
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
