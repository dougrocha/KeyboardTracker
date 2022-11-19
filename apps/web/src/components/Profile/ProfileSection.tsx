import classNames from "classnames"
import React from "react"

const ProfileSection = ({
  flex = "col",
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
        flex === "col" && "space-y-5",
        `rounded bg-gray-200 p-10 shadow-md`,
        className
      )}
    >
      {children}
    </div>
  )
}

export default ProfileSection
