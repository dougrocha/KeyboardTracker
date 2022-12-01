import Link from "next/link"
import React from "react"

const Column1 = [
  {
    name: "Search",
    href: "catalog",
  },
  {
    name: "Vendors",
    href: "vendors",
  },
  {
    name: "Keyboards",
    href: "keyboards",
  },
  {
    name: "Keycaps",
    href: "keycaps",
  },
]
const Column2 = [
  {
    name: "Resources",
    href: "resources",
  },
  {
    name: "Contact Us",
    href: "contact",
  },
  {
    name: "Terms of Service",
    href: "terms",
  },
  {
    name: "Privacy Policy",
    href: "privacy",
  },
]

const Footer = () => {
  return (
    <footer className="mt-10 bg-[#0F172A] md:h-60">
      <div className="container mx-auto flex flex-col justify-between px-2 pt-10 pb-4 sm:px-6 md:flex-row-reverse md:py-10">
        <div className="flex flex-col gap-y-6 text-sm font-semibold  md:flex-row md:gap-y-0 md:gap-x-10">
          {[Column1, Column2].map((column, i) => (
            <div className="flex h-full flex-col gap-y-6" key={i}>
              {column.map((link) => FooterLink(link))}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col justify-between md:mt-0">
          <span className="text-4xl font-bold text-white ">MEKA</span>
          <span>
            <p className="mt-4 text-sm font-medium text-gray-400">
              &copy; {new Date().getFullYear()} Modified by Meka Group Buys. All
              rights reserved.
            </p>
          </span>
        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ name, href }: { name: string; href: string }) => (
  <Link
    href={href}
    key={name}
    className="max-w-fit text-gray-300 transition-colors hover:text-gray-400"
  >
    {name}
  </Link>
)

export default Footer
