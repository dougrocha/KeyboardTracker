import Link from "next/link"
import React, { ChangeEvent, ReactElement, useState } from "react"
import { useForm } from "react-hook-form"

import { FaDiscord, FaGoogle } from "react-icons/fa"
import MainViewLayout from "../layouts/MainViewLayout"
import schema from "../utils/schemas/loginForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginFormData } from "../types/user"
import useAuth from "../hooks/useAuth"
import { useRouter } from "next/router"

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
  const { data, isLoading } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  })

  const onShowPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setShowPassword(e.target.checked)
  }

  const onSubmit = handleSubmit((data) => {
    console.log("success", data)
    // localLogin(data.email, data.password)
  })

  if (isLoading) return <div>Loading...</div>

  if (data?.user) {
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
        <form className="w-80 space-y-6 lg:w-96" onSubmit={onSubmit}>
          <div className="flex flex-col space-y-1 dark:text-white">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <input
              className="w-full rounded bg-[#dcdcdc] px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@mail.com"
              type={"email"}
              {...register("email")}
            />
            {errors.email ? (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              className="w-full rounded bg-[#dcdcdc] px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            {errors.password ? (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            ) : null}
            <span className="flex w-full items-center">
              <input
                id={"showPassword"}
                type={"checkbox"}
                onChange={onShowPassword}
                checked={showPassword}
              />
              <label htmlFor="showPassword" className="ml-2 select-none">
                Show Password
              </label>
            </span>
          </div>

          <button
            className="h-20 w-full rounded-md bg-blue-600 px-4 text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </section>
    </>
  )
}

LoginPage.getLayout = (page: ReactElement) => (
  <MainViewLayout
    footer={false}
    className="flex h-full flex-col items-center justify-center divide-slate-700 md:flex-row md:justify-start md:space-y-0 md:divide-x-[1px] lg:justify-between lg:space-y-5"
  >
    {page}
  </MainViewLayout>
)

export default LoginPage
