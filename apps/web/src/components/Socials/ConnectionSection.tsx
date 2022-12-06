import { useQuery } from "@tanstack/react-query"
import { FaDiscord } from "react-icons/fa"

import SocialConnector from "./SocialConnector"

import { GetUserConnections } from "../../libs/api/GetUserConnections"

const ConnectionsSection = () => {
  const { data, isLoading } = useQuery(["connections"], GetUserConnections)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {/* <SocialConnector
        name="Github"
        icon={FaTwitter}
        connected={data?.["twitter"] ?? false}
      /> */}
      <SocialConnector
        name="Discord"
        icon={FaDiscord}
        connected={data?.discord !== undefined}
      />
      {/* <SocialConnector
        name="Google"
        icon={FaGoogle}
        connected={data["google"]}
      /> */}
    </>
  )
}

export default ConnectionsSection
