import { useQuery } from "@tanstack/react-query"
import { FaDiscord } from "react-icons/fa"

import SocialConnector from "./SocialConnector"

import { GetUserConnections } from "../../libs/api/GetUserConnections"
import ProfileSection from "../Profile/ProfileSection"

const ConnectionsSection = () => {
  const { data, isLoading } = useQuery(["connections"], GetUserConnections)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ProfileSection flex="row" className="mt-10">
      {/* <SocialConnector
        name="Github"
        icon={FaGithub}
        connected={data["github"]}
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
    </ProfileSection>
  )
}

export default ConnectionsSection
