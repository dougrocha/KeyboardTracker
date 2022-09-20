const withTM = require('next-transpile-modules')(['ui'])

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: [] },
  env: {
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
  },
}

module.exports = () => {
  const plugins = [withTM]
  return plugins.reduce((acc, next) => next(acc), { ...nextConfig })
}
