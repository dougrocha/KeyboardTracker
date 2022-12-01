import React from "react"

interface InfoCardProps {
  title: string
  description: string[]
  icon: (props: React.ComponentProps<"svg">) => JSX.Element
}

const InfoCard = ({ title, description, icon }: InfoCardProps) => {
  return (
    <div className="flex h-full flex-col items-start lg:mt-0">
      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 dark:text-indigo-400">
        {React.createElement(icon, { className: "h-7 w-7 text-white" })}
      </span>

      <div className="mt-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
          {title}
        </h3>

        {description.map((desc, i) => (
          <p
            key={`${title}-${i}`}
            className="mt-2 text-base text-gray-500 dark:text-gray-400"
          >
            {desc}
          </p>
        ))}
      </div>
    </div>
  )
}

export default InfoCard
