import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/outline"
import Image from "next/future/image"
import React from "react"
import MainViewLayout from "../../layouts/MainViewLayout"
import AxiosClient from "../../libs/AxiosClient"

interface ItemPageProps {
  item: {
    id: string
    name: string
    groupBuyStartDate?: string
    groupBuyEndDate?: string
    status?: string
    brand?: string
    type?: string
    createdAt: string
    material?: string
  }
}

const ItemPage = ({ item }: ItemPageProps) => {
  console.log({ item })

  return (
    <MainViewLayout>
      <div className="mb-20 flex items-center gap-x-10">
        <h1 className="text-4xl font-semibold">{item.name}</h1>
        <div className="rounded bg-yellow-600 px-2 py-1 text-sm uppercase">
          {item.status}
        </div>
        <SolidHeartIcon className="icon ml-auto text-red-600" />
      </div>
      <section className="flex justify-between gap-x-40">
        <div className="relative h-96 w-1/2">
          <Image
            src="/hero.jpg"
            alt={`${item.name}`}
            fill
            sizes="100vw"
            className="absolute rounded-lg object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="flex gap-x-40 pt-5">
            <ul className="flex flex-col justify-between gap-y-5">
              <li>
                <p className="font-semibold">Start Date</p>
                {item.groupBuyStartDate
                  ? new Date(item.groupBuyStartDate).toLocaleDateString()
                  : null}
              </li>
              <li>
                <p className="font-semibold">Brand</p>
                {item.brand}
              </li>
              <li>
                <p className="font-semibold">Status</p>
                {item.status}
              </li>
            </ul>
            <ul className="flex flex-col justify-between gap-y-5">
              <li>
                <p className="font-semibold">End Date</p>
                {item.groupBuyEndDate
                  ? new Date(item.groupBuyEndDate).toLocaleDateString()
                  : null}
              </li>
              <li>
                <p className="font-semibold">Profile</p>
                {/* Profile doesnt exist yet */}
                Cherry
              </li>
              <li>
                <p className="font-semibold">Material</p>
                {item.material}
              </li>
            </ul>
          </div>
          <button className="rounded bg-blue-700 px-4 py-2 text-white">
            Interest Check
          </button>
        </div>
      </section>
      <div className="mt-24">
        <h3 className="text-3xl font-semibold">Vendors</h3>
        <div className="mt-10 flex gap-x-4">
          <div className="w-full rounded bg-gray-400 px-2 py-4 text-center text-white">
            CannonKeys
          </div>
          <div className="w-full rounded bg-gray-400 px-2 py-4 text-center text-white">
            KBDFans
          </div>
          <div className="w-full rounded bg-gray-400 px-2 py-4 text-center text-white">
            SwagKeys
          </div>
          <div className="w-full rounded bg-gray-400 px-2 py-4 text-center text-white">
            MyKeyboard
          </div>
          <div className="w-full rounded bg-gray-400 px-2 py-4 text-center text-white">
            FancyCustoms
          </div>
        </div>
      </div>
      <div className="mt-24 mb-20">
        <h3 className="text-3xl font-semibold">Kits</h3>
        <div className="mt-10 grid grid-cols-3 gap-x-4">
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt={`${item.name}`}
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
        </div>
      </div>
    </MainViewLayout>
  )
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const res = await AxiosClient.get(`/keycaps/${params.id}`)
  const data = res.data

  return {
    props: {
      item: data,
    },
  }
}

export const getStaticPaths = async () => {
  const res = await AxiosClient.get<{ id: string }[]>("items?id=true")

  const paths = res.data.map(({ id }) => ({
    params: { id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default ItemPage
