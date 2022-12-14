import classNames from "classnames"
import React from "react"

const ProfileSection = ({
  flex,
  className,
  children,
}: {
  flex?: "row" | "col"
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={classNames(
        flex === "row" && "flex flex-row justify-around",
        flex === "col" && "flex flex-col space-y-5",
        `w-full rounded bg-gray-200 p-10`,
        className
      )}
    >
      {children}
    </div>
  )
}

export default ProfileSection
