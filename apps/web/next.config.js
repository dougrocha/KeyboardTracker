const withTM = require('next-transpile-modules')(['ui'])

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: [] },
  env: {},
}

module.exports = () => {
  const plugins = [withTM]
  return plugins.reduce((acc, next) => next(acc), { ...nextConfig })
}
