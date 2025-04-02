/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Storybook 오류가 빌드를 차단하지 않도록 설정
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 오류가 빌드를 차단하지 않도록 설정
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 