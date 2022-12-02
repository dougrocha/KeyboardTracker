import React from "react"

interface CarouselProps {
  title?: string
  children?: JSX.Element[]
}

const Carousel = ({ children, title }: CarouselProps) => {
  return (
    <section className="flex flex-col overflow-x-auto">
      {title && <span className="mb-8 text-2xl font-semibold">{title}</span>}
      <ul className="flex flex-nowrap gap-x-6 overflow-x-auto pb-4">
        {children}
      </ul>
    </section>
  )
}

export default Carousel
