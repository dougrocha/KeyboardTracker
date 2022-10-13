import React from "react"

interface ItemCarouselProps {
  title?: string
  children?: JSX.Element[]
}

const ItemCarousel = ({ children, title }: ItemCarouselProps) => {
  return (
    <div className="flex flex-col overflow-x-auto">
      {title && <p className="mb-8 text-2xl font-semibold">{title}</p>}
      <ul className="flex flex-nowrap gap-x-6 overflow-x-auto">
        {children?.map((Child, i) => (
          <li key={i}>{Child}</li>
        ))}
      </ul>
    </div>
  )
}

export default ItemCarousel
