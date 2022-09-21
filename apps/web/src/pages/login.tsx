import Link from 'next/link'
import React from 'react'

import { FaDiscord, FaGithub } from 'react-icons/fa'
import Footer from '../components/Footer'

// Icon must always be capitalized
const LoginSources = [
  {
    name: 'Github',
    href: `${process.env.NEXT_PUBLIC_API_URL}/auth/github/login`,
    Icon: FaGithub,
  },
  {
    name: 'Discord',
    href: `${process.env.NEXT_PUBLIC_API_URL}/auth/discord/login`,
    Icon: FaDiscord,
  },
]

const LoginPage = () => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-7xl flex-col items-center px-6 md:flex-row">
      <section className="my-20 flex flex-col items-center justify-center font-rubik text-xl font-medium md:m-0 md:h-full md:w-1/2">
        <p>STAY UP TO DATE ON THE LATEST GROUP BUYS</p>
      </section>
      <div className="mx-4 hidden h-80 w-[1px] border-l border-solid border-x-slate-700 md:block" />

      <section className="flex flex-col items-center justify-center space-y-6 md:h-full md:w-1/2 ">
        {LoginSources.map(({ name, href, Icon }) => (
          <Link key={`login-source-${name}`} href={href}>
            <a className="flex w-56 min-w-min flex-grow-0 items-center justify-center space-x-4 rounded bg-blue-600 px-4 py-2 md:w-96">
              {/* Icon from LoginSources */}
              <Icon className="h-8 w-8" />
              <p className="flex font-poppins text-lg">
                <span className="hidden md:block">Continue with &nbsp;</span>
                {name}
              </p>
            </a>
          </Link>
        ))}
      </section>
    </div>
  )
}

export default LoginPage
