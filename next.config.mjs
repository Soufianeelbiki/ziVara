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
  // Uncomment and change 'ziVara' to your repo name if deploying to username.github.io/repo-name
  // basePath: '/ziVara',
}

export default nextConfig
