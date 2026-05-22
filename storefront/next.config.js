/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['minio-storage.agrohoney.com', 'localhost'],
  },
}

module.exports = nextConfig
