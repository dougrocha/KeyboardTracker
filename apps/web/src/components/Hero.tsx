import Image from "next/image"
import React from "react"
import SearchBox from "./SearchBox"

const Hero = () => {
  return (
    <div className="relative flex h-80 justify-between">
      <div className="flex flex-col justify-center sm:w-full md:w-80 lg:w-full">
        <h1 className="text-6xl font-semibold">Find your style</h1>
        <p className="mb-5 mt-2 text-lg">
          Introducing the best way to track up and coming group buys.
        </p>
        <SearchBox className="w-80" placeholder="Search..." />
      </div>

      <div className="absolute -right-36 top-1/2 hidden -translate-y-1/2 overflow-hidden rounded-lg md:block">
        <Image
          src={"/hero.jpg"}
          alt={"Keyboard Picture"}
          width={512}
          height={512}
          sizes="100vw"
          className="h-full object-cover object-center"
        />
      </div>
    </div>
  )
}

export default Hero
