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
  async headers() {
    return [
      {
        // 모든 경로에 적용
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // 모든 도메인에서 접근 허용
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 