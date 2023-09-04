/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  typescript: {
    // TODO: デプロイ確認用なの削除する
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pokemon',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
