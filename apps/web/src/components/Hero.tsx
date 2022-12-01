import {
  InformationCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import Image from "next/image"
import React from "react"

import InfoCard from "./InfoCard"

const Hero = () => {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:text-center">
        <p className="text-base font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 sm:text-base lg:text-sm xl:text-base">
          New
        </p>
        <h2 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          A better way to build.
        </h2>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
          Welcome to Meka, the best place to stay up to date on the latest group
          buys and interest checks.
        </p>
      </div>

      <div className="my-10 flex flex-wrap sm:mt-12 lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
        <InfoCard
          title="What is Meka?"
          description={[
            "Meka is a group buy platform for mechanical keyboards. We provide a platform for the community to organize group buys and for users to find the best deals on their favorite keyboards.",
          ]}
          icon={InformationCircleIcon}
        />

        <div
          className="relative my-10 h-36 w-full px-10 shadow-lg sm:my-12 sm:px-10 lg:my-0 lg:h-72"
          aria-hidden="true"
        >
          <Image
            src="/images/far-shot-down.jpg"
            alt="Keyboard on top of desk. Keyboard is a 60% keyboard with a light gray case and gray/orange keycaps."
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="rounded-xl object-cover lg:object-center"
            draggable={false}
          />
        </div>

        <InfoCard
          title="What is a group buy?"
          description={[
            "A group buy is a way for the community to organize and purchase a product in bulk. This allows for the product to be sold at a lower price than retail.",
          ]}
          icon={UserGroupIcon}
        />
      </div>
    </div>
  )
}

export default Hero
