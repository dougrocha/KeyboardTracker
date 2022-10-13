import React from "react"

interface CardProps {
  title: string
  image?: string
  /**
   * Default Width: 100
   */
  className?: string
}

const Card = ({ title, image, className }: CardProps) => {
  return (
    <div
      className={`mb-4 box-border inline-flex h-60 w-full shrink-0 items-center justify-center bg-gray-500 ${className}`}
    >
      {title}
    </div>
  )
}

export default Card
