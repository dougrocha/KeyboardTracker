import Link from "next/link"
import MainViewLayout from "./MainViewLayout"

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainViewLayout footer={false} className="flex flex-row pb-10">
      <ProfileSidebar />
      <section className="min-h-full w-full bg-zinc-700 px-2 py-10">
        {children}
      </section>
    </MainViewLayout>
  )
}

const ProfileSidebar = () => {
  return (
    <>
      <section className="sticky top-10 flex h-[calc(100vh_-_100px)] w-80 flex-col justify-between px-4 transition-colors">
        <ul className="flex flex-col">
          {SidebarTags.map((tag) => (
            <li
              key={tag.name}
              className="relative flex h-12 w-full flex-row items-center justify-start px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Link
                href={tag.href}
                className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0"
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col">
          {SidebarFooterTags.map((tag) => (
            <li
              key={tag.name}
              className="relative flex h-12 w-full flex-row items-center justify-start px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <Link
                href={tag.href}
                className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0"
              >
                {tag.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

const SidebarTags = [
  {
    name: "My Profile",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile`,
  },
  {
    name: "Join Designer",
    active: "My Designs",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/designer`,
  },
  {
    name: "Create Vendor",
    active: "My Products",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/vendor`,
  },
  {
    name: "Favorites",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/favorites`,
  },
  {
    name: "Settings",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/profile/settings`,
  },
]

const SidebarFooterTags = [
  {
    name: "Help",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/resources`,
  },
  {
    name: "Data & Privacy",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/privacy`,
  },
  {
    name: "Terms of Service",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/terms`,
  },
  {
    name: "Log Out",
    href: `${process.env.NEXT_PUBLIC_WEB_URL}/logout`,
  },
]

export default ProfileLayout
