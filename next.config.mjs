/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment settings
  output: 'export',
  trailingSlash: true,
  // For deploying to username.github.io/ziVara
  basePath: '/ziVara',
  assetPrefix: '/ziVara/',
}

export default nextConfig
