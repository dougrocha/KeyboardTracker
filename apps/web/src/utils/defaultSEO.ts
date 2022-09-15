import { NextSeoProps } from 'next-seo'

export default {
  titleTemplate: 'KGB | %s',
  defaultTitle: 'KGB | Calendar',
  // Additional tags for Icons
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
} as NextSeoProps
