import {
  offset,
  useInteractions,
  useRole,
  useFloating,
  useDismiss,
  useListNavigation,
} from "@floating-ui/react-dom-interactions"
import { User } from "@meka/database"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"

import { GetUserAvatar } from "../../libs/api/Images"
import { capitalizeFirstLetter } from "../../utils/string"

const MenuList = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Favorites",
    href: "/profile/favorites",
  },
  {
    name: "Logout",
    href: "/logout",
  },
]
interface AvatarProps {
  user: User
}

const Avatar = ({ user }: AvatarProps) => {
  const [isOpen, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const router = useRouter()

  const listItemsRef = useRef<HTMLLIElement[]>([])

  const { x, y, floating, reference, context, strategy } = useFloating({
    onOpenChange: setOpen,
    open: isOpen,
    placement: "bottom",
    strategy: "absolute",
    middleware: [offset(6)],
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useRole(context, { role: "menu" }),
      useDismiss(context, { escapeKey: true, outsidePress: true }),
      useListNavigation(context, {
        activeIndex,
        listRef: listItemsRef,
        onNavigate: setActiveIndex,
      }),
    ]
  )

  return (
    <button
      className="relative flex h-10 w-10 select-none items-center justify-center rounded-full bg-blue-900"
      {...getReferenceProps({
        ref: reference,
        "aria-haspopup": true,
        "aria-expanded": isOpen,
        "aria-controls": "menu",
        onClick: () => (user ? setOpen((prev) => !prev) : undefined),
      })}
    >
      {user.avatar ? (
        <Image
          src={GetUserAvatar(user.id, user.avatar)}
          alt={`${user.username} profile image`}
          className="rounded-full object-cover object-center"
          sizes="40px"
          width={40}
          height={40}
          loading="eager"
          blurDataURL="/images/keyboard_cable.jpg"
          placeholder="blur"
        />
      ) : (
        <span className="text-lg font-medium text-gray-200">
          {capitalizeFirstLetter(user.name ?? user.username ?? "").slice(0, 2)}
        </span>
      )}
      {isOpen ? (
        <ul
          className="z-50 flex w-52 flex-col space-y-1 rounded-md bg-white p-2 text-black shadow-md dark:bg-gray-800 dark:text-white"
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            },
            role: "menu",
            "aria-labelledby": "menu",
            "aria-orientation": "vertical",
          })}
        >
          {MenuList.map((item, index) => (
            <li
              key={item.name}
              ref={(node) => {
                if (!node) return
                listItemsRef.current[index] = node
              }}
              {...getItemProps({
                tabIndex: -1,
                role: "menuitem",
                onKeyDown(event) {
                  if (event.key === "Enter") {
                    router.push(item.href)
                  }
                  if (event.key === "Tab") {
                    setOpen(false)
                  }
                },
                "aria-label": item.name,
                "aria-controls": item.name,
              })}
              className="box-border h-10 rounded border-2 border-transparent px-4 text-center hover:bg-indigo-100 focus:border-2 focus:border-indigo-700 dark:hover:bg-indigo-700/50"
            >
              <Link
                href={item.href}
                className="flex h-full items-center justify-start"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </button>
  )
}

export default Avatar
