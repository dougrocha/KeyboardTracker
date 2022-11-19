import classNames from "classnames"
import { IconType } from "react-icons"

interface SocialConnectorProps {
  name: string
  icon: IconType
  connected?: boolean
}

const SocialConnector = ({
  icon,
  name,
  connected = false,
}: SocialConnectorProps) => {
  const Icon = icon

  return (
    <div className="relative">
      <div className="group flex flex-col items-center justify-center space-y-2 after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:cursor-pointer">
        <span className="sr-only">{name}</span>
        <Icon className="h-8 w-8" />
        <div
          className={classNames(
            connected && "bg-blue-500",
            !connected && "bg-gray-400",
            "rounded px-2 py-1 text-white"
          )}
        >
          {connected ? "Connected" : "Connect"}
        </div>
      </div>
    </div>
  )
}

export default SocialConnector
