import { yupResolver } from "@hookform/resolvers/yup"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ReactElement } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FaDiscord, FaGoogle } from "react-icons/fa"

import Input from "../components/Forms/Input"
import HiddenInput from "../components/Forms/PasswordInput"
import useAuth from "../hooks/useAuth"
import MainViewLayout from "../layouts/MainViewLayout"
import { UseLocalLogin } from "../libs/api/Auth"
import { LoginFormData, User } from "../types/user"
import schema from "../utils/schemas/loginForm"

const LoginSources = [
  // {
  //   name: "Github",
  //   href: `${process.env.NEXT_PUBLIC_API_URL}/auth/github/login`,
  //   Icon: FaGithub,
  // },
  {
    name: "Discord",
    href: `${process.env.NEXT_PUBLIC_API_URL}/auth/discord/login`,
    Icon: FaDiscord,
  },
  {
    name: "Google",
    href: `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`,
    Icon: FaGoogle,
  },
]

const LoginPage = () => {
  const { push } = useRouter()
  const { user, isLoading } = useAuth()

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  })
  const { handleSubmit } = methods

  const { mutate: login, isLoading: isLoggingIn } = UseLocalLogin()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    login(data, { onSuccess: () => push("/") })
  }

  if (isLoading) return <div>Loading...</div>

  if (user) {
    push("/profile")
    return <div>Redirecting...</div>
  }

  return (
    <>
      <section className="text-center text-xl font-bold md:m-0 md:flex md:h-full md:w-1/2 md:flex-col md:items-center md:justify-center md:text-start">
        <h1>STAY UP TO DATE ON THE LATEST GROUP BUYS</h1>
      </section>

      <section className="flex flex-col items-center justify-center gap-y-2 md:w-1/2">
        <h2 className="hidden text-4xl font-medium md:block">Login</h2>

        <ul className="my-5 flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
          {LoginSources.map(({ name, href, Icon }) => (
            <li
              key={`login-source-${name}`}
              className="w-full rounded bg-blue-600  text-white"
            >
              <Link
                href={href}
                className="flex flex-grow-0 items-center justify-center px-4 py-2 "
              >
                {/* Icon from LoginSources */}
                <Icon className="h-6 w-6 lg:mr-4" />
                <p className="hidden whitespace-nowrap lg:flex lg:items-center lg:text-lg">
                  <span className="hidden lg:block">Continue with&nbsp;</span>
                  {name}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm">Or use your email to login:</p>
        <FormProvider {...methods}>
          <form
            className="w-80 space-y-6 lg:w-96"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input id="email" label="Email" placeholder="jsmith3@mail.com" />
            <HiddenInput id="password" label="Password" />

            <button
              className={classNames(
                "h-20 w-full rounded-md bg-blue-600 px-4 text-white",
                isLoggingIn && "cursor-not-allowed opacity-50"
              )}
              type="submit"
            >
              Login
            </button>
          </form>
        </FormProvider>
      </section>
    </>
  )
}

LoginPage.getLayout = (page: ReactElement) => (
  <MainViewLayout
    hideFooter
    className="flex h-full flex-col items-center justify-center divide-slate-700 md:flex-row md:justify-start md:space-y-0 md:divide-x-[1px] lg:justify-between lg:space-y-5"
  >
    {page}
  </MainViewLayout>
)

export default LoginPage
