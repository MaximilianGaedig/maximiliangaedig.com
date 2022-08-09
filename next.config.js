/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')()
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
}

module.exports = withMDX(nextConfig)
