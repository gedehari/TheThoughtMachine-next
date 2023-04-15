/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:rest*",
        destination: "/api/:rest*?version=1"
      }
    ]
  }
}

module.exports = nextConfig
