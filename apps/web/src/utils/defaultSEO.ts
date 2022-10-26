import { NextSeoProps } from "next-seo"

export default {
  titleTemplate: "MEKA | %s",
  defaultTitle: "MEKA | Calendar",
  // Additional tags for Icons
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
  ],
} as NextSeoProps
