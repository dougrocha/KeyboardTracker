import React from "react"

const ProfileHeader = ({ title }: { title: string | React.ReactNode }) => {
  return (
    <div className="mb-12">
      <span className="text-3xl font-medium">{title}</span>
    </div>
  )
}

export default ProfileHeader
