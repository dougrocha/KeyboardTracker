const withTM = require("next-transpile-modules")(["ui"])

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
    formats: ["image/webp"],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = () => {
  const plugins = [withTM]
  return plugins.reduce((acc, next) => next(acc), { ...nextConfig })
}
