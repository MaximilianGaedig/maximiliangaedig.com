/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}

module.exports = withMDX(nextConfig)
