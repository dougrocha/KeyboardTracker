import {
  BriefcaseIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/20/solid"
import { yupResolver } from "@hookform/resolvers/yup"
import { RegisterFormData } from "@meka/database"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ReactElement, useId, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import useAuth from "../hooks/useAuth"
import MainViewLayout from "../layouts/MainViewLayout"
import { useLocalRegister } from "../libs/api/Auth"
import schema from "../utils/schemas/registerForm"

const RegisterPage = () => {
  const { push } = useRouter()
  const { user, isLoading } = useAuth()

  const [isPressed, setIsPressed] = useState<string>("")

  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  })
  const { handleSubmit } = methods

  const { mutate: login, isLoading: isLoggingIn } = useLocalRegister()

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    login(data, { onSuccess: () => push("/") })
  }

  if (isLoading) return <div>Loading...</div>

  // if (user) {
  //   push("/profile")
  //   return <div>Redirecting...</div>
  // }

  return (
    <>
      <section className="text-center md:m-0 md:flex md:h-full md:w-1/2 md:flex-col md:items-center md:justify-center md:text-start">
        <h1 className="text-4xl font-semibold">Sign up to Key Keeper</h1>
        <p className="mt-6">
          The best place to find and start your newest Group Buy.
        </p>

        <div className="mt-12 space-y-4">
          <RegisterButton
            label="I want more keyboards."
            description="Gotta feed the addiction."
            icon={<ArrowTrendingUpIcon className="mr-6 h-8 w-8 text-black" />}
            isPressed={isPressed}
            setPressed={setIsPressed}
          />
          <RegisterButton
            label="I want to share my creations."
            description="Let's contribute together."
            icon={<BriefcaseIcon className="mr-6 h-8 w-8 text-black" />}
            isPressed={isPressed}
            setPressed={setIsPressed}
          />
        </div>

        <p className="mt-6 flex w-full justify-center break-normal text-sm">
          Already have an account?&nbsp;
          <Link href="/login">
            <p className="cursor-pointer font-medium hover:font-medium hover:underline">
              Sign in
            </p>
          </Link>
        </p>
      </section>

      {isPressed ? (
        <p>REGISTER</p>
      ) : (
        <section className="flex flex-col items-center justify-center gap-y-2 md:w-1/2">
          <h1>STAY UP TO DATE ON THE LATEST GROUP BUYS</h1>
        </section>
      )}
    </>
  )
}

interface RegisterButtonProps {
  label: string
  icon: ReactElement
  description: string
  isPressed?: string
  setPressed?: React.Dispatch<React.SetStateAction<string>>
}

const RegisterButton = ({
  label,
  icon,
  description,
  isPressed,
  setPressed,
}: RegisterButtonProps) => {
  return (
    <button
      className={classNames(
        isPressed === label ? "bg-gray-200" : "bg-white",
        "group flex h-20 w-full items-center justify-between rounded-md border border-black py-2 px-4 aria-pressed:bg-gray-200"
      )}
      onClick={() => {
        if (!setPressed) return
        isPressed === label ? setPressed("") : setPressed(label)
      }}
      aria-pressed={isPressed === label}
    >
      {icon}
      <div className="flex w-full flex-col items-start justify-center space-y-1">
        <p className="font-medium">{label}</p>
        <span className="text-sm">{description}</span>
      </div>
      <div className="flex h-full flex-col justify-start pl-8">
        {isPressed === label ? (
          <CheckCircleIcon className="h-5 w-5 text-black" />
        ) : (
          <MinusCircleIcon className="h-5 w-5 fill-transparent stroke-black text-black" />
        )}
      </div>
    </button>
  )
}

RegisterPage.getLayout = (page: ReactElement) => (
  <MainViewLayout
    hideFooter
    className="my-40 flex h-full flex-col items-center justify-center divide-slate-700 md:flex-row md:justify-start md:space-y-0 md:divide-x-[1px] lg:justify-between lg:space-y-5"
  >
    {page}
  </MainViewLayout>
)

export default RegisterPage
