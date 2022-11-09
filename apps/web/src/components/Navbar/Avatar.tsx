import {
  offset,
  useInteractions,
  useRole,
  useFloating,
  useDismiss,
  useListNavigation,
} from "@floating-ui/react-dom-interactions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useRef, useState } from "react"

import { User } from "../../types/user"
import { capitalizeFirstLetter } from "../../utils/string"

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
      onClick={user ? () => setOpen((prev) => !prev) : undefined}
      {...getReferenceProps({
        ref: reference,
        role: "menu",
        "aria-haspopup": true,
        "aria-expanded": isOpen,
      })}
    >
      {user.avatar ? (
        <Image
          src={`http://localhost:3001/users/avatars/${user.id}/${user.avatar}`}
          alt="user profile image"
          fill
          className="rounded-full"
        />
      ) : (
        <span className="text-lg font-medium text-gray-200">
          {capitalizeFirstLetter(user.name ?? user.username ?? "").slice(0, 2)}
        </span>
      )}
      {isOpen ? (
        <ul
          className="z-50 flex flex-col bg-blue-500"
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
            },
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
              className="h-10 bg-gray-200 px-4 text-center text-black shadow focus-within:bg-gray-400 hover:border-none focus:border focus:border-blue-700"
            >
              <Link
                href={item.href}
                className="flex h-full items-center justify-center"
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

const MenuList = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Favorites",
    href: "/favorites",
  },
  {
    name: "Logout",
    href: "/logout",
  },
]

export default Avatar
