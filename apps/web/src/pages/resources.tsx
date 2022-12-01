import { InformationCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import React from "react"

import InfoCard from "../components/InfoCard"
import MainViewLayout from "../layouts/MainViewLayout"

const ResourcePageCards = [
  {
    title: "What is a group buy?",
    description: [
      "A group buy is a way for the community to come together and purchase a product in bulk. This allows for the product to be sold at a lower price than if it were sold individually.",
      "Group buys are typically run by a vendor, and the vendor will typically offer a discount to the community for purchasing in bulk.",
    ],
    icon: InformationCircleIcon,
  },
  {
    title: "What is a keyboard kit?",
    description: [
      "A keyboard kit is a collection of parts that can be assembled into a keyboard. The parts are typically PCBs, keycaps, and switches.",
      "Keyboard kits are typically sold as a group buy, and the community will come together to purchase the kit in bulk. This allows for the kit to be sold at a lower price than if it were sold individually.",
    ],
    icon: InformationCircleIcon,
  },
  {
    title: "What is a keyboard?",
    description: [
      "A keyboard is a device that allows you to type on a computer. It typically consists of a set of keys that you press to type letters, numbers, and symbols.",
      "Keyboards are typically split into two categories: mechanical and membrane. Mechanical keyboards are typically more expensive, but they offer a better typing experience.",
    ],
    icon: InformationCircleIcon,
  },
]

const ResourcesPage = () => {
  return (
    <>
      <div className="mx-auto max-w-screen-xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-base font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 sm:text-base lg:text-sm xl:text-base">
            Wip
          </p>
          <h2 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Resources & Guides
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            A collection of resources and guides to help you get started on your
            mechanical keyboard journey.
          </p>
          <p className="mt-1 max-w-2xl text-sm text-indigo-700 dark:text-gray-400 lg:mx-auto">
            Psst! If you have a resource you&apos;d like to share, please submit
            it to the
            <Link
              href={"/resources/update"}
              className="transition-colors hover:rounded hover:bg-indigo-500 hover:text-white"
            >
              {" "}
              resource update form.
            </Link>
          </p>
        </div>
        {/* Cards */}
        <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12 lg:grid lg:grid-cols-3 lg:place-items-center lg:gap-10 lg:space-y-0">
          {ResourcePageCards.map((card) => (
            <InfoCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </>
  )
}

ResourcesPage.getLayout = (page: React.ReactNode) => (
  <MainViewLayout>{page}</MainViewLayout>
)

export default ResourcesPage
