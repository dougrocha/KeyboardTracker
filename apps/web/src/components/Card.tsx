import React from "react"

interface CardProps {
  title: string
  image?: string
}

const Card = ({ title, image }: CardProps) => {
  return (
    <div className="mb-4 inline-flex h-60 w-64 shrink-0 items-center justify-center bg-gray-500">
      {title}
    </div>
  )
}

export default Card
