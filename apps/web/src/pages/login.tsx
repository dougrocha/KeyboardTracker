import Link from "next/link"
import React, { ChangeEvent, useState } from "react"
import { useForm, UseFormHandleSubmit } from "react-hook-form"

import { FaDiscord, FaGoogle } from "react-icons/fa"
import MainViewLayout from "../layouts/MainViewLayout"
import schema from "../utils/schemas/loginForm"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginFormData } from "../types/user"

// Icon must always be capitalized
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
  })

  return (
    <MainViewLayout
      footer={false}
      className="mt-20 h-full flex-col items-center justify-start space-y-5 md:flex-row md:justify-between md:space-y-0"
    >
      <section className="text-center text-xl font-bold md:m-0 md:flex md:h-full md:w-1/2 md:flex-col md:items-center md:justify-center md:text-start">
        <h1>STAY UP TO DATE ON THE LATEST GROUP BUYS</h1>
      </section>

      <div className="mx-4 hidden h-80 w-[1px] border-l border-solid border-x-slate-700 md:block" />

      <section className="flex flex-col items-center justify-center space-y-2 md:h-full md:w-1/2">
        <h2 className="hidden text-3xl font-medium md:mb-10 md:block">Login</h2>

        <ul className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          {LoginSources.map(({ name, href, Icon }) => (
            <li
              key={`login-source-${name}`}
              className="w-full rounded bg-blue-600 px-4 py-2 text-white"
            >
              <Link
                href={href}
                className="flex flex-grow-0 items-center justify-center "
              >
                {/* Icon from LoginSources */}
                <Icon className="h-6 w-6 md:mr-4" />
                <p className="hidden whitespace-nowrap md:flex md:items-center md:text-lg">
                  <span className="hidden md:block">Continue with&nbsp;</span>
                  {name}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-sm">Or use your email to login:</p>
        <form
          className="flex flex-col items-center space-y-6"
          onSubmit={onSubmit}
        >
          <div className="flex w-full flex-col space-y-1 dark:text-white">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>

            <input
              className="w-full rounded bg-[#dcdcdc] px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@mail.com"
              type={"email"}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              className="w-full rounded bg-[#dcdcdc] px-4 py-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
            <div className="flex w-full items-center">
              <input
                id={"showPassword"}
                type={"checkbox"}
                onChange={onShowPassword}
                checked={showPassword}
              />
              <label htmlFor="showPassword" className="ml-2 select-none">
                Show Password
              </label>
            </div>
          </div>

          <button
            className="h-12 w-80 rounded-md bg-blue-600 px-4 text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </section>
    </MainViewLayout>
  )
}

export default LoginPage
